import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/layout';
import { themeContraster } from './utils/contrast-calculator';
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
                authorization: res.__raw,
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

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={{ theme, contrast }}>
        nice
        <Layout></Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
};
