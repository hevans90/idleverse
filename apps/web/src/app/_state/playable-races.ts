import { makeVar } from '@apollo/client';
import { PlayableRacesQuery } from '@idleverse/galaxy-gql';

export const playableRacesVar = makeVar<PlayableRacesQuery['playable_race']>(
  []
);
