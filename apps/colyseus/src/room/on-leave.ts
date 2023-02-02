import {
  ColyseusSpawnLocation,
  ServerStatusMessage,
} from '@idleverse/colyseus-shared';
import { Client, ServerError } from 'colyseus';
import { findByColyseusClient, logger } from './_utils';
import { GameRoom } from './room';

export const onLeave = (client: Client, consented: boolean, room: GameRoom) => {
  const user = room.state.connectedUsers.find(findByColyseusClient({ client }));
  const impulse = room.state.impulses.find(findByColyseusClient({ client }));
  const ship = room.state.ships.find(findByColyseusClient({ client }));
  const spawnLocation = room.state.spawnLocations.find(
    findByColyseusClient({ client })
  );

  client.send(ServerStatusMessage.ClientDisconnected, 'You were disconnected.');

  room.broadcast(
    consented
      ? ServerStatusMessage.PlayerLeft
      : ServerStatusMessage.PlayerDisconnected,
    `${user.displayName} ${consented ? 'left' : 'disconnected'}`
  );

  const userIndex = room.state.connectedUsers.indexOf(user);
  room.state.connectedUsers.splice(userIndex, 1);

  const impulseIndex = room.state.impulses.indexOf(impulse);
  room.state.impulses.splice(impulseIndex, 1);

  const shipIndex = room.state.ships.indexOf(ship);
  room.state.ships.splice(shipIndex, 1);

  const spawnLocationIndex = room.state.spawnLocations.indexOf(spawnLocation);
  room.state.spawnLocations[spawnLocationIndex] = new ColyseusSpawnLocation({
    x: spawnLocation.x,
    y: spawnLocation.y,
  });

  logger.info(
    `${user.displayName} (${client.sessionId}) ${
      consented ? 'left voluntarily' : 'was disconnected'
    }.`
  );

  // update collision detection
  const gridClient = room.gridClients[`user_${user.colyseusUserId}`];

  if (!gridClient) {
    throw new ServerError(
      500,
      `could not find collision client for ${user.colyseusUserId} for removal`
    );
  }

  room.grid.removeClient(gridClient);
  delete room.gridClients[`user_${user.colyseusUserId}`];
};
