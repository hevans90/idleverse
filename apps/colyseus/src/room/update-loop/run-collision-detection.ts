import {
  Collision,
  ColyseusEntity,
  ServerGameMessage,
} from '@idleverse/colyseus-shared';
import { Client } from 'colyseus';
import throttle from 'lodash/throttle';
import { SpatialHashGridClient } from '../collision-detection/models';
import { GameRoom } from '../room';
import { resolveCollision } from './resolve-collisions';

const throttledMessage = throttle(
  (client: Client, collision: Collision) =>
    client.send(ServerGameMessage.Collision, collision),
  2000
);

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
    const collisionId = `client-${client.id}__${target.id}`;

    console.log('id', collisionId);
    console.log('collision between', {
      client: client.name,
      target: target.name,
    });

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
        id: client.id,
        position: client.position,
        geometry: 'rectangle',
        width: client.dimensions.width,
        height: client.dimensions.height,
        name: client.name,
        bounciness: CLIENT_BOUNCINESS,
      };
    } else if (client.geometry === 'circle') {
      collisionClient = {
        id: client.id,
        position: client.position,
        geometry: 'circle',
        radius: client.dimensions.radius,
        name: client.name,
        bounciness: CLIENT_BOUNCINESS,
      };
    }

    const collision: Collision = {
      id: collisionId,
      target,
      client: collisionClient,
    };
    room.collisionsUnderResolution[collision.id] = collision;

    const colyseusClient = room.clients.find(({ id }) => id === client.id);

    // client won't exist if the user is in a disconnected state
    if (colyseusClient) {
      throttledMessage(colyseusClient, collision);
    }

    // pass to our collision resolver
    resolveCollision(collision, room);
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
        ({ id: gridClientId }) =>
          //DO NOT COLLIDE WITH SELF
          gridClientId !== colyseusUserId
      );

    if (nearbyGridClients.length) {
      processCollision({
        nearbyClients: nearbyGridClients,
        room,
        target: {
          id: colyseusUserId,
          name: name,
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
          id: `celestial_${name}-${celestialId}`,
          name,
          position: { x, y },
          geometry: 'circle',
          radius,
          bounciness: 0.2,
        },
      });
    }
  });
};
