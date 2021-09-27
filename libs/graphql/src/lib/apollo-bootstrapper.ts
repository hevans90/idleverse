import {
  ApolloClient,
  createHttpLink,
  HttpOptions,
  InMemoryCache,
  InMemoryCacheConfig,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';
// import ws from 'websocket';

const uri = 'idleverse.herokuapp.com/v1/graphql';

export const apolloBootstrapper = (
  access: 'user' | 'admin-secret',
  token: string,
  cacheConfig: InMemoryCacheConfig = {},
  customFetch: HttpOptions['fetch'] = fetch,
  customWs: unknown = WebSocket
) => {
  const headers =
    access === 'user'
      ? { Authorization: `Bearer ${token}` }
      : { 'x-hasura-admin-secret': `${token}` };

  const httpLink = createHttpLink({
    uri: `https://${uri}`,
    headers: { ...headers },
    fetch: customFetch,
  });

  const wsLink = new WebSocketLink({
    uri: `wss://${uri}`,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: async () => ({
        headers: { ...headers },
      }),
    },
    webSocketImpl: customWs,
  });

  // split based on operation type - so queries/mutations go via HTTP and subscriptions go via WS
  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(
        query
      ) as OperationDefinitionNode;
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  // Initialize ApolloClient
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(cacheConfig),
    link,
    //remove in production
    connectToDevTools: true,
  });

  return client;
};
