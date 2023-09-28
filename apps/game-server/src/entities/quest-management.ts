import { FetchResult } from '@apollo/client';
import { Quest_Reward_Type_Enum } from '@idleverse/galaxy-gql';
import 'reflect-metadata';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import { Context } from '../datasources/context';

import { questCompletionValidator } from '../quest-progression/quest-completion-validator';
import { questStepProgressionValidator } from '../quest-progression/quest-step-progression-validator';
import { resourceModificationFactory } from '../resource-modification/utils';
import {
  emptyResourceModification,
  nullifyEmptyResourceModification,
  validateResourceModification,
} from '../resource-modification/validate-resource-modification';
import { QuestErrorTypes } from './error-enums/quest-errors';
import { UserErrorTypes } from './error-enums/user-errors';

@ObjectType()
export class QuestManagement {
  @Field()
  quest_id: string;
}

@ObjectType()
export class QuestReward {
  @Field()
  type: string;
  @Field({ nullable: true })
  npc_unlock_id?: string;
  @Field({ nullable: true })
  resource_accrual_amount?: number;
  @Field({ nullable: true })
  resource_accrual_type_id?: string;
  @Field({ nullable: true })
  resource_unlock_id?: string;
}

@ObjectType()
export class QuestStepProgression {
  @Field()
  quest_id: string;

  @Field({ nullable: true })
  next_step_in_quest_added: string;
}
@ObjectType()
export class QuestCompletion {
  @Field()
  quest_id: string;

  @Field({ nullable: true })
  next_quest_in_chain_added: string;

  @Field(() => [QuestReward])
  rewards: QuestReward[];
}

@Resolver((of) => QuestManagement)
export class QuestManagementResolver {
  @Authorized('user')
  @Mutation((returns) => QuestCompletion, { nullable: true })
  async completeQuest(
    @Ctx() { dataSources, id: userId }: Context,
    @Arg('empire_quest_id') empireQuestId: string
  ) {
    if (!userId) throw new Error(UserErrorTypes.NoUserId);

    const { data: questData } =
      await dataSources.hasuraQuestProgression.getGalacticEmpireQuestById(
        empireQuestId
      );

    if (!questData || !questData.galactic_empire_quest_by_pk) {
      throw new Error(QuestErrorTypes.NoQuestToComplete);
    }

    const galactic_empire_id =
      questData.galactic_empire_quest_by_pk.galactic_empire.id;

    if (!galactic_empire_id) throw new Error(QuestErrorTypes.NoEmpire);

    // validate & process the final step in the quest
    const questCompletionValidation = questCompletionValidator({ questData });

    if (questCompletionValidation.error)
      throw new Error(questCompletionValidation.error);

    if (questCompletionValidation.resourceModification) {
      await dataSources.hasuraEmpireResourceModifiers.incrementEmpireResources(
        questCompletionValidation.resourceModification
      );
    }

    // set the quest to completed: true
    await dataSources.hasuraQuestProgression.completeQuest(empireQuestId);

    const questCompletionResponse = new QuestCompletion();

    // check if there is a follow-on quest in the chain
    const nextQuest = questData.galactic_empire_quest_by_pk.quest.next_quest;

    if (nextQuest) {
      await dataSources.hasuraQuestProgression.addQuest({
        galactic_empire_id,
        quest_id: nextQuest.id,
        quest_step_id: nextQuest.steps[0].id,
      });

      questCompletionResponse.next_quest_in_chain_added = nextQuest.steps[0].id;
    }

    questCompletionResponse.quest_id = empireQuestId;

    // process rewards
    questCompletionResponse.rewards =
      questData.galactic_empire_quest_by_pk.quest.rewards;

    const rewardPromises: Promise<FetchResult>[] = [];

    questData.galactic_empire_quest_by_pk.quest.rewards.forEach((reward) => {
      switch (reward.type) {
        case Quest_Reward_Type_Enum.NpcUnlock:
          rewardPromises.push(
            dataSources.hasuraQuestProgression.unlockEmpireNpc(
              galactic_empire_id,
              reward.npc_unlock_id
            )
          );
          break;
        case Quest_Reward_Type_Enum.ResourceUnlock:
          rewardPromises.push(
            dataSources.hasuraQuestProgression.unlockEmpireResource(
              galactic_empire_id,
              reward.resource_unlock_id
            )
          );
          break;
        case Quest_Reward_Type_Enum.ResourceAccrual:
          {
            let questRewardResourceModification =
              emptyResourceModification(galactic_empire_id);
            const resourceValidation = validateResourceModification({
              resources:
                questData.galactic_empire_quest_by_pk.galactic_empire.resources,
              resource_amount: reward.resource_accrual_amount,
              resource_id: reward.resource_accrual_type_id,
            });

            if (resourceValidation.error) {
              throw new Error(resourceValidation.error);
            }

            questRewardResourceModification = resourceModificationFactory(
              questRewardResourceModification,
              resourceValidation.modifierKey,
              reward.resource_accrual_amount
            );

            rewardPromises.push(
              dataSources.hasuraEmpireResourceModifiers.incrementEmpireResources(
                questRewardResourceModification
              )
            );
          }
          break;
        default:
          console.warn(
            `No reward was processed; unknown type: ${reward.type}.`
          );
          break;
      }
    });

    const rewardResults = await Promise.all(rewardPromises);

    rewardResults.forEach(({ data }) => console.log(data));

    return questCompletionResponse;
  }

  @Authorized('user')
  @Mutation((returns) => QuestStepProgression, { nullable: true })
  async progressQuestStep(
    @Ctx() { dataSources, id: userId }: Context,
    @Arg('empire_quest_id') empireQuestId: string
  ) {
    if (!userId) throw new Error(UserErrorTypes.NoUserId);

    const { data: questData } =
      await dataSources.hasuraQuestProgression.getGalacticEmpireQuestById(
        empireQuestId
      );

    if (!questData || !questData.galactic_empire_quest_by_pk) {
      throw new Error(QuestErrorTypes.NoQuestToProgress);
    }

    const galactic_empire_id =
      questData.galactic_empire_quest_by_pk.galactic_empire.id;

    if (!galactic_empire_id) throw new Error(QuestErrorTypes.NoEmpire);

    const {
      galactic_empire_quest_by_pk: { quest_step_id, quest, galactic_empire },
    } = questData;

    const step = quest.steps.find(({ id }) => id === quest_step_id);

    if (!step) throw new Error(QuestErrorTypes.NoStep);

    let resourceModification = emptyResourceModification(galactic_empire_id);

    const stepValidation = questStepProgressionValidator({
      step,
      galactic_empire,
      resourceModification,
    });

    if (stepValidation.error) throw new Error(stepValidation.error);

    if (stepValidation.resourceModification) {
      resourceModification = stepValidation.resourceModification;
    }

    resourceModification =
      nullifyEmptyResourceModification(resourceModification);

    // process step requirements (initially just resource costs)
    if (resourceModification) {
      await dataSources.hasuraEmpireResourceModifiers.incrementEmpireResources(
        resourceModification
      );
    }

    // progress step

    const next_step = step?.next_step_in_quest;

    if (!next_step) throw new Error(QuestErrorTypes.NoNextStep);

    await dataSources.hasuraQuestProgression.progressQuestStep(
      empireQuestId,
      next_step
    );

    const questProgressionResponse = new QuestStepProgression();

    questProgressionResponse.quest_id = empireQuestId;
    questProgressionResponse.next_step_in_quest_added = next_step;

    return questProgressionResponse;
  }
}
