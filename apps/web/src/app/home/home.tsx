import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Home = () => {
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

      <Box mt="1rem">
        <Link to="/galaxies">
          <Button colorScheme="teal" height="40px">
            Galaxy Gallery
          </Button>
        </Link>
      </Box>
      <Box mt="1rem">
        <Link to="/galaxy-gen">
          <Button colorScheme="teal" height="40px">
            Galaxy Generator
          </Button>
        </Link>
      </Box>
      <Box mt="1rem">
        <Link to="/solar-system">
          <Button colorScheme="teal" height="40px">
            Solar System Viewer
          </Button>
        </Link>
      </Box>
      <Box mt="1rem">
        <Link to="/gravity-sim">
          <Button colorScheme="teal" height="40px">
            Gravity Simulation
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
