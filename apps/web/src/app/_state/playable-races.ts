import { makeVar } from '@apollo/client';
import { CharacterDataQuery } from '@idleverse/galaxy-gql';

export type PlayableRace = CharacterDataQuery['playable_race'][0];

export const playableRacesVar = makeVar<PlayableRace[]>([]);
