import { makeVar } from '@apollo/client';
import { Playable_Race } from '@idleverse/galaxy-gql';
import { HydratedMediaResult, RACES } from '@idleverse/models';
import { makeVarPersisted } from './utils';

export const playableRacesVar = makeVar<Playable_Race[]>([]);

export const playableRacesMediaVar = makeVar<{
  data: HydratedMediaResult[];
}>({
  data: [],
});

export const racesMediaListenedToVar = makeVarPersisted<{
  [key in typeof RACES[number]]: boolean;
}>({ forgotten: false, nomads: false, unc: false }, 'racesMediaListenedToVar');
