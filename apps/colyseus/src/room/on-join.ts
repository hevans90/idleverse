import {
  basicShip,
  ColyseusImpulse,
  ColyseusShip,
  ColyseusSpawnLocation,
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

  const unclaimedSpawnLocations: ColyseusSpawnLocation[] =
    room.state.spawnLocations.filter(
      (spawn) => !spawn?.colyseusUserId || spawn?.colyseusUserId === undefined
    );

  // claim a random unclaimed spawn
  const claimedSpawn =
    unclaimedSpawnLocations[
      Math.floor(Math.random() * unclaimedSpawnLocations.length)
    ];

  claimedSpawn.colyseusUserId = client.id;

  // create the player's ship at the newly-claimed spawn location
  room.state.ships.push(
    new ColyseusShip({
      ...basicShip,
      colyseusUserId: client.id,
      positionX: claimedSpawn.x,
      positionY: claimedSpawn.y,
    })
  );

  console.log(`${options.displayName} (${client.sessionId}) joined!`);
};
