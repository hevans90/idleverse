import { useReactiveVar } from '@apollo/client';
import { Box, Button, Code, Text } from '@chakra-ui/react';

import { Client, Room } from 'colyseus.js';
import { useState } from 'react';
import { accessTokenVar, selfVar } from '../../_state/reactive-variables';

export const ColyseusPoc = () => {
  const accessToken = useReactiveVar(accessTokenVar);

  const { display_name: displayName } = useReactiveVar(selfVar);

  const client = new Client('ws://localhost:1447');

  const joinRoom = async () => {
    const room = await client.joinOrCreate('my-room', {
      accessToken,
      displayName,
    });

    setGameState(room);
  };

  const [gameState, setGameState] = useState<Room>();

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
        Colyseus POC
      </Text>
      <Button onClick={() => joinRoom()} mb={5}>
        Join Room
      </Button>
      <Code>{JSON.stringify(gameState, null, 2)}</Code>
    </Box>
  );
};
