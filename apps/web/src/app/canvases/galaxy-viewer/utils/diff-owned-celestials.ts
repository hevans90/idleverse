import { CelestialsByGalaxyIdSubscription } from '@idleverse/galaxy-gql';

export type claimedCelestials =
  CelestialsByGalaxyIdSubscription['galaxy_by_pk']['celestials'];

export const diffOwnedCelestials = (
  prev: claimedCelestials,
  curr: claimedCelestials
): { additions: claimedCelestials; deletions: claimedCelestials } => {
  const additions = curr.filter(
    ({ id: currId }) => !prev.find(({ id }) => id === currId)
  );

  const deletions = prev.filter(
    ({ id: prevId }) => !curr.find(({ id }) => id === prevId)
  );

  return {
    additions: additions.length ? additions : undefined,
    deletions: deletions.length ? deletions : undefined,
  };
};
