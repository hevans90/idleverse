import { SelfQuery } from '@idleverse/galaxy-gql';
import * as PIXI from 'pixi.js';

export type AssetCollection = {
  [key: string]: PIXI.LoaderResource;
};

export type Self = SelfQuery['user_me'][0];
