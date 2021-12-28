import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  HttpOptions,
  InMemoryCache,
  InMemoryCacheConfig,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';

export const apolloBootstrapper = (
  uri: string,
  secure: boolean,
  access: 'user' | 'admin-secret',
  token: () => string,
  cacheConfig: InMemoryCacheConfig = {},
  customFetch: HttpOptions['fetch'] = fetch,
  customWs: unknown = WebSocket,
  options: DefaultOptions = {}
) => {
  const headers =
    access === 'user'
      ? { Authorization: `Bearer ${token()}` }
      : { 'x-hasura-admin-secret': `${token()}` };

  const httpLink = createHttpLink({
    uri: `${secure ? 'https' : 'http'}://${uri}`,
    headers: { ...headers },
    fetch: customFetch,
  });

  const wsLink = new WebSocketLink({
    uri: `${secure ? 'wss' : 'ws'}://${uri}`,
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
    defaultOptions: options,
    //remove in production
    connectToDevTools: true,
  });

  return client;
};
