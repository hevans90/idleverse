import {
  ColyseusImpulse,
  ColyseusUser,
  JoinOptions,
  ServerMessage,
} from '@idleverse/colyseus-shared';
import { Client, ServerError } from 'colyseus';
import { GameRoom } from './room';

export const onJoin = (
  client: Client,
  options: JoinOptions,
  room: GameRoom
) => {
  if (
    room.state.connectedUsers.find(({ userId }) => userId === options.userId)
  ) {
    throw new ServerError(
      403,
      'You are already connected on another device/browser tab!'
    );
  }
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

  console.log(`${options.displayName} (${client.sessionId}) joined!`);
};
