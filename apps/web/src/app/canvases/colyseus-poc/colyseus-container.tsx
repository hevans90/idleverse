import 'reflect-metadata';

import { useReactiveVar } from '@apollo/client';

import { Client, Room, RoomAvailable } from 'colyseus.js';
import { useEffect, useState } from 'react';
import { accessTokenVar, selfVar } from '../../_state/reactive-variables';

import { useToast } from '@chakra-ui/react';
import {
  JoinOptions,
  RoomState,
  ServerMessage,
} from '@idleverse/colyseus-shared';
import { loadColyseusAssets } from '../../asset-loading/load-colyseus-assets';
import { loadPlanets } from '../../asset-loading/load-planets';
import { Loading } from '../../components/loading';
import { PixiWrapper } from '../_utils/pixi-wrapper';
import { ColyseusGame } from './colyseus-game';
import { ColyseusGameInfo } from './ui/colyseus-game-info';
import { ColyseusNotifications } from './ui/colyseus-notifications';
import { ColyseusSocial } from './ui/social';

export const ColyseusContainer = () => {
  const accessToken = useReactiveVar(accessTokenVar);
  const toast = useToast();

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

    let room: Room;

    try {
      room = await client.joinOrCreate('my-room', joinState);
    } catch (e) {
      let title = 'Something went wrong, see console.';
      console.error(e);

      if ((e?.message as string).includes('auth0.com')) {
        title = 'Failed to connect to auth server.';
      }

      if (e?.message) {
        title = e.message;
      }

      toast({ title, status: 'error' });
      setJoiningRoom(false);
      return;
    }
    setJoiningRoom(false);
    setRoom(room);

    // sync initial state of room
    room.onStateChange.once(
      ({ connectedUsers, patchFrames, impulses }: RoomState) =>
        setRoomState({ connectedUsers, patchFrames, impulses })
    );

    // subsequent realtime state updates
    room.onStateChange(({ connectedUsers, patchFrames, impulses }: RoomState) =>
      setRoomState({ connectedUsers, patchFrames, impulses })
    );

    room.onMessage(ServerMessage.ClientDisconnected, () => {
      setRoom(undefined);
      setRoomState(undefined);
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

  const [colyseusSpritesLoading, setColyseusSpritesLoading] = useState(true);
  const [celestialSpritesLoading, setCelestialSpritesLoading] = useState(true);

  const [room, setRoom] = useState<Room>();
  const [leavingRoom, setLeavingRoom] = useState<boolean>();
  const [joiningRoom, setJoiningRoom] = useState<boolean>();
  const [roomState, setRoomState] =
    useState<Pick<RoomState, 'connectedUsers' | 'patchFrames' | 'impulses'>>();
  const [availableRooms, setAvailableRooms] = useState<RoomAvailable[]>();

  const loadPixiAssets = async () => {
    await loadColyseusAssets();
    setColyseusSpritesLoading(false);

    await loadPlanets();
    setCelestialSpritesLoading(false);
  };

  useEffect(() => {
    loadPixiAssets();

    // TODO: use this for matchmaking/lobby room picker
    listRooms().then((rooms) => setAvailableRooms(rooms));
  }, []);

  if (celestialSpritesLoading) {
    return (
      <Loading
        width="100%"
        height="100%"
        text="Loading celestial sprites"
      ></Loading>
    );
  }
  if (colyseusSpritesLoading) {
    return (
      <Loading
        width="100%"
        height="100%"
        text="Loading core game sprites"
      ></Loading>
    );
  }

  return (
    <PixiWrapper
      showGameUI={false}
      ui={
        <>
          <ColyseusGameInfo
            joined={!!roomState}
            joiningInProgress={joiningRoom}
            leavingInProgress={leavingRoom}
            joinCallback={joinRoom}
            leaveCallback={leaveRoom}
            roomState={roomState}
          />
          {roomState && (
            <>
              <ColyseusSocial
                connectedUsers={roomState.connectedUsers}
                impulses={roomState.impulses}
              />
              <ColyseusNotifications room={room} />
            </>
          )}
        </>
      }
    >
      {roomState && <ColyseusGame room={room}></ColyseusGame>}
    </PixiWrapper>
  );
};
