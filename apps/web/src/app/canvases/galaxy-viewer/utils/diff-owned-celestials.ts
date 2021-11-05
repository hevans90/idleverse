import { CelestialsByGalaxyIdSubscription } from '@idleverse/graphql';

export type claimedCelestials =
  CelestialsByGalaxyIdSubscription['galaxy_by_pk']['celestials'];

export const diffOwnedCelestials = (
  prev: claimedCelestials,
  curr: claimedCelestials
): { additions: claimedCelestials; deletions: claimedCelestials } => {
  const additions: claimedCelestials = undefined;
  const deletions: claimedCelestials = undefined;

  return {
    additions,
    deletions,
  };
};
