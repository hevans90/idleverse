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

@ObjectType()
export class QuestManagement {
  @Field()
  questId: string;
}

@Resolver((of) => QuestManagement)
export class QuestManagementResolver {
  @Authorized('user')
  @Mutation((returns) => QuestManagement, { nullable: true })
  async completeQuest(
    @Ctx() context: Context,
    @Arg('empire_quest_id') empireQuestId: string
  ) {
    if (!context.id) throw new Error('User id not in token');

    const { data: questData } =
      await context.dataSources.hasuraQuestProgression.getGalacticEmpireQuestById(
        empireQuestId
      );

    if (!questData) throw new Error('No quest to complete.');

    const questCompletionValidation = questCompletionValidator({ questData });

    if (questCompletionValidation.error)
      throw new Error(questCompletionValidation.error);

    if (questCompletionValidation.resourceModification) {
      await context.dataSources.hasuraEmpireResourceModifiers.incrementEmpireResources(
        questCompletionValidation.resourceModification
      );
    }

    await context.dataSources.hasuraQuestProgression.completeQuest(
      empireQuestId
    );

    // check if there is a follow-on quest in the chain
    const nextQuest = questData.galactic_empire_quest_by_pk.quest.next_quest;

    if (nextQuest) {
      await context.dataSources.hasuraQuestProgression.addQuest({
        galactic_empire_id:
          questData.galactic_empire_quest_by_pk.galactic_empire.id,
        quest_id: nextQuest.id,
        quest_step_id: nextQuest.steps[0].id,
      });
    }

    const management = new QuestManagement();
    management.questId = empireQuestId;

    return management;
  }
}
