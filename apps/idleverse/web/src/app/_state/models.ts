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

export type SolarSystemConfig = {
  viewAngle: number;
  simulationSpeed: number;
};

export type PlanetGenerationConfig = {
  textureResolution: number;
  pixelSize: number;
  atmosphericDistance: number;
  atmosphere: boolean;
  rotate: boolean;
};

export type BreadCrumb = {
  name: string;
  component: () => JSX.Element;
  path: string;
};

export type Vector2D = { x: number; y: number };
