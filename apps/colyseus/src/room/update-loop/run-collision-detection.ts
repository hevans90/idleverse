import {
  Collision,
  ColyseusEntity,
  ServerGameMessage,
} from '@idleverse/colyseus-shared';
import { colyseusClientIdFromGridClientId } from '../_utils';
import { SpatialHashGridClient } from '../collision-detection/models';
import { GameRoom } from '../room';
import { resolveCollision } from './resolve-collisions';

const CLIENT_BOUNCINESS = 0.8;

const processCollision = ({
  nearbyClients,
  room,
  target,
}: {
  nearbyClients: SpatialHashGridClient[];
  room: GameRoom;
  target: Collision['target'];
}) => {
  nearbyClients.forEach((client) => {
    const colyseusClientId = colyseusClientIdFromGridClientId(client.name);

    const colyseusClient = room.clients.find(
      ({ id }) => id === colyseusClientId
    );

    if (colyseusClient) {
      const collisionId = `client-${colyseusClient.id}__${target.name}-${target.id}`;

      if (collisionId in room.collisionsUnderResolution) {
        console.log(
          'collision already being resolved for these entities',
          collisionId
        );
        return;
      }

      let collisionClient: ColyseusEntity;

      if (client.geometry === 'rectangle') {
        collisionClient = {
          position: client.position,
          geometry: 'rectangle',
          width: client.dimensions.width,
          height: client.dimensions.height,
          name: client.name,
          id: colyseusClient.id,
          bounciness: CLIENT_BOUNCINESS,
        };
      } else if (client.geometry === 'circle') {
        collisionClient = {
          position: client.position,
          geometry: 'circle',
          radius: client.dimensions.radius,
          name: client.name,
          id: colyseusClient.id,
          bounciness: CLIENT_BOUNCINESS,
        };
      }

      const collision: Collision = {
        id: collisionId,
        target,
        client: collisionClient,
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
};

export const runCollisionDetection = (room: GameRoom) => {
  room.state.ships.forEach((ship) => {
    const {
      positionX: x,
      positionY: y,
      width,
      height,
      name,
      colyseusUserId,
    } = ship;

    const nearbyGridClients = room.grid
      .findNearby({ x, y }, { width, height })
      .filter(
        ({ name: gridClientName }) =>
          //  DO NOT COLLIDE WITH SELF
          colyseusClientIdFromGridClientId(gridClientName) !== colyseusUserId
      );

    if (nearbyGridClients.length) {
      processCollision({
        nearbyClients: nearbyGridClients,
        room,
        target: {
          name,
          id: colyseusUserId,
          position: { x, y },
          geometry: 'rectangle',
          width,
          height,
          bounciness: CLIENT_BOUNCINESS,
        },
      });
    }
  });

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
      processCollision({
        nearbyClients: nearbyGridClients,
        room,
        target: {
          name: `celestial-${name}`,
          id: celestialId,
          position: { x, y },
          geometry: 'circle',
          radius,
          bounciness: 0.2,
        },
      });
    }
  });
};
