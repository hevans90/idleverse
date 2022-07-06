import { makeVar } from '@apollo/client';
import { Playable_Race } from '@idleverse/galaxy-gql';

export const playableRacesVar = makeVar<Playable_Race[]>([]);
