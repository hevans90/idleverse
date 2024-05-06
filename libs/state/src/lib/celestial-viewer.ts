import { makeVar } from '@apollo/client';
import { TerrainHexPalettesQuery } from '@idleverse/galaxy-gql';
import { makeVarPersisted } from './utils';

export const asteroidSizes = ['small', 'medium', 'large'] as const;

export type AsteroidSize = typeof asteroidSizes[number];

export const celestialViewerSelectedPlanet = makeVar<{
  name: string;
  id: string;
} | null>(null);

export const celestialViewerPlanetDataUris = makeVarPersisted<{
  celestialId: string;
  uris: { seed: string; uri: string }[];
} | null>(null, 'planetDataUris');

export const celestialViewerAsteroidBeltVar = makeVarPersisted<{
  noAsteroids: number;
  size: AsteroidSize;
  colorPalette: TerrainHexPalettesQuery['terrain_hex_palette'][0] | null;
}>(
  {
    noAsteroids: 1000,
    size: 'medium',
    colorPalette: null,
  },
  'celestialViewerAsteroidBeltVar'
);
