import { ColyseusCelestial, ColyseusShip } from '@idleverse/colyseus-shared';
import { GameRoom } from '../room';
import { colyseusClientIdFromGridClientId } from './utils';

const calculateGravitationalForce = (
  target: ColyseusCelestial,
  client: ColyseusShip
) => {
  const a = target.positionX - client.positionX;
  const b = target.positionY - client.positionY;

  const calculateHypotenuse = (a: number, b: number) =>
    Math.round(Math.hypot(a, b) * 100) / 100;

  const hyp = calculateHypotenuse(a, b);

  const theta = Math.atan2(b, a);

  const G = 100;

  // change 1 to client mass if this becomes necessary in the future
  const force = (G * target.mass * 1) / Math.pow(hyp, 2);

  return {
    fx: force * Math.cos(theta),
    fy: force * Math.sin(theta),
  };
};

export const processGravity = (room: GameRoom) => {
  room.state.celestials.forEach((celestial) => {
    const { positionX: x, positionY: y, gravityWellMaxRadius } = celestial;

    const clientsInGravityWell = room.grid.findNearbyCircle(
      { x, y },
      gravityWellMaxRadius
    );

    if (clientsInGravityWell.length) {
      clientsInGravityWell.forEach((client) => {
        const colyseusClientId = colyseusClientIdFromGridClientId(client.name);
        const colyseusClient = room.clients.find(
          ({ id }) => id === colyseusClientId
        );

        if (colyseusClient) {
          const ship = room.state.ships.find(
            ({ colyseusUserId }) => colyseusUserId === colyseusClientId
          );

          if (ship) {
            const { fx, fy } = calculateGravitationalForce(celestial, ship);

            ship.velocityX += fx;
            ship.velocityY += fy;
          } else {
            console.error(
              'No ship found for colyseus user ID:',
              colyseusClientId
            );
          }
        } else {
          console.error(
            'Gravity: No colyseus client found for ID:',
            colyseusClientId
          );
        }
      });
    }
  });
};
