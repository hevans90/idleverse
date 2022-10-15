import { useReactiveVar } from '@apollo/client';
import { Box, Button, Code, Text } from '@chakra-ui/react';

import { Client, RoomAvailable } from 'colyseus.js';
import { useEffect, useState } from 'react';
import { accessTokenVar, selfVar } from '../../_state/reactive-variables';

import { JoinOptions, MyRoomState } from '@idleverse/colyseus-shared';

export const ColyseusPoc = () => {
  const accessToken = useReactiveVar(accessTokenVar);

  const {
    display_name: displayName,
    avatar_url: avatarUrl,
    id: userId,
  } = useReactiveVar(selfVar);

  const client = new Client('ws://localhost:1447');

  const joinState: JoinOptions = {
    accessToken,
    avatarUrl,
    displayName,
  };

  const joinRoom = async () => {
    const room = await client.joinOrCreate('my-room', joinState);

    // sync initial state of room
    room.onStateChange.once((state: MyRoomState) => {
      setRoomState(state);
      console.log('initial state', state);
    });
    room.onStateChange((state: MyRoomState) => {
      setRoomState(state);
      console.log('updated state', state);
    });
  };

  const listRooms = async () => {
    const rooms = await client.getAvailableRooms();

    return rooms;
  };

  const [roomState, setRoomState] = useState<MyRoomState>();
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
      <Code>{JSON.stringify(roomState, null, 2)}</Code>
    </Box>
  );
};
