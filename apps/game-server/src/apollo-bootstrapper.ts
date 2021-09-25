import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import fetch from 'cross-fetch';
import { OperationDefinitionNode } from 'graphql';
import ws = require('ws');

const uri = 'idleverse.herokuapp.com/v1/graphql';

export const apolloBootstrapper = (adminToken: string) => {
  const httpLink = createHttpLink({
    uri: `https://${uri}`,
    headers: { 'x-hasura-admin-secret': `${adminToken}` },
    fetch,
  });

  const wsLink = new WebSocketLink({
    uri: `wss://${uri}`,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: async () => ({
        headers: { 'x-hasura-admin-secret': `${adminToken}` },
      }),
    },
    webSocketImpl: ws,
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
    cache: new InMemoryCache(),
    link,
    //remove in production
    connectToDevTools: true,
  });

  return client;
};
