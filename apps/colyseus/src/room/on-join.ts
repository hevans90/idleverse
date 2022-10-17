import {
  ColyseusImpulse,
  ColyseusUser,
  JoinOptions,
  ServerMessage,
} from '@idleverse/colyseus-shared';
import { Client } from 'colyseus';
import { GameRoom } from './room';

export const onJoin = (
  client: Client,
  options: JoinOptions,
  room: GameRoom
) => {
  room.broadcast(ServerMessage.PlayerJoined, `${options.displayName} joined!`);

  room.state.connectedUsers.push(
    new ColyseusUser({ ...options, colyseusUserId: client.id })
  );
  room.state.impulses.push(
    new ColyseusImpulse({
      left: false,
      up: false,
      right: false,
      down: false,
      colyseusUserId: client.id,
    })
  );

  room.clients;

  console.log(`${options.displayName} (${client.sessionId}) joined!`);
};
