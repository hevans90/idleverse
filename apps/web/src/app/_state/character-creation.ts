import { makeVar } from '@apollo/client';
import { PlayableRace } from './playable-races';

export const characterCreationVar = makeVar<{ race: PlayableRace }>({
  race: undefined,
});
