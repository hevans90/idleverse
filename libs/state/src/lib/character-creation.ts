import {
  Background,
  Faction,
  PlanetCreationInput,
  Playable_Race,
} from '@idleverse/galaxy-gql';
import { CelestialVariant } from '@idleverse/models';
import { makeVarPersisted } from './utils';

export const characterCreationVar = makeVarPersisted<{
  race?: Playable_Race;
  background?: Background;
  faction?: Faction;
  system?: {
    planets: PlanetCreationInput[];
    celestial: CelestialVariant;
    asteroidBelt: null;
  };
}>(
  {
    race: undefined,
    background: undefined,
    faction: undefined,
    system: undefined,
  },
  'character-creation'
);
