import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NodeGraphqlAPI } from '@idleverse/galaxy-gql';

export class HasuraQuestProgression {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  client: ApolloClient<NormalizedCacheObject>;

  getGalacticEmpireQuestById = async (empireQuestId: string) =>
    this.client.query<
      NodeGraphqlAPI.GalacticEmpireQuestByIdQuery,
      NodeGraphqlAPI.GalacticEmpireQuestByIdQueryVariables
    >({
      query: NodeGraphqlAPI.GalacticEmpireQuestByIdDocument,
      variables: { empireQuestId },
    });

  progressQuestStep = (questId: string, stepId: string) =>
    this.client.mutate<
      NodeGraphqlAPI.ProgressGalacticEmpireQuestStepByIdMutation,
      NodeGraphqlAPI.ProgressGalacticEmpireQuestStepByIdMutationVariables
    >({
      mutation: NodeGraphqlAPI.ProgressGalacticEmpireQuestStepByIdDocument,
      variables: { stepId, questId },
    });

  addQuest = (input: NodeGraphqlAPI.Galactic_Empire_Quest_Insert_Input) =>
    this.client.mutate<
      NodeGraphqlAPI.AddGalacticEmpireQuestMutation,
      NodeGraphqlAPI.AddGalacticEmpireQuestMutationVariables
    >({
      mutation: NodeGraphqlAPI.AddGalacticEmpireQuestDocument,
      variables: { input },
    });

  completeQuest = (questId: string) =>
    this.client.mutate<
      NodeGraphqlAPI.CompleteGalacticEmpireQuestByIdMutation,
      NodeGraphqlAPI.CompleteGalacticEmpireQuestByIdMutationVariables
    >({
      mutation: NodeGraphqlAPI.CompleteGalacticEmpireQuestByIdDocument,
      variables: { questId },
    });

  unlockEmpireResource = (empireId: string, resourceTypeId: string) =>
    this.client.mutate<
      NodeGraphqlAPI.UnlockGalacticEmpireResourceMutation,
      NodeGraphqlAPI.UnlockGalacticEmpireResourceMutationVariables
    >({
      mutation: NodeGraphqlAPI.UnlockGalacticEmpireResourceDocument,
      variables: { empireId, resourceTypeId },
    });

  unlockEmpireNpc = (empireId: string, npcId: string) =>
    this.client.mutate<
      NodeGraphqlAPI.UnlockGalacticEmpireNpcMutation,
      NodeGraphqlAPI.UnlockGalacticEmpireNpcMutationVariables
    >({
      mutation: NodeGraphqlAPI.UnlockGalacticEmpireNpcDocument,
      variables: { empireId, npcId },
    });
}
