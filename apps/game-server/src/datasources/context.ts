import { User } from '@auth0/auth0-spa-js';
import express from 'express';
import { Auth0API } from './auth0-api';
import { HasuraAPI } from './hasura-api';

export interface Context {
  hasuraApi: HasuraAPI;
  auth0Api: Auth0API;
  req: express.Request<any>;
  rule: User;
  roles?: string[];
  id?: string;
}
