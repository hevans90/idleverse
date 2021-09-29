import { Box, Text } from '@chakra-ui/react';

export const Loading = () => (
  <Box
    height="100vh"
    width="100vw"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Text fontSize="4xl">Loading...</Text>
  </Box>
);
