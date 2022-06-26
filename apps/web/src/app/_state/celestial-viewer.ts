import { makeVarPersisted } from './utils';

export const celestialViewerSelectedPlanetId = makeVarPersisted<string>(
  null,
  'selectedPlanetId'
);

export const celestialViewerPlanetDataUris = makeVarPersisted<{
  celestialId: string;
  uris: { seed: string; uri: string }[];
}>(null, 'planetDataUris');
