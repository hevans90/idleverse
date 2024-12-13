import { makeVar } from '@apollo/client';
import {
  PlanetByIdQuery,
  TerrainHexPalettesQuery,
} from '@idleverse/galaxy-gql';
import { HydratedMediaResult } from '@idleverse/models';
import { makeVarPersisted } from './utils';

export const asteroidSizes = ['small', 'medium', 'large'] as const;

export type AsteroidSize = typeof asteroidSizes[number];

export type CelestialAudioName =
  | 'welcome'
  | 'celestial'
  | 'goldilocks-zone'
  | 'asteroid-belt'
  | 'system-forming-points';

export const celestialMediaVar = makeVar<{
  data: HydratedMediaResult[];
}>({
  data: [],
});

export const celestialViewerSelectedPlanetVar = makeVar<{
  name: string;
  id: string;
} | null>(null);

export const celestialViewerPlanetsVar = makeVar<
  PlanetByIdQuery['planet_by_pk'][]
>([]);

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
    noAsteroids: 0,
    size: 'medium',
    colorPalette: null,
  },
  'celestialViewerAsteroidBeltVar'
);
