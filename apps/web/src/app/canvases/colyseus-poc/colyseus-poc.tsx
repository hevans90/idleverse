import { useReactiveVar } from '@apollo/client';

import { Client, Room, RoomAvailable } from 'colyseus.js';
import { useEffect, useState } from 'react';
import { accessTokenVar, selfVar } from '../../_state/reactive-variables';

import { Code } from '@chakra-ui/react';
import { JoinOptions, RoomState } from '@idleverse/colyseus-shared';
import { PixiWrapper } from '../_utils/pixi-wrapper';
import { ColyseusGameInfo } from './ui/colyseus-game-info';
import { ColyseusSocial } from './ui/social';

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
    userId,
  };

  const joinRoom = async () => {
    setJoiningRoom(true);
    const room = await client.joinOrCreate('my-room', joinState);
    setJoiningRoom(false);
    setRoom(room);

    // sync initial state of room
    room.onStateChange.once(({ connectedUsers, patchFrames }: RoomState) => {
      setRoomState({ connectedUsers, patchFrames });
      console.log(
        'initial state',
        connectedUsers.map((user) => ({ ...user }))
      );
    });

    // subsequent realtime state updates
    room.onStateChange(({ connectedUsers, patchFrames }: RoomState) => {
      setRoomState({ connectedUsers, patchFrames });
      console.log(
        'updated state',
        connectedUsers.map((user) => ({ ...user }))
      );
    });
  };

  const leaveRoom = async () => {
    setLeavingRoom(true);
    await room.leave(true);
    setLeavingRoom(false);
    setRoom(undefined);
    setRoomState(undefined);
  };

  const listRooms = async () => {
    const rooms = await client.getAvailableRooms();
    return rooms;
  };

  const [room, setRoom] = useState<Room>();
  const [leavingRoom, setLeavingRoom] = useState<boolean>();
  const [joiningRoom, setJoiningRoom] = useState<boolean>();
  const [roomState, setRoomState] =
    useState<Pick<RoomState, 'connectedUsers' | 'patchFrames'>>();
  const [availableRooms, setAvailableRooms] = useState<RoomAvailable[]>();

  useEffect(() => {
    listRooms().then((rooms) => setAvailableRooms(rooms));
  }, []);

  return (
    <PixiWrapper
      showGameUI={false}
      ui={
        <>
          <Code>{roomState?.connectedUsers.length}</Code>
          <ColyseusGameInfo
            joined={!!roomState}
            joiningInProgress={joiningRoom}
            leavingInProgress={leavingRoom}
            joinCallback={joinRoom}
            leaveCallback={leaveRoom}
            roomState={roomState}
          />
          {roomState && (
            <ColyseusSocial connectedUsers={roomState.connectedUsers} />
          )}
        </>
      }
    ></PixiWrapper>
  );
};
