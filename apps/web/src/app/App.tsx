import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { apolloBootstrapper } from '@idleverse/graphql';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GalaxyGenContainer } from './canvases/galaxy-generator/galaxy-generator.container';
import { GalaxyViewerContainer } from './canvases/galaxy-viewer/galaxy-viewer.container';
import { SolarSystemContainer } from './canvases/solar-system/solar-system.container';
import { Layout } from './components/layout';
import { Loading } from './components/loading';
import { SelfContainer } from './containers/self-container';
import { GalaxyGalleryContainer } from './galaxy-gallery/galaxy-gallery.container';
import { Home } from './home/home';
import {
  galaxyConfigVar,
  galaxyRotationVar,
  roleVar,
  accessTokenVar,
} from './_state/reactive-variables';

export const local = window.location.origin.includes('localhost');

export const App = () => {
  const { getIdTokenClaims, isLoading, loginWithRedirect, isAuthenticated } =
    useAuth0();

  const accessToken = useReactiveVar(accessTokenVar);

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
  }, [getIdTokenClaims, isLoading, accessToken]);

  if (isLoading) return <Loading></Loading>;

  if (!accessToken && !isAuthenticated) loginWithRedirect();

  if (!accessToken) return <Loading></Loading>;

  const client = apolloBootstrapper('user', accessTokenVar, {
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
  });

  return (
    <ApolloProvider client={client}>
      <SelfContainer>
        <BrowserRouter basename={local ? '/' : '/idle-game'}>
          <Layout>
            <Switch>
              <Route
                path="/galaxies/:id"
                exact
                component={GalaxyViewerContainer}
              />
              <Route path="/galaxies" component={GalaxyGalleryContainer} />
              <Route path="/galaxy-gen" component={GalaxyGenContainer} />
              <Route path="/solar-system" component={SolarSystemContainer} />
              <Route path="/" component={Home} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </SelfContainer>
    </ApolloProvider>
  );
};
