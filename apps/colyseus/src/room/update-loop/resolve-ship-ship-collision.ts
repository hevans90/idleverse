import { Collision, ColyseusShip } from '@idleverse/colyseus-shared';
import { GameRoom } from '../room';

const collisionAngle = (ship1: ColyseusShip, ship2: ColyseusShip) => {
  /// classic intersection test
  const hit = !(
    ship1.positionX + ship1.width < ship1.positionX ||
    ship2.positionX + ship2.width < ship1.positionX ||
    ship1.positionY + ship1.height < ship2.positionY ||
    ship2.positionY + ship2.height < ship1.positionY
  );

  /// if intersects, get angle between the two rects to determine hit zone
  if (hit) {
    /// calc angle
    const dx = ship2.positionX - ship1.positionX;
    const dy = ship2.positionY - ship1.positionY;

    /// for simplicity convert radians to degree
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (angle < 0) angle += 360;

    return angle;
  } else return null;
};

export const resolveShipToShipCollision = (
  collision: Collision,
  room: GameRoom,
  clientShip: ColyseusShip,
  targetShip: ColyseusShip
) => {
  const { client, target } = collision;

  const angle = collisionAngle(clientShip, targetShip);

  if (angle !== null) {
    /// zone 1 - right
    if ((angle >= 0 && angle < 45) || (angle > 315 && angle < 360)) {
      /// if moving in + direction deflect rect 1 in x direction etc.
      if (clientShip.velocityX > 0)
        clientShip.velocityX = -clientShip.velocityX;
      if (targetShip.velocityX < 0)
        targetShip.velocityX = -targetShip.velocityX;
    } else if (angle >= 45 && angle < 135) {
      /// zone 2 - bottom

      if (clientShip.velocityY > 0)
        clientShip.velocityY = -clientShip.velocityY;
      if (targetShip.velocityY < 0)
        targetShip.velocityY = -targetShip.velocityY;
    } else if (angle >= 135 && angle < 225) {
      /// zone 3 - left
      if (clientShip.velocityX < 0)
        clientShip.velocityX = -clientShip.velocityX;
      if (targetShip.velocityX > 0)
        targetShip.velocityX = -targetShip.velocityX;
    } else {
      /// zone 4 - top

      if (clientShip.velocityY < 0)
        clientShip.velocityY = -clientShip.velocityY;
      if (targetShip.velocityY > 0)
        targetShip.velocityY = -targetShip.velocityY;
    }
  }

  delete room.collisionsUnderResolution[collision.id];
};
