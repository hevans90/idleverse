import { makeVar } from '@apollo/client';
import { Background, Faction, Playable_Race } from '@idleverse/galaxy-gql';

export const characterCreationVar = makeVar<{
  race: Playable_Race;
  background: Background;
  faction: Faction;
}>({
  race: undefined,
  background: undefined,
  faction: undefined,
});
