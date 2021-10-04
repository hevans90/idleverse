import { useSubscription } from '@apollo/client';
import { Box, Link, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { GalaxiesDocument, GalaxiesSubscription } from '@idleverse/graphql';
import { Link as ReactRouterLink } from 'react-router-dom';
import { dbGalaxyToGalaxyConfig } from '../canvases/common-utils/db-galaxy-to-galaxy-config';
import { GalaxyThumbnail } from '../canvases/galaxy-thumbnail/galaxy-thumbnail';
import { Loading } from '../components/loading';

export const GalaxyGalleryContainer = () => {
  const { data, loading } =
    useSubscription<GalaxiesSubscription>(GalaxiesDocument);

  const bgcol = useColorModeValue('gray.400', 'gray.900');
  const col = useColorModeValue('teal.900', 'teal.300');

  const hoverCol = useColorModeValue('teal.900', 'teal.200');
  const hoverBg = useColorModeValue('teal.300', 'teal.800');

  if (loading) {
    return (
      <Loading text="Loading Galaxies..." height="100%" width="100%"></Loading>
    );
  }

  return (
    <Box d="flex" flexWrap="wrap" justifyContent="center" mt="5rem">
      {data.galaxy.map((galaxyConfig, i) => (
        <Link
          as={ReactRouterLink}
          position="relative"
          d="flex"
          flexDir="column"
          key={galaxyConfig.id}
          margin="0 1rem 1rem 0"
          padding="1rem"
          bgColor={bgcol}
          color={col}
          to={`/galaxies/${galaxyConfig.id}`}
          _hover={{
            textDecor: 'unset',
            background: hoverBg,
            color: hoverCol,
          }}
        >
          <Box position="relative">
            <GalaxyThumbnail
              galaxyConfig={dbGalaxyToGalaxyConfig(galaxyConfig)}
              thumbnailNumber={i}
            />
            <Box
              position="absolute"
              bottom="0"
              fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
            >
              <Text mb="0.5rem">{galaxyConfig.name}</Text>
              <Text mb="0.5rem">Stars: {galaxyConfig.stars}</Text>
              <Text>Claimed Celestials: {galaxyConfig.celestials.length}</Text>
            </Box>
          </Box>
        </Link>
      ))}
    </Box>
  );
};
