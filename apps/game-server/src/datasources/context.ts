import { User } from '@auth0/auth0-spa-js';
import express from 'express';
import { Auth0API } from './auth0';
import { HasuraAPI } from './hasura-api';

export interface Context {
  dataSources: {
    hasuraAPI: HasuraAPI;
    auth0API: Auth0API;
  };
  req: express.Request<any>;
  user: User;
  roles?: string[];
  id?: string;
}
