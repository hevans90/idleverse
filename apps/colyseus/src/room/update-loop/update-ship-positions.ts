import { GameRoom } from '../room';
import { findByClientId } from '../_utils';

export const updateShipPositions = (deltaTime: number, room: GameRoom) => {
  room.state.connectedUsers.forEach((user) => {
    const impulse = room.state.impulses.find(
      findByClientId(user.colyseusUserId)
    );
    const ship = room.state.ships.find(findByClientId(user.colyseusUserId));

    if (impulse?.up) {
      ship.positionY -= deltaTime / 4;
    }
    if (impulse?.down) {
      ship.positionY += deltaTime / 4;
    }
    if (impulse?.left) {
      ship.positionX -= deltaTime;
    }
    if (impulse?.right) {
      ship.positionX += deltaTime;
    }
  });
};
