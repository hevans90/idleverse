import { Collision, ServerGameMessage } from '@idleverse/colyseus-shared';
import { colyseusClientIdFromGridClientId } from '../_utils';
import { GameRoom } from '../room';
import { resolveCollision } from './resolve-collisions';

export const runCollisionDetection = (room: GameRoom) => {
  // for each celestial loaded, setup circular collision detection within our spatial hash grid
  room.state.celestials.forEach((celestial) => {
    const {
      positionX: x,
      positionY: y,
      radius,
      name,
      id: celestialId,
    } = celestial;

    const nearbyGridClients = room.grid.findNearbyCircle({ x, y }, radius);

    if (nearbyGridClients.length) {
      nearbyGridClients.forEach((client) => {
        const colyseusClientId = colyseusClientIdFromGridClientId(client.name);
        const colyseusClient = room.clients.find(
          ({ id }) => id === colyseusClientId
        );

        if (colyseusClient) {
          const collisionId = `${colyseusClient.id}_${celestialId}`;

          if (collisionId in room.collisionsUnderResolution) {
            console.log('collision already being resolved for these entities');
            return;
          }

          const collision: Collision = {
            id: collisionId,
            target: {
              position: { x, y },
              geometry: 'circle',
              name,
              id: celestialId,
              radius,
              bounciness: 1,
            },
            client: {
              position: client.position,
              geometry: 'rectangle',
              width: client.dimensions.width,
              height: client.dimensions.height,
              name: client.name,
              id: colyseusClient.id,
              bounciness: 0.2,
            },
          };
          room.collisionsUnderResolution[collision.id] = collision;
          colyseusClient.send(ServerGameMessage.Collision, collision);
          // pass to our collision resolver
          resolveCollision(collision, room);
        } else {
          console.error(
            'Collision detection: No colyseus client found for ID:',
            colyseusClient.id
          );
        }
      });
    }
  });
};
