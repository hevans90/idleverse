import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { apolloBootstrapper } from '@idleverse/graphql-utils';
import jwt_decode from 'jwt-decode';
import { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { environment } from '../environments/environment';
import {
  accessTokenVar,
  galaxyConfigVar,
  galaxyRotationVar,
  roleVar,
} from './_state/reactive-variables';
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
        <BrowserRouter>
          <Layout>
            <Routes>
              {routes.map((route, key) => {
                let element: JSX.Element = <route.component />;
                if (route.adminOnly) {
                  if (role !== 'dev') {
                    element = <Navigate replace to="/" />;
                  }
                }
                return (
                  <Route
                    path={route.path}
                    key={key}
                    element={
                      <Suspense
                        fallback={<Loading text={`Loading ${route.name}`} />}
                      >
                        {element}
                      </Suspense>
                    }
                  ></Route>
                );
              })}
            </Routes>
          </Layout>
        </BrowserRouter>
      </PreloadContainer>
    </ApolloProvider>
  );
};
