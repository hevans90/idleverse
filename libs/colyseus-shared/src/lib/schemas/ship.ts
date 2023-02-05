import { Schema, type } from '@colyseus/schema';
import { ShipConfig } from '../ships/configs';

export class ColyseusShip extends Schema {
  constructor({
    maxVelocity,
    acceleration,
    colyseusUserId,
    userId,
    positionX,
    positionY,
    width,
    height,
    name,
  }: ShipConfig & {
    userId: string;
    name: string;
    colyseusUserId: string;
    positionX: number;
    positionY: number;
  }) {
    super();
    this.positionX = positionX;
    this.positionY = positionY;
    this.rotation = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.maxVelocity = maxVelocity;
    this.acceleration = acceleration;
    this.colyseusUserId = colyseusUserId;
    this.userId = userId;
    this.width = width;
    this.height = height;
    this.name = name;
  }

  /**
   * Radians
   */
  @type('number') rotation: number;

  @type('number') width: number;
  @type('number') height: number;

  @type('number') positionX: number;
  @type('number') positionY: number;
  @type('number') velocityX: number;
  @type('number') velocityY: number;
  @type('number') maxVelocity: number;
  @type('number') acceleration: number;

  @type('string') name: string;
  @type('string') userId: string;
  @type('string') colyseusUserId: string;
}
