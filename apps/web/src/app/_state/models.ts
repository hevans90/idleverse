import { SelfQuery } from '@idleverse/galaxy-gql';
import * as PIXI from 'pixi.js';

export type AssetCollection = {
  [key: string]: PIXI.LoaderResource;
};

export type Self = SelfQuery['user_me'][0];

/**
 * ```
 *
 * a - sideNav
 * b - toolBar
 * c - main
 *
 * |============== b
 * |   |         |
 * | a |    c    |
 * |   |         |
 * ```
 */
export type LayoutConfig = {
  sideNav: boolean;
  toolBar: boolean;
};
