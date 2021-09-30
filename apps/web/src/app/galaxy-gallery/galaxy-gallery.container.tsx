import { useSubscription } from '@apollo/client';
import { Box, Heading, Link, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { GalaxiesDocument, GalaxiesSubscription } from '@idleverse/graphql';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Back } from '../components/back';
import { Loading } from '../components/loading';

export const GalaxyGalleryContainer = () => {
  const { data, loading } =
    useSubscription<GalaxiesSubscription>(GalaxiesDocument);

  const bgcol = useColorModeValue('gray.300', 'gray.900');
  const col = useColorModeValue('teal.900', 'teal.300');

  if (loading) {
    return (
      <Loading text="Loading Galaxies..." height="100%" width="100%"></Loading>
    );
  }

  return (
    <Box p="1rem" pt="7rem" pos="relative">
      <Back></Back>
      <Heading mb="2rem">Galaxies</Heading>
      <Box d="flex" flexWrap="wrap">
        {data.galaxy.map(({ id, stars, name, systems }) => (
          <Link
            as={ReactRouterLink}
            d="flex"
            flexDir="column"
            key={id}
            margin="0 1rem 1rem 0"
            padding="1rem"
            bgColor={bgcol}
            color={col}
            to={`/galaxies/${id}`}
          >
            <Text mb="0.5rem">{name}</Text>
            <Text mb="0.5rem">Stars: {stars}</Text>
            <Text>Claimed Systems: {systems.length}</Text>
          </Link>
        ))}
      </Box>
    </Box>
  );
};
