import { ApolloProvider } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { apolloBootstrapper } from './apollo-bootstrapper';
import { Layout } from './components/layout';
import { GameContainer } from './game/game-container';

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
        setIdToken(`Bearer ${x.__raw}`);
      }
    }

    fetchMyToken();
  }, [getIdTokenClaims, isLoading]);

  if (isLoading) return <Loading></Loading>;

  if (idToken === '' && !isAuthenticated) loginWithRedirect();

  if (idToken === '') return <Loading></Loading>;

  const client = apolloBootstrapper(idToken);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <GameContainer client={client}></GameContainer>
      </Layout>
    </ApolloProvider>
  );
};
