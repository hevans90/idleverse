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
  ui: boolean;
  radius: number;
  seed: string;
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

export type rgb = { r: number; g: number; b: number };

export type TerrainRGBPalette = {
  water: rgb;
  sand: rgb;
  grass: rgb;
  forest: rgb;
};

export type TerrainHexPalette = {
  water: string;
  sand: string;
  grass: string;
  forest: string;
};

export const RING_TYPES = ['banded', 'rocky'] as const;

type RingTuple = typeof RING_TYPES;

export type RingKey = RingTuple[number];

export type RingConfig = {
  id: string;
  rotation: [x: number, y: number, z: number, order?: string];
  type: RingKey;
  colors: [rgb, rgb, rgb, rgb];
  terrainBias: [number, number, number, number];
  innerRadius: number;
  outerRadius: number;
  resolution: number;
};
