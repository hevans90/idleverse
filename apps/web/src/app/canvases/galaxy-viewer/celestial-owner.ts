import {
  Celestial,
  CelestialsByGalaxyIdSubscription,
  User_Info,
} from '@idleverse/graphql';

export type CelestialOwner = Pick<User_Info, 'display_name' | 'avatar_url'> & {
  ownedCount: number;
  celestials: Partial<Celestial>[];
};

/**
 * Maps a galaxy response from Hasura to a `CelestialOwner`.
 */
export const celestialOwnerMapper = ({
  galaxy_by_pk: {
    celestials: allCelestials,
    celestials_aggregate: { nodes },
  },
}: CelestialsByGalaxyIdSubscription): CelestialOwner[] =>
  nodes.map(({ owner_id: currentOwnerId, user_info }) => {
    const ownedCelestials = allCelestials.filter(
      ({ owner_id }) => owner_id === currentOwnerId
    );

    return {
      ...user_info,
      ownedCount: ownedCelestials.length,
      celestials: ownedCelestials,
    };
  });
