import { makeVar } from '@apollo/client';
import { PlayableRacesQuery } from '@idleverse/galaxy-gql';

export type PlayableRace = PlayableRacesQuery['playable_race'][0];

export const playableRacesVar = makeVar<PlayableRace[]>([]);
