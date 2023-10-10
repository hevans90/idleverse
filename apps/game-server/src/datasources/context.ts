import { User } from '@auth0/auth0-spa-js';
import express from 'express';
import { Auth0API } from './auth0';
import { HasuraAPI } from './hasura-api';
import { HasuraEmpirePurchases } from './hasura-empire-purchases';
import { HasuraEmpireResourceModifiers } from './hasura-empire-resource-modifiers';
import { HasuraQuestProgression } from './hasura-quest-progression';
import { MinioAPI } from './minio';

export interface Context {
  dataSources: {
    auth0API: Auth0API;
    hasuraAPI: HasuraAPI;
    hasuraEmpirePurchases: HasuraEmpirePurchases;
    hasuraQuestProgression: HasuraQuestProgression;
    hasuraEmpireResourceModifiers: HasuraEmpireResourceModifiers;
    minio: MinioAPI;
  };
  req: express.Request<any>;
  user: User;
  roles?: string[];
  id?: string;
}
