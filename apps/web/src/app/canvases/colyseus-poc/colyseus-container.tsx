import 'reflect-metadata';

import { useReactiveVar } from '@apollo/client';

import { Client, Room } from 'colyseus.js';
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
import { colyseusSessionVar } from '../../_state/colyseus';
import { PixiWrapper } from '../_utils/pixi-wrapper';
import { ColyseusGame } from './colyseus-game';
import { ColyseusGameInfo } from './ui/colyseus-game-info';
import { ColyseusNotifications } from './ui/colyseus-notifications';
import { ColyseusSocial } from './ui/social';

export const ColyseusContainer = () => {
  const accessToken = useReactiveVar(accessTokenVar);
  const toast = useToast();

  const previousSession = useReactiveVar(colyseusSessionVar);
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

  const joinRoom = async (
    { previous }: { previous: boolean } = { previous: false }
  ) => {
    setJoiningRoom(true);

    let room: Room;

    try {
      if (previous) {
        room = await rejoinRoom(
          previousSession.roomId,
          previousSession.clientId
        );
        toast({
          title: 'Successfully reconnected to previous session.',
          status: 'success',
        });
      } else {
        room = await client.joinOrCreate('my-room', joinState);
      }
    } catch (e) {
      let title = 'Something went wrong, see console.';
      console.error(e);

      if ((e?.message as string).includes('auth0.com')) {
        title = 'Failed to connect to auth server.';
      }
      if ((e?.message as string).includes('rejoin')) {
        title = e.message;
      }

      if (e?.message) {
        title = e.message;
      }

      toast({ title, status: 'error' });
      setJoiningRoom(false);
      setRoom(undefined);
      setRoomState(undefined);
      return;
    }
    setJoiningRoom(false);
    setRoom(room);
    colyseusSessionVar({ roomId: room.id, clientId: room.sessionId });

    // sync initial state of room
    room.onStateChange.once((roomState: RoomState) =>
      setRoomState({ ...roomState })
    );

    // subsequent realtime state updates
    room.onStateChange((roomState: RoomState) =>
      setRoomState({ ...roomState })
    );

    room.onMessage(ServerMessage.ClientDisconnected, () => {
      setRoom(undefined);
      setRoomState(undefined);
    });
  };

  const rejoinRoom = async (roomId: string, sessionId: string) => {
    let room: Room;
    try {
      room = await client.reconnect(roomId, sessionId);
    } catch (e) {
      console.error(e);
      colyseusSessionVar(undefined);
      throw new Error('Failed to rejoin previous session, see console.');
    }

    return room;
  };

  const leaveRoom = async () => {
    setLeavingRoom(true);
    await room.leave(true);
    setLeavingRoom(false);
    setRoom(undefined);
    setRoomState(undefined);
    colyseusSessionVar(undefined);
  };

  const [colyseusSpritesLoading, setColyseusSpritesLoading] = useState(true);
  const [celestialSpritesLoading, setCelestialSpritesLoading] = useState(true);

  const [room, setRoom] = useState<Room>();
  const [leavingRoom, setLeavingRoom] = useState<boolean>();
  const [joiningRoom, setJoiningRoom] = useState<boolean>();
  const [roomState, setRoomState] =
    useState<
      Pick<
        RoomState,
        | 'connectedUsers'
        | 'patchFrames'
        | 'impulses'
        | 'ships'
        | 'spawnLocations'
        | 'columns'
        | 'rows'
        | 'height'
        | 'width'
      >
    >();

  const loadPixiAssets = async () => {
    await loadColyseusAssets();
    setColyseusSpritesLoading(false);

    await loadPlanets();
    setCelestialSpritesLoading(false);
  };

  useEffect(() => {
    loadPixiAssets();

    if (previousSession) {
      joinRoom({ previous: true });
    }
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
      {roomState && (
        <ColyseusGame
          room={room}
          ships={roomState.ships}
          dimensions={{
            width: roomState.width,
            height: roomState.height,
            columns: roomState.columns,
            rows: roomState.rows,
          }}
        ></ColyseusGame>
      )}
    </PixiWrapper>
  );
};
