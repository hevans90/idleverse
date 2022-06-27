import { makeVarPersisted } from './utils';

export const celestialViewerSelectedPlanet = makeVarPersisted<{
  name: string;
  id: string;
}>(null, 'selectedPlanetId');

export const celestialViewerPlanetDataUris = makeVarPersisted<{
  celestialId: string;
  uris: { seed: string; uri: string }[];
}>(null, 'planetDataUris');
