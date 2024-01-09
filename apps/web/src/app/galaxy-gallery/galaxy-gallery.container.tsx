import { useReactiveVar, useSubscription } from '@apollo/client';
import { Box, Link, Text } from '@chakra-ui/layout';
import { Button, SimpleGrid, VStack } from '@chakra-ui/react';
import {
  GalacticEmpiresByUserIdDocument,
  GalacticEmpiresByUserIdSubscription,
  GalacticEmpiresByUserIdSubscriptionVariables,
  GalaxiesDocument,
  GalaxiesSubscription,
} from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Loading } from '../components/loading';

import { colorsVar, selfVar } from '@idleverse/state';
import { GalaxyTile } from './galaxy-tile';

export const GalaxyGalleryContainer = () => {
  const { id: userId } = useReactiveVar(selfVar);

  const { secondary } = useReactiveVar(colorsVar);

  const { data: myEmpires, loading: loadingMyEmpires } = useSubscription<
    GalacticEmpiresByUserIdSubscription,
    GalacticEmpiresByUserIdSubscriptionVariables
  >(GalacticEmpiresByUserIdDocument, { variables: { userId } });

  const { data, loading } =
    useSubscription<GalaxiesSubscription>(GalaxiesDocument);

  const [galaxiesJoined, setGalaxiesJoined] =
    useState<GalaxiesSubscription['galaxy']>(null);

  const [galaxiesToJoin, setGalaxiesToJoin] =
    useState<GalaxiesSubscription['galaxy']>(null);

  useEffect(() => {
    if (data && myEmpires) {
      const myGalaxyIds = myEmpires.galactic_empire.map(
        ({ galaxy: { id } }) => id
      );

      setGalaxiesToJoin(
        data.galaxy.filter(({ id }) => !myGalaxyIds.includes(id))
      );

      setGalaxiesJoined(
        data.galaxy.filter(({ id }) => myGalaxyIds.includes(id))
      );
    }
  }, [data, myEmpires, loading, loadingMyEmpires]);

  if (loading || loadingMyEmpires) {
    return (
      <Loading text="Loading Galaxies" height="100%" width="100%"></Loading>
    );
  }

  return data.galaxy.length && myEmpires.galactic_empire.length ? (
    <VStack paddingTop={10} gap={5}>
      {galaxiesToJoin?.length && (
        <>
          <Text>Galaxies to join:</Text>
          <SimpleGrid minChildWidth={[150, 200, 250]} spacing={5}>
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
          </SimpleGrid>
        </>
      )}

      <Text textAlign="center">
        You already have empires in the following galaxies:
      </Text>
      <SimpleGrid
        width="100%"
        // maxWidth={['unset', 'unset', 'unset', '1000px']}
        minChildWidth={250}
        spacing={5}
        overflow="auto"
      >
        {/* <SimpleGrid minChildWidth="220px" spacing="40px"> */}
        {galaxiesJoined &&
          galaxiesJoined.map((galaxyConfig, i) => (
            <GalaxyTile
              key={i}
              {...{
                alreadyJoined: true,
                galaxyConfig,
                i,
                displayOwnershipTotals: true,
                totalUserOwns:
                  myEmpires.galactic_empire.find(
                    ({ galaxy: { id } }) => id === galaxyConfig.id
                  )?.celestials?.length ?? 0,
              }}
            />
          ))}
      </SimpleGrid>
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
