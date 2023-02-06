import {
  basicShip,
  ColyseusImpulse,
  ColyseusShip,
  ColyseusSpawnLocation,
  ColyseusUser,
  JoinOptions,
  ServerStatusMessage,
} from '@idleverse/colyseus-shared';
import { Client, ServerError } from 'colyseus';
import { logger } from './_utils';
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
  room.broadcast(
    ServerStatusMessage.PlayerJoined,
    `${options.displayName} joined!`
  );

  room.state.connectedUsers.push(
    new ColyseusUser({ ...options, colyseusUserId: client.id, connected: true })
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

  claimedSpawn.userId = options.userId;
  claimedSpawn.colyseusUserId = client.id;

  // create the player's ship at the newly-claimed spawn location

  const shipName = `${options.displayName}'s ship`;

  const newShip = new ColyseusShip({
    ...basicShip,
    name: shipName,
    userId: options.userId,
    colyseusUserId: client.id,
    positionX: claimedSpawn.x,
    positionY: claimedSpawn.y,
  });

  room.state.ships.push(newShip);

  // collision detection
  const gridClient = room.grid.newClient(
    client.id,
    shipName,
    {
      x: claimedSpawn.x,
      y: claimedSpawn.y,
    },
    { width: newShip.width, height: newShip.height },
    'rectangle'
  );

  room.gridClients[client.id] = gridClient;

  logger.success(`${options.displayName} (${client.sessionId}) joined!`);
};
