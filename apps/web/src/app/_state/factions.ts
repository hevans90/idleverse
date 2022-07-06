import { makeVar } from '@apollo/client';
import { CharacterDataQuery } from '@idleverse/galaxy-gql';

export type Faction = CharacterDataQuery['faction'][0];

export const factionsVar = makeVar<Faction[]>([]);
