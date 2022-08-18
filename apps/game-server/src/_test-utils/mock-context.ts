import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Auth0API } from '../datasources/auth0';
import { Context } from '../datasources/context';
import { HasuraAPI } from '../datasources/hasura-api';
import { HasuraEmpireResourceModifiers } from '../datasources/hasura-empire-resource-modifiers';
import { HasuraQuestProgression } from '../datasources/hasura-quest-progression';

export const mockContext = (
  mockClient: ApolloClient<NormalizedCacheObject>,
  userId: string
): Context => {
  return {
    id: userId,
    req: undefined,
    user: undefined,
    dataSources: {
      hasuraAPI: new HasuraAPI(mockClient),
      hasuraQuestProgression: new HasuraQuestProgression(mockClient),
      hasuraEmpireResourceModifiers: new HasuraEmpireResourceModifiers(
        mockClient
      ),
      auth0API: new Auth0API(),
    },
  };
};
