import { useReactiveVar } from '@apollo/client';
import { Box, Button, Code, Text } from '@chakra-ui/react';

import { Client, Room, RoomAvailable } from 'colyseus.js';
import { useEffect, useState } from 'react';
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

    setRoom(room);
  };

  const listRooms = async () => {
    const rooms = await client.getAvailableRooms();

    return rooms;
  };

  const [room, setRoom] = useState<Room>();
  const [availableRooms, setAvailableRooms] = useState<RoomAvailable[]>();

  useEffect(() => {
    listRooms().then((rooms) => setAvailableRooms(rooms));
  }, []);

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
      <Code mb={5}>{JSON.stringify(availableRooms, null, 2)}</Code>
      <Button onClick={() => joinRoom()} mb={5}>
        Join Room
      </Button>
      <Code>{JSON.stringify(room, null, 2)}</Code>
    </Box>
  );
};
