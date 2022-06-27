import { useSubscription } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Link, Text, TextProps } from '@chakra-ui/layout';
import { Button, HStack, useColorModeValue, VStack } from '@chakra-ui/react';
import {
  GalaxiesDocument,
  GalaxiesSubscription,
  GalaxiesWithOwnedCelestialsDocument,
  GalaxiesWithOwnedCelestialsSubscription,
} from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { GalaxyThumbnail } from '../canvases/galaxy-thumbnail/galaxy-thumbnail';
import { dbGalaxyToGalaxyConfig } from '../canvases/_utils/db-galaxy-to-galaxy-config';
import { Loading } from '../components/loading';

export const GalaxyGalleryContainer = () => {
  const { user } = useAuth0();

  const { data: myGalaxyIds, loading: myGalaxyIdsLoading } =
    useSubscription<GalaxiesWithOwnedCelestialsSubscription>(
      GalaxiesWithOwnedCelestialsDocument,
      { variables: { userId: user.sub } }
    );

  const { data, loading } =
    useSubscription<GalaxiesSubscription>(GalaxiesDocument);

  const [galaxiesJoined, setGalaxiesJoined] =
    useState<GalaxiesSubscription['galaxy']>(null);

  const [galaxiesToJoin, setGalaxiesToJoin] =
    useState<GalaxiesSubscription['galaxy']>(null);

  const bgcol = useColorModeValue('gray.400', 'gray.900');
  const col = useColorModeValue('teal.900', 'teal.300');

  const textProps: TextProps = {
    position: 'absolute',
    fontSize: 'xs',
    marginBottom: '0.5rem',
  };

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
              {...{ galaxyConfig, bgcol, col, i, textProps }}
            />
          ))}
      </Box>

      <Text padding={5}>Already joined</Text>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {galaxiesJoined &&
          galaxiesJoined.map((galaxyConfig, i) => (
            <GalaxyTile
              key={i}
              {...{ galaxyConfig, bgcol, col, i, textProps }}
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
        <Button colorScheme="teal" height="40px">
          Go create one!
        </Button>
      </Link>
    </Box>
  );
};

const GalaxyTile = ({
  galaxyConfig,
  bgcol,
  col,
  i,
  textProps,
}: {
  galaxyConfig: GalaxiesSubscription['galaxy'][0];
  bgcol: string;
  col: string;

  i: number;
  textProps: TextProps;
}) => {
  const hoverCol = useColorModeValue('teal.900', 'teal.200');
  const hoverBg = useColorModeValue('teal.300', 'teal.800');

  const customHover = {
    _hover: {
      textDecor: 'unset',
      background: hoverBg,
      color: hoverCol,
    },
  };
  return (
    <Link
      height="20vw"
      width="20vw"
      minWidth="200px"
      minHeight="200px"
      maxHeight="400px"
      maxWidth="400px"
      as={ReactRouterLink}
      key={galaxyConfig.id}
      bgColor={bgcol}
      color={col}
      to={`/galaxies/${galaxyConfig.id}`}
      {...customHover}
      margin={3}
    >
      <HStack
        justify="center"
        position="relative"
        width="100%"
        height="100%"
        marginRight={5}
      >
        <GalaxyThumbnail
          galaxyConfig={dbGalaxyToGalaxyConfig(galaxyConfig)}
          thumbnailNumber={i}
        />

        <Text top="0.5rem" left="0.5rem" {...textProps}>
          {galaxyConfig.name}
        </Text>
        <Text top="0.5rem" right="0.5rem" {...textProps}>
          Stars: {galaxyConfig.stars}
        </Text>
        <Text bottom="0.5rem" left="0.5rem" {...textProps} mb="unset">
          Total Owned Celestials: {galaxyConfig.celestials.length}
        </Text>
      </HStack>
    </Link>
  );
};
