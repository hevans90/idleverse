import { useSubscription } from '@apollo/client';
import { Box, Link, Text, TextProps } from '@chakra-ui/layout';
import { Button, CSSObject, useColorModeValue } from '@chakra-ui/react';
import { GalaxiesDocument, GalaxiesSubscription } from '@idleverse/galaxy-gql';
import { Link as ReactRouterLink, useRouteMatch } from 'react-router-dom';
import { dbGalaxyToGalaxyConfig } from '../canvases/_utils/db-galaxy-to-galaxy-config';
import { GalaxyThumbnail } from '../canvases/galaxy-thumbnail/galaxy-thumbnail';
import { Loading } from '../components/loading';

export const GalaxyGalleryContainer = () => {
  const { url } = useRouteMatch();

  const { data, loading } =
    useSubscription<GalaxiesSubscription>(GalaxiesDocument);

  const bgcol = useColorModeValue('gray.400', 'gray.900');
  const col = useColorModeValue('teal.900', 'teal.300');

  const hoverCol = useColorModeValue('teal.900', 'teal.200');
  const hoverBg = useColorModeValue('teal.300', 'teal.800');

  if (loading) {
    return (
      <Loading text="Loading Galaxies" height="100%" width="100%"></Loading>
    );
  }

  const textProps: TextProps = {
    position: 'absolute',
    fontSize: 'xs',
    marginBottom: '0.5rem',
  };

  const customHover = {
    _hover: {
      textDecor: 'unset',
      background: hoverBg,
      color: hoverCol,
    },
  };

  return data.galaxy.length ? (
    <Box d="flex" flexWrap="wrap" mt="5rem" ml="5rem">
      {data.galaxy.map((galaxyConfig, i) => (
        <Link
          as={ReactRouterLink}
          position="relative"
          d="flex"
          flexDir="column"
          key={galaxyConfig.id}
          margin="0 1rem 1rem 0"
          bgColor={bgcol}
          color={col}
          padding="1rem"
          to={`/galaxies/${galaxyConfig.id}`}
          {...customHover}
        >
          <Box position="relative">
            <GalaxyThumbnail
              galaxyConfig={dbGalaxyToGalaxyConfig(galaxyConfig)}
              thumbnailNumber={i}
            />

            <Text top="-0.5rem" left="-0.5rem" {...textProps}>
              {galaxyConfig.name}
            </Text>
            <Text top="-0.5rem" right="-0.5rem" {...textProps}>
              Stars: {galaxyConfig.stars}
            </Text>
            <Text bottom="-0.5rem" left="-0.5rem" {...textProps} mb="unset">
              Claimed Celestials: {galaxyConfig.celestials.length}
            </Text>
          </Box>
        </Link>
      ))}
    </Box>
  ) : (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="2xl">No galaxies found...</Text>

      <Link as={ReactRouterLink} to="../galaxy-gen" {...customHover} ml="1rem">
        <Button colorScheme="teal" height="40px">
          Go create one!
        </Button>
      </Link>
    </Box>
  );
};
