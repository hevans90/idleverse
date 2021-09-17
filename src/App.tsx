import { ApolloProvider } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { apolloBootstrapper } from './apollo-bootstrapper';
import { Layout } from './components/layout';
import { RealtimeCounter } from './containers/counter/realtime';
import { Game } from './game/game';

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

  if (isLoading) return <div>Loading...</div>;

  if (idToken === '' && !isAuthenticated) loginWithRedirect();

  if (idToken === '') return <div>Loading...</div>;

  const client = apolloBootstrapper(idToken);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <>
          <RealtimeCounter />
        </>
      </Layout>
    </ApolloProvider>
  );
};
