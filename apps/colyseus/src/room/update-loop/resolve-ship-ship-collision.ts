import {
  Collision,
  ColyseusShip,
  isCircleEntity,
  isRectangleEntity,
} from '@idleverse/colyseus-shared';
import { GameRoom } from '../room';

const STICKY_THRESHOLD = 0.00004;

export const resolveShipToShipCollision = (
  collision: Collision,
  room: GameRoom,
  clientShip: ColyseusShip,
  targetShip: ColyseusShip
) => {
  const { client, target } = collision;

  // Find the mid points of the entity and player
  const clientMidX = client.position.x;
  const clientMidY = client.position.y;
  const targetMidX = target.position.x;
  const targetMidY = target.position.y;

  console.log({
    clientMidX,
    clientMidY,
    targetMidX,
    targetMidY,
  });

  let targetHeight: number;
  let targetWidth: number;

  let clientHeight: number;
  let clientWidth: number;

  if (isRectangleEntity(client)) {
    clientHeight = client.height;
    clientWidth = client.width;
  }

  if (isCircleEntity(client)) {
    clientHeight = client.radius;
    clientWidth = client.radius;
  }

  if (isRectangleEntity(target)) {
    targetHeight = target.height;
    targetWidth = target.width;
  }

  if (isCircleEntity(target)) {
    targetHeight = target.radius;
    targetWidth = target.radius;
  }

  const targetRight = target.position.x + targetWidth / 2;
  const targetTop = target.position.y - targetHeight / 2;
  const targetLeft = target.position.x - targetWidth / 2;
  const targetBottom = target.position.y + targetHeight / 2;

  // To find the side of entry calculate based on
  // the normalized sides
  const dx = (targetMidX - clientMidX) / (targetWidth / 2);
  const dy = (targetMidY - clientMidY) / (targetHeight / 2);

  // Calculate the absolute change in x and y
  const absDX = Math.abs(dx);
  const absDY = Math.abs(dy);

  // If the distance between the normalized x and y
  // position is less than a small threshold (.1 in this case)
  // then this object is approaching from a corner
  if (Math.abs(absDX - absDY) < 0.1) {
    // If the player is approaching from positive X
    if (dx < 0) {
      // Set the player x to the right side
      clientShip.positionX = targetRight + clientWidth;
      client.position.x = targetRight + clientWidth;

      if (targetShip) {
        targetShip.positionX = targetRight - clientWidth;
        target.position.x = targetRight - clientWidth;
      }

      // If the player is approaching from negative X
    } else {
      // Set the player x to the left side
      clientShip.positionX = targetLeft - clientWidth;
      client.position.x = targetLeft - clientWidth;

      if (targetShip) {
        targetShip.positionX = targetLeft + clientWidth;
        target.position.x = targetLeft + clientWidth;
      }
    }

    // If the player is approaching from positive Y
    if (dy < 0) {
      // Set the player y to the bottom
      clientShip.positionY = targetBottom + clientHeight;
      client.position.y = targetBottom + clientHeight;

      if (targetShip) {
        targetShip.positionY = targetBottom - clientWidth;
        target.position.x = targetBottom - clientWidth;
      }

      // If the player is approaching from negative Y
    } else {
      // Set the player y to the top
      clientShip.positionY = targetTop - clientHeight;
      client.position.y = targetTop - clientHeight;

      if (targetShip) {
        targetShip.positionY = targetTop + clientHeight;
        target.position.x = targetTop + clientHeight;
      }
    }

    // If the object is approaching from the sides
  } else if (absDX > absDY) {
    // If the player is approaching from positive X
    if (dx < 0) {
      console.log('positive X side hit');
      clientShip.positionX = targetRight + clientWidth;
      client.position.x = targetRight + clientWidth;

      if (targetShip) {
        targetShip.positionX = targetRight - clientWidth;
        target.position.x = targetRight - clientWidth;
      }
    } else {
      // If the player is approaching from negative X
      console.log('negative X side hit');
      client.position.x = targetLeft - clientWidth;
      clientShip.positionX = targetLeft - clientWidth;
      if (targetShip) {
        targetShip.positionX = targetLeft + clientWidth;
        target.position.x = targetLeft + clientWidth;
      }
    }

    // If this collision is coming from the top or bottom more
  } else {
    // If the player is approaching from positive Y
    if (dy < 0) {
      console.log('positive Y side hit');
      clientShip.positionY = targetBottom + clientHeight;
      client.position.y = targetBottom + clientHeight;

      if (targetShip) {
        targetShip.positionY = targetBottom - clientHeight;
        target.position.y = targetBottom - clientHeight;
      }
    } else {
      // If the player is approaching from negative Y
      console.log('negative Y side hit');
      clientShip.positionY = targetTop - clientHeight;
      client.position.y = targetTop - clientHeight;
      if (targetShip) {
        targetShip.positionY = targetTop + clientHeight;
        target.position.y = targetTop + clientHeight;
      }
    }
  }

  clientShip.velocityX = -clientShip.velocityX * target.bounciness;
  targetShip.velocityX = -targetShip.velocityX * client.bounciness;
  clientShip.velocityY = -clientShip.velocityY * target.bounciness;
  targetShip.velocityY = -targetShip.velocityY * client.bounciness;

  if (Math.abs(clientShip.velocityX) < STICKY_THRESHOLD) {
    clientShip.velocityY = 0;
  }
  if (Math.abs(clientShip.velocityY) < STICKY_THRESHOLD) {
    clientShip.velocityY = 0;
  }
  if (Math.abs(targetShip.velocityX) < STICKY_THRESHOLD) {
    targetShip.velocityY = 0;
  }
  if (Math.abs(targetShip.velocityY) < STICKY_THRESHOLD) {
    targetShip.velocityY = 0;
  }

  delete room.collisionsUnderResolution[collision.id];
};
