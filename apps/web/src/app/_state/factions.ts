import { makeVar } from '@apollo/client';
import { Faction } from '@idleverse/galaxy-gql';

export const factionsVar = makeVar<Faction[]>([]);
