import { MediaResult, SelfQuery } from '@idleverse/galaxy-gql';

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
  simulationSpeed: number;
};

export type PlanetAppearanceConfig = {
  palettePresetName: string;
  terrainBias: [number, number, number, number];
};

export type PlanetGenerationConfig = {
  name: string;
  ui: boolean;
  radius: number;
  seed: string;
  textureResolution: number;
  pixelSize: number;
  atmosphericDistance: number;
  atmosphere: boolean;
  rotate: boolean;

  /** In AU */
  orbitalRadius: number;
};

export type CelestialType =
  | 'red-giant'
  | 'main-sequence'
  | 'white-dwarf'
  | 'blue-giant';

export type PlanetTerrain = 'terran' | 'desert' | 'alien' | 'primordial';

export type CelestialGenerationConfig = {
  preset: CelestialType;
  brightness: number;
  density: number;
  coronalStrength: number;
  color: { r: number; g: number; b: number };
  radius: number;
};

export type CelestialVariant = {
  name: string;
  config: CelestialGenerationConfig;
};

export type BreadCrumb = {
  name: string;
  component: () => JSX.Element;
  path: string;
};

export type Vector2D = { x: number; y: number };

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

export type TerrainHexPaletteKey = keyof TerrainHexPalette;

export const RING_TYPES = ['banded', 'rocky'] as const;

type RingTuple = typeof RING_TYPES;

export type RingKey = RingTuple[number];

export type RingConfig = {
  id?: string;
  rotation: [x: number, y: number, z: number];
  type: RingKey;
  colors: [rgb, rgb, rgb, rgb];
  terrainBias: [number, number, number, number];
  innerRadius: number;
  outerRadius: number;
  resolution: number;
};

export type rgb = { r: number; g: number; b: number };

export type StringOfLength<Min, Max> = string & {
  readonly StringOfLength: unique symbol; // this is the phantom type
};

// This is a type guard function which can be used to assert that a string
// is of type StringOfLength<Min,Max>
const isStringOfLength = <Min extends number, Max extends number>(
  str: string,
  min: Min,
  max: Max
): str is StringOfLength<Min, Max> => str.length >= min && str.length <= max;

// type constructor function
export const stringOfLength = <Min extends number, Max extends number>(
  input: unknown,
  min: Min,
  max: Max
): StringOfLength<Min, Max> => {
  if (typeof input !== 'string') {
    throw new Error('invalid input');
  }

  if (!isStringOfLength(input, min, max)) {
    throw new Error('input is not between specified min and max');
  }

  return input; // the type of input here is now StringOfLength<Min,Max>
};

export type IdleverseMedia =
  | 'music'
  | 'backgrounds'
  | 'races'
  | 'factions'
  | 'celestial-systems';

export type HydratedMediaResult = MediaResult & { url: string };

export const BACKGROUNDS = ['ecologist', 'prospector'] as const;
export const FACTIONS = ['ancients', 'nihils'] as const;
export const RACES = ['forgotten', 'nomads', 'unc'] as const;
