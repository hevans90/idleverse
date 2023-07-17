import 'reflect-metadata';

import { useReactiveVar } from '@apollo/client';

import { Client, Room } from 'colyseus.js';
import { useEffect, useRef, useState } from 'react';

import { useToast } from '@chakra-ui/react';
import {
  JoinOptions,
  RoomState,
  ServerStatusMessage,
} from '@idleverse/colyseus-shared';
import { environment } from '../../../environments/environment';

import {
  accessTokenVar,
  colyseusCelestialsVar,
  colyseusRoomDimensionsVar,
  colyseusRoomVar,
  colyseusSessionVar,
  colyseusShipsVar,
  selfVar,
} from '@idleverse/state';
import { loadColyseusAssets } from '../../asset-loading/load-colyseus-assets';
import { loadPlanets } from '../../asset-loading/load-planets';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { Loading } from '../../components/loading';
import { ColyseusGame } from './colyseus-game';
import { ColyseusGameInfo } from './ui/colyseus-game-info';
import { ColyseusGameSettingsDrawer } from './ui/colyseus-game-settings-drawer';
import { ColyseusNotifications } from './ui/colyseus-notifications';
import { ColyseusTrackingInfo } from './ui/colyseus-tracking-info';
import { ColyseusSocial } from './ui/social';

export const ColyseusContainer = () => {
  const accessToken = useReactiveVar(accessTokenVar);
  const dimensions = useReactiveVar(colyseusRoomDimensionsVar);
  const toast = useToast();

  const previousSession = useReactiveVar(colyseusSessionVar);
  const {
    display_name: displayName,
    avatar_url: avatarUrl,
    id: userId,
  } = useReactiveVar(selfVar);

  const client = new Client(environment.colyseusUrl);

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

    let room: Room<RoomState>;

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

      if ((e?.message as string)?.includes('auth0.com')) {
        title = 'Failed to connect to auth server.';
      }
      if ((e?.message as string)?.includes('rejoin')) {
        title = e.message;
      }

      if (e?.message) {
        title = e.message;
      }

      toast({ title, status: 'error' });
      setJoiningRoom(false);
      roomRef.current = undefined;
      setRoomState(undefined);
      return;
    }
    setJoiningRoom(false);
    roomRef.current = room;

    colyseusRoomVar(room);
    colyseusSessionVar({ roomId: room.id, clientId: room.sessionId });

    // sync initial state of room
    room.onStateChange.once((roomState: RoomState) => {
      const { width, height, columns, rows } = roomState;
      colyseusRoomDimensionsVar({ width, height, columns, rows });
      setRoomState({ ...roomState });
      colyseusShipsVar([...roomState.ships]);
      colyseusCelestialsVar([...roomState.celestials]);
    });

    // subsequent realtime state updates
    room.onStateChange((roomState: RoomState) => {
      setRoomState({ ...roomState });
      colyseusShipsVar([...roomState.ships]);
    });

    room.onMessage(ServerStatusMessage.ClientDisconnected, () => {
      roomRef.current = undefined;
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
    await roomRef.current.leave(true);
    setLeavingRoom(false);
    roomRef.current = undefined;
    setRoomState(undefined);
    colyseusSessionVar(undefined);
  };

  const [colyseusSpritesLoading, setColyseusSpritesLoading] = useState(true);
  const [celestialSpritesLoading, setCelestialSpritesLoading] = useState(true);

  const rejoiningRef = useRef<boolean>(false);
  const roomRef = useRef<Room>();
  const [leavingRoom, setLeavingRoom] = useState<boolean>();
  const [joiningRoom, setJoiningRoom] = useState<boolean>();
  const [roomState, setRoomState] =
    useState<
      Pick<
        RoomState,
        | 'celestials'
        | 'connectedUsers'
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

    if (previousSession && rejoiningRef.current === false) {
      rejoiningRef.current = true;
      joinRoom({ previous: true }).then(() => (rejoiningRef.current = false));
    }

    return () => {
      // trigger unconsented leave (disconnect, allowing reconnection) on unmount
      roomRef.current?.connection.close();
    };
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
          {roomState && roomRef.current && (
            <>
              <ColyseusSocial
                connectedUsers={roomState.connectedUsers}
                impulses={roomState.impulses}
              />
              <ColyseusNotifications room={roomRef.current} />
              <ColyseusTrackingInfo />
              <ColyseusGameSettingsDrawer />
            </>
          )}
        </>
      }
    >
      {roomState && dimensions && <ColyseusGame></ColyseusGame>}
    </PixiWrapper>
  );
};
