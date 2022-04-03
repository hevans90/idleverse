import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { apolloBootstrapper } from '@idleverse/graphql-utils';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { environment } from '../environments/environment';
import { Layout } from './components/layout';
import { Loading } from './components/loading';
import { PreloadContainer } from './containers/preload.container';
import { Registration } from './registration/registration';
import { routes } from './routes';
import {
  accessTokenVar,
  breadCrumbsVar,
  galaxyConfigVar,
  galaxyRotationVar,
  roleVar,
} from './_state/reactive-variables';

export const local = window.location.origin.includes('localhost');

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
        <BrowserRouter basename={local ? '/' : '/idleverse'}>
          <Layout>
            <Switch>
              {routes.map(({ path, component: Component }, key) => (
                <Route
                  exact
                  path={path}
                  key={key}
                  render={(props) => {
                    const crumbs = routes
                      // Get all routes that contain the current one.
                      .filter(({ path }) => props.match.path.includes(path))
                      // Swap out any dynamic routes with their param values.
                      // E.g. "/galaxy/:id" will become "/galaxy/id"
                      .map(({ path, ...rest }) => ({
                        path: Object.keys(props.match.params).length
                          ? Object.keys(props.match.params).reduce(
                              (path, param) =>
                                path.replace(
                                  `:${param}`,
                                  props.match.params[param]
                                ),
                              path
                            )
                          : path,
                        ...rest,
                      }));

                    breadCrumbsVar(crumbs);

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return <Component {...props} />;
                  }}
                />
              ))}
            </Switch>
          </Layout>
        </BrowserRouter>
      </PreloadContainer>
    </ApolloProvider>
  );
};
