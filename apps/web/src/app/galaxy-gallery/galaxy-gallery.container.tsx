import { useReactiveVar, useSubscription } from '@apollo/client';
import { Box, Link, Text } from '@chakra-ui/layout';
import { Button, VStack } from '@chakra-ui/react';
import {
  GalaxiesDocument,
  GalaxiesSubscription,
  GalaxiesWithOwnedCelestialsDocument,
  GalaxiesWithOwnedCelestialsSubscription,
} from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Loading } from '../components/loading';

import { colorsVar, selfVar } from '@idleverse/state';
import { GalaxyTile } from './galaxy-tile';

export const GalaxyGalleryContainer = () => {
  const { id: userId } = useReactiveVar(selfVar);

  const { secondary } = useReactiveVar(colorsVar);

  const { data: myGalaxyIds, loading: myGalaxyIdsLoading } =
    useSubscription<GalaxiesWithOwnedCelestialsSubscription>(
      GalaxiesWithOwnedCelestialsDocument,
      { variables: { userId } }
    );

  const { data, loading } =
    useSubscription<GalaxiesSubscription>(GalaxiesDocument);

  const [galaxiesJoined, setGalaxiesJoined] =
    useState<GalaxiesSubscription['galaxy']>(null);

  const [galaxiesToJoin, setGalaxiesToJoin] =
    useState<GalaxiesSubscription['galaxy']>(null);

  useEffect(() => {
    if (data && myGalaxyIds) {
      setGalaxiesToJoin(
        data.galaxy.filter(
          ({ id }) =>
            !myGalaxyIds.galaxy_aggregate.nodes.map(({ id }) => id).includes(id)
        )
      );

      setGalaxiesJoined(
        data.galaxy.filter(({ id }) =>
          myGalaxyIds.galaxy_aggregate.nodes.map(({ id }) => id).includes(id)
        )
      );
    }
  }, [data, myGalaxyIds, loading, myGalaxyIdsLoading]);

  if (loading || myGalaxyIdsLoading) {
    return (
      <Loading text="Loading Galaxies" height="100%" width="100%"></Loading>
    );
  }

  return data.galaxy.length && myGalaxyIds.galaxy_aggregate ? (
    <VStack width="100%" paddingTop={10}>
      <Text padding={5}>Galaxies to join</Text>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {galaxiesToJoin &&
          galaxiesToJoin.map((galaxyConfig, i) => (
            <GalaxyTile
              key={i}
              {...{
                alreadyJoined: false,
                galaxyConfig,
                i,
                displayOwnershipTotals: false,
                totalUserOwns: 0,
              }}
            />
          ))}
      </Box>

      <Text padding={5}>Already joined</Text>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {galaxiesJoined &&
          galaxiesJoined.map((galaxyConfig, i) => (
            <GalaxyTile
              key={i}
              {...{
                alreadyJoined: true,
                galaxyConfig,
                i,
                displayOwnershipTotals: true,
                totalUserOwns: myGalaxyIds.galaxy_aggregate.nodes.filter(
                  (x) => x.id === galaxyConfig.id
                ).length,
              }}
            />
          ))}
      </Box>
    </VStack>
  ) : (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="2xl">No galaxies found...</Text>

      <Link as={ReactRouterLink} to="../galaxy-gen" ml="1rem">
        <Button colorScheme={secondary} height="40px">
          Go create one!
        </Button>
      </Link>
    </Box>
  );
};
