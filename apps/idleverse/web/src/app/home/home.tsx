import { VStack, Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const links: { route: string; display: string }[] = [
    {
      route: 'galaxies',
      display: 'Galaxy Gallery',
    },
    {
      route: 'galaxy-gen',
      display: 'Galaxy Generator',
    },
    {
      route: 'solar-system',
      display: 'Solar System Viewer',
    },
    {
      route: 'gravity-sim',
      display: '2D Gravity Simulation',
    },
    {
      route: 'planet-gen',
      display: '3D Planet Generator',
    },
  ];

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      margin="0 1rem 0 1rem"
    >
      <Text fontSize="5xl" textAlign="center" marginBottom="2rem">
        Welcome to Idleverse
      </Text>
      <Text fontSize="l" textAlign="center" marginBottom="2rem">
        There is no game yet, just proof-of-concepts for realtime software
        architecture. Check out the galaxy gallery to see the beginnings of the
        multiplayer experience.
      </Text>

      <VStack>
        {links.map(({ route, display }) => (
          <Link to={`/${route}`}>
            <Button colorScheme="teal" height="40px">
              {display}
            </Button>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};
