import { User } from '@auth0/auth0-spa-js';
import express from 'express';
import { Auth0API } from './auth0';
import { HasuraAPI } from './hasura-api';
import { HasuraEmpirePurchases } from './hasura-empire-purchases';
import { HasuraEmpireResourceModifiers } from './hasura-empire-resource-modifiers';
import { HasuraQuestProgression } from './hasura-quest-progression';

export interface Context {
  dataSources: {
    hasuraAPI: HasuraAPI;
    auth0API: Auth0API;
    hasuraEmpirePurchases: HasuraEmpirePurchases;
    hasuraQuestProgression: HasuraQuestProgression;
    hasuraEmpireResourceModifiers: HasuraEmpireResourceModifiers;
  };
  req: express.Request<any>;
  user: User;
  roles?: string[];
  id?: string;
}
