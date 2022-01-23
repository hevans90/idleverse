import { User } from '@auth0/auth0-spa-js';
import express from 'express';
import { Auth0API } from './auth0-api';
import { FoodAPI } from './food-api';

export interface Context {
  dataSources: {
    foodAPI: FoodAPI;
    auth0API: Auth0API;
  };
  req: express.Request<any>;
  user: User;
  roles?: string[];
  id?: string;
}
