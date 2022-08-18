import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  AddGalacticEmpireQuestDocument,
  AddGalacticEmpireQuestMutation,
  AddGalacticEmpireQuestMutationVariables,
  CompleteGalacticEmpireQuestByIdDocument,
  CompleteGalacticEmpireQuestByIdMutation,
  CompleteGalacticEmpireQuestByIdMutationVariables,
  GalacticEmpireQuestByIdDocument,
  GalacticEmpireQuestByIdQuery,
  GalacticEmpireQuestByIdQueryVariables,
  Galactic_Empire_Quest_Insert_Input,
  ProgressGalacticEmpireQuestStepByIdDocument,
  ProgressGalacticEmpireQuestStepByIdMutation,
  ProgressGalacticEmpireQuestStepByIdMutationVariables,
  UnlockGalacticEmpireNpcDocument,
  UnlockGalacticEmpireNpcMutation,
  UnlockGalacticEmpireNpcMutationVariables,
  UnlockGalacticEmpireResourceDocument,
  UnlockGalacticEmpireResourceMutation,
  UnlockGalacticEmpireResourceMutationVariables,
} from '@idleverse/galaxy-gql';
import { DataSource } from 'apollo-datasource';

export class HasuraQuestProgression extends DataSource {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super();

    this.client = client;
  }

  client: ApolloClient<NormalizedCacheObject>;

  getGalacticEmpireQuestById = async (empireQuestId: string) =>
    this.client.query<
      GalacticEmpireQuestByIdQuery,
      GalacticEmpireQuestByIdQueryVariables
    >({
      query: GalacticEmpireQuestByIdDocument,
      variables: { empireQuestId },
    });

  progressQuestStep = (questId: string, stepId: string) =>
    this.client.mutate<
      ProgressGalacticEmpireQuestStepByIdMutation,
      ProgressGalacticEmpireQuestStepByIdMutationVariables
    >({
      mutation: ProgressGalacticEmpireQuestStepByIdDocument,
      variables: { stepId, questId },
    });

  addQuest = (input: Galactic_Empire_Quest_Insert_Input) =>
    this.client.mutate<
      AddGalacticEmpireQuestMutation,
      AddGalacticEmpireQuestMutationVariables
    >({
      mutation: AddGalacticEmpireQuestDocument,
      variables: { input },
    });

  completeQuest = (questId: string) =>
    this.client.mutate<
      CompleteGalacticEmpireQuestByIdMutation,
      CompleteGalacticEmpireQuestByIdMutationVariables
    >({
      mutation: CompleteGalacticEmpireQuestByIdDocument,
      variables: { questId },
    });

  unlockEmpireResource = (empireId: string, resourceTypeId: string) =>
    this.client.mutate<
      UnlockGalacticEmpireResourceMutation,
      UnlockGalacticEmpireResourceMutationVariables
    >({
      mutation: UnlockGalacticEmpireResourceDocument,
      variables: { empireId, resourceTypeId },
    });

  unlockEmpireNpc = (empireId: string, npcId: string) =>
    this.client.mutate<
      UnlockGalacticEmpireNpcMutation,
      UnlockGalacticEmpireNpcMutationVariables
    >({
      mutation: UnlockGalacticEmpireNpcDocument,
      variables: { empireId, npcId },
    });
}
