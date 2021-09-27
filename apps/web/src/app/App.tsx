import { ApolloProvider } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Text } from '@chakra-ui/react';
import { apolloBootstrapper } from '@idleverse/graphql';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from './components/layout';
import { GalaxyGenContainer } from './galaxy-generator/galaxy-generator.container';
import { Home } from './home/home';
import { galaxyConfig, galaxyRotation } from './_state/reactive-variables';

export const local = window.location.origin.includes('localhost');

const Loading = () => (
  <Box
    height="100vh"
    width="100vw"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Text fontSize="4xl">Loading...</Text>
  </Box>
);

export const App = () => {
  const { getIdTokenClaims, isLoading, loginWithRedirect, isAuthenticated } =
    useAuth0();

  const [idToken, setIdToken] = useState<string>('');

  useEffect(() => {
    async function fetchMyToken() {
      const x = await getIdTokenClaims();

      if (x?.__raw) {
        setIdToken(`${x.__raw}`);
      }
    }

    fetchMyToken();
  }, [getIdTokenClaims, isLoading]);

  if (isLoading) return <Loading></Loading>;

  if (idToken === '' && !isAuthenticated) loginWithRedirect();

  if (idToken === '') return <Loading></Loading>;

  const client = apolloBootstrapper('user', idToken, {
    typePolicies: {
      Query: {
        fields: {
          galaxyConfig: {
            read: () => galaxyConfig(),
          },
          galaxyRotation: {
            read: () => galaxyRotation(),
          },
        },
      },
    },
  });

  return (
    <ApolloProvider client={client}>
      <Layout>
        <BrowserRouter basename={local ? '/' : '/idle-game'}>
          <Switch>
            <Route path="/galaxy-gen" component={GalaxyGenContainer} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Layout>
    </ApolloProvider>
  );
};
