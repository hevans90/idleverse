import { makeVar } from '@apollo/client';
import { Faction } from '@idleverse/galaxy-gql';
import { FACTIONS, HydratedMediaResult } from '@idleverse/models';
import { makeVarPersisted } from './utils';

export const factionsVar = makeVar<Faction[]>([]);

export const factionsMediaVar = makeVar<{
  data: HydratedMediaResult[];
}>({
  data: [],
});

export const factionsMediaListenedToVar = makeVarPersisted<{
  [key in typeof FACTIONS[number]]: boolean;
}>({ ancients: false, nihils: false }, 'factionsMediaListenedToVar');
