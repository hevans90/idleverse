import { Collision, ServerGameMessage } from '@idleverse/colyseus-shared';
import { GameRoom } from '../room';
import { colyseusClientIdFromGridClientId } from './utils';

export const runCollisionDetection = (room: GameRoom) => {
  // for each celestial loaded, setup circular collision detection within our spatial hash grid
  room.state.celestials.forEach((celestial) => {
    const { positionX: x, positionY: y, radius, name, id } = celestial;

    const nearbyGridClients = room.grid.findNearbyCircle({ x, y }, radius);

    if (nearbyGridClients.length) {
      nearbyGridClients.forEach((client) => {
        const colyseusClientId = colyseusClientIdFromGridClientId(client.name);
        const colyseusClient = room.clients.find(
          ({ id }) => id === colyseusClientId
        );

        if (colyseusClient) {
          const collision: Collision = {
            target: {
              position: { x, y },
              geometry: 'circle',
              name,
              id,
              radius,
            },
            client: {
              position: client.position,
              geometry: 'rectangle',
              width: client.dimensions.width,
              height: client.dimensions.height,
              name: client.name,
              id: colyseusClient.id,
            },
          };
          colyseusClient.send(ServerGameMessage.Collision, collision);
        } else {
          console.error(
            'Collision detection: No colyseus client found for ID:',
            colyseusClientId
          );
        }
      });
    }
  });
};
