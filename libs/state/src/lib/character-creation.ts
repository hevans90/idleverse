import {
  Background,
  Faction,
  PlanetCreationInput,
  Playable_Race,
} from '@idleverse/galaxy-gql';
import { makeVarPersisted } from './utils';

export const characterCreationVar = makeVarPersisted<{
  race?: Playable_Race;
  background?: Background;
  faction?: Faction;
  homeworld?: PlanetCreationInput;
}>(
  {
    race: undefined,
    background: undefined,
    faction: undefined,
    homeworld: undefined,
  },
  'character-creation'
);
