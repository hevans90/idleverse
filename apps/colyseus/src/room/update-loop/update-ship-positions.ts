import { ServerError } from 'colyseus';
import { findByClientId, round } from '../_utils';
import { GameRoom } from '../room';

export const updateShipPositions = (deltaTime: number, room: GameRoom) => {
  room.state.connectedUsers.forEach((user) => {
    const impulse = room.state.impulses.find(
      findByClientId(user.colyseusUserId)
    );
    const ship = room.state.ships.find(findByClientId(user.colyseusUserId));

    const factor = deltaTime;
    const velocityFactor = (factor / 100) * ship.acceleration;
    const rotationFactor = factor / 200;

    const xIncrement = Math.sin(ship.rotation);
    const yIncrement = Math.cos(ship.rotation);

    if (impulse?.up) {
      ship.velocityX = round(ship.velocityX + xIncrement * velocityFactor, 2);
      ship.velocityY = round(ship.velocityY - yIncrement * velocityFactor, 2);
    }
    if (impulse?.down) {
      ship.velocityX = round(ship.velocityX - xIncrement * velocityFactor, 2);
      ship.velocityY = round(ship.velocityY + yIncrement * velocityFactor, 2);
    }
    if (impulse?.left) {
      ship.rotation = round(ship.rotation - rotationFactor, 2);
    }
    if (impulse?.right) {
      ship.rotation = round(ship.rotation + rotationFactor, 2);
    }

    const newX = round(ship.positionX + ship.velocityX, 2);
    const newY = round(ship.positionY + ship.velocityY, 2);

    ship.positionX = newX;
    ship.positionY = newY;

    // update collision detection
    const gridClient = room.gridClients[user.colyseusUserId];

    if (!gridClient) {
      throw new ServerError(
        500,
        `could not find collision client for ${user.colyseusUserId}`
      );
    }

    gridClient.position.x = newX;
    gridClient.position.y = newY;
    room.grid.updateClient(gridClient);
  });
};
