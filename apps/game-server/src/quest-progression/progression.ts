import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CompleteGalacticEmpireQuestByIdDocument,
  CompleteGalacticEmpireQuestByIdMutation,
  CompleteGalacticEmpireQuestByIdMutationVariables,
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

export const progressQuestStep = (
  client: ApolloClient<NormalizedCacheObject>,
  questId: string,
  stepId: string
) =>
  client.mutate<
    ProgressGalacticEmpireQuestStepByIdMutation,
    ProgressGalacticEmpireQuestStepByIdMutationVariables
  >({
    mutation: ProgressGalacticEmpireQuestStepByIdDocument,
    variables: { stepId, questId },
  });

export const completeQuest = (
  client: ApolloClient<NormalizedCacheObject>,
  questId: string
) =>
  client.mutate<
    CompleteGalacticEmpireQuestByIdMutation,
    CompleteGalacticEmpireQuestByIdMutationVariables
  >({
    mutation: CompleteGalacticEmpireQuestByIdDocument,
    variables: { questId },
  });

export const unlockEmpireResource = (
  client: ApolloClient<NormalizedCacheObject>,
  empireId: string,
  resourceTypeId: string
) =>
  client.mutate<
    UnlockGalacticEmpireResourceMutation,
    UnlockGalacticEmpireResourceMutationVariables
  >({
    mutation: UnlockGalacticEmpireResourceDocument,
    variables: { empireId, resourceTypeId },
  });

export const unlockEmpireNpc = (
  client: ApolloClient<NormalizedCacheObject>,
  empireId: string,
  npcId: string
) =>
  client.mutate<
    UnlockGalacticEmpireNpcMutation,
    UnlockGalacticEmpireNpcMutationVariables
  >({
    mutation: UnlockGalacticEmpireNpcDocument,
    variables: { empireId, npcId },
  });
