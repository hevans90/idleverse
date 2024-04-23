import { makeVar } from '@apollo/client';
import { makeVarPersisted } from './utils';

export const celestialViewerSelectedPlanet = makeVar<{
  name: string;
  id: string;
} | null>(null);

export const celestialViewerPlanetDataUris = makeVarPersisted<{
  celestialId: string;
  uris: { seed: string; uri: string }[];
} | null>(null, 'planetDataUris');
