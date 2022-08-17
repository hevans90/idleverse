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
import { resourceModificationFactory } from '../datasources/hasura-empire-resource-modifiers';
import { questCompletionValidator } from '../quest-progression/quest-completion-validator';
import {
  emptyResourceModification,
  validateResourceModification,
} from '../quest-progression/validate-resource-modification';

@ObjectType()
export class QuestManagement {
  @Field()
  quest_id: string;
}

@ObjectType()
export class QuestReward {
  @Field()
  type: string;
  @Field()
  npc_unlock_id?: string;
  @Field()
  resource_accrual_amount?: number;
  @Field()
  resource_accrual_type_id?: string;
  @Field()
  resource_unlock_id?: string;
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
    if (!userId) throw new Error('User id not in token');

    const { data: questData } =
      await dataSources.hasuraQuestProgression.getGalacticEmpireQuestById(
        empireQuestId
      );

    if (!questData) throw new Error('No quest to complete.');

    const galactic_empire_id =
      questData.galactic_empire_quest_by_pk.galactic_empire.id;

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
}
