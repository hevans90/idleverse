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
    >
      <Text fontSize="5xl" textAlign="center" marginBottom="2rem">
        Welcome to Idleverse
      </Text>
      <Text fontSize="l" textAlign="center" marginBottom="2rem">
        There is no game yet, just proof-of-concepts for realtime software
        architecture, but stay tuned!
      </Text>

      <Link to="/galaxy-gen">
        <Button colorScheme="teal" height="40px">
          Try out the galaxy gen!
        </Button>
      </Link>
    </Box>
  );
};