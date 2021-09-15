import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/layout';
import { themeContraster } from './utils/contrast-calculator';
import {
  IdleGameCountersComponent,
  IdleGameCountersComponentProps,
} from './_graphql/api';
import { theme } from './_theme/theme';

const contrast = themeContraster({ ...theme });

export const App = () => {
  const { getIdTokenClaims, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const contextLink = setContext(
    (request) =>
      new Promise((success, fail) => {
        getIdTokenClaims().then((res) => {
          if (res) {
            success({
              headers: {
                authorization: `Bearer ${res.__raw}`,
              },
            });
          }
          success(null);
        });
        setTimeout(() => {
          fail('timeout');
        }, 10);
      })
  );

  const httpLink = createHttpLink({
    uri: 'https://superb-caiman-21.hasura.app/v1/graphql',
  });

  // Initialize ApolloClient
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([contextLink, httpLink]),
    //remove in production
    connectToDevTools: true,
  });

  const idleProps: IdleGameCountersComponentProps = {
    children: ({ data }) => {
      if (data) {
        return (
          <>
            <div>{JSON.stringify(data?.idle_test)}</div>
          </>
        );
      } else return <div>ERROR</div>;
    },
  };

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={{ theme, contrast }}>
        <Layout>
          <IdleGameCountersComponent {...idleProps}></IdleGameCountersComponent>
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
};
