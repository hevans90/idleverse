import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { apolloBootstrapper } from '@idleverse/graphql-utils';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { environment } from '../environments/environment';

import {
  accessTokenVar,
  galaxyConfigVar,
  galaxyRotationVar,
  roleVar,
} from '@idleverse/state';
import { Layout } from './components/layout';
import { Loading } from './components/loading';
import { PreloadContainer } from './preload.container';
import { Registration } from './registration/registration';
import { routes } from './routes';

export const App = () => {
  const {
    getIdTokenClaims,
    isLoading: authLoading,
    loginWithRedirect,
    isAuthenticated,
  } = useAuth0();

  const accessToken = useReactiveVar(accessTokenVar);

  const role = useReactiveVar(roleVar);

  useEffect(() => {
    async function fetchMyToken() {
      const tokenClaims = await getIdTokenClaims();

      if (tokenClaims?.__raw) {
        accessTokenVar(tokenClaims.__raw);

        roleVar(
          jwt_decode(tokenClaims.__raw)['https://hasura.io/jwt/claims'][
            'x-hasura-default-role'
          ]
        );
      }
    }

    fetchMyToken();
  }, [getIdTokenClaims, authLoading, accessToken, role]);

  if (authLoading) return <Loading text="Authenticating"></Loading>;

  if (!accessToken && !isAuthenticated) loginWithRedirect();

  if (!accessToken || !role)
    return <Loading text="Getting permissions"></Loading>;

  if (role === 'unregistered')
    return (
      <ApolloProvider
        client={apolloBootstrapper(
          environment.hasuraUri,
          environment.secure,
          'user',
          accessTokenVar
        )}
      >
        <Registration />
      </ApolloProvider>
    );

  const client = apolloBootstrapper(
    environment.hasuraUri,
    environment.secure,
    'user',
    accessTokenVar,
    {
      typePolicies: {
        Query: {
          fields: {
            galaxyConfig: {
              read: () => galaxyConfigVar(),
            },
            galaxyRotation: {
              read: () => galaxyRotationVar(),
            },
          },
        },
      },
    }
  );

  return (
    <ApolloProvider client={client}>
      <PreloadContainer>
        <Layout>
          <Routes>
            {routes.map(({ path, component: Component }, key) => (
              <Route path={path} key={key} element={<Component />}></Route>
            ))}
          </Routes>
        </Layout>
      </PreloadContainer>
    </ApolloProvider>
  );
};
