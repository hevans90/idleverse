import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  ActiveGalacticEmpireQuestsDocument,
  ActiveGalacticEmpireQuestsSubscription,
} from '@idleverse/galaxy-gql';

export const activeGalacticQuestListener = (
  client: ApolloClient<NormalizedCacheObject>
) =>
  client.subscribe<ActiveGalacticEmpireQuestsSubscription>({
    query: ActiveGalacticEmpireQuestsDocument,
  });
