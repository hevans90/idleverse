import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { useAuth0 } from '@auth0/auth0-react';
import { OperationDefinitionNode } from 'graphql';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/layout';
import { RealtimeCounter } from './containers/counter/realtime';
import { themeContraster } from './utils/contrast-calculator';
import {
  IdleGameCountersComponent,
  IdleGameCountersComponentProps,
} from './_graphql/api';
import { theme } from './_theme/theme';

const contrast = themeContraster({ ...theme });

export const App = () => {
  const { getIdTokenClaims, isLoading, loginWithRedirect, isAuthenticated } = useAuth0();

  const [idToken, setIdToken] = useState<string>('');

  useEffect(() => {
    async function fetchMyAPI() {
      let x = await getIdTokenClaims();

      console.error(x);

      if (x?.__raw) {
        setIdToken(`Bearer ${x.__raw}`);
      }
    }

    fetchMyAPI();
  }, [getIdTokenClaims, isLoading]);

  console.warn(isLoading);
  console.warn(idToken);

  if (isLoading)
    return <div>Loading...</div>;

  if (idToken === '' && !isAuthenticated)
    loginWithRedirect();
    
  if (idToken === '')
    return <div>Loading...</div>;


  const uri = 'superb-caiman-21.hasura.app/v1/graphql';

  const httpLink = createHttpLink({
    uri: `https://${uri}`,
    headers: {
      Authorization: idToken,
    },
  });

  const wsLink = new WebSocketLink({
    uri: `wss://${uri}`,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: async () => ({
        headers: {
          Authorization: idToken,
        },
      }),
    },
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

  // const idleProps: IdleGameCountersComponentProps = {
  //   children: ({ data }) => {
  //     if (data) {
  //       return (
  //         <>
  //           <div>{JSON.stringify(data?.idle_test)}</div>
  //         </>
  //       );
  //     } else return <div>ERROR</div>;
  //   },
  // };

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={{ theme, contrast }}>
        <Layout>
          <>
            {/* <IdleGameCountersComponent
              {...idleProps}
            ></IdleGameCountersComponent>

            <hr /> */}

            <RealtimeCounter />
          </>
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
};
