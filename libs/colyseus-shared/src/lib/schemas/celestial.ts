import { Schema, type } from '@colyseus/schema';

export class ColyseusCelestial extends Schema {
  constructor({
    id,
    name,
    radius,
    positionX,
    positionY,
    mass,
  }: {
    id: string;
    name: string;
    radius: number;
    positionX: number;
    positionY: number;
    mass: number;
  }) {
    super();
    this.positionX = positionX;
    this.positionY = positionY;
    this.id = id;
    this.name = name;
    this.radius = radius;
    this.mass = mass;
    this.gravityWellMaxRadius = this.mass * this.mass * 10 * radius;
  }

  @type('string') id: string;
  @type('string') name: string;

  @type('number') radius: number;
  @type('number') positionX: number;
  @type('number') positionY: number;

  /** Solar masses */
  @type('number') mass: number;

  /** Calculated as mass */
  @type('number') gravityWellMaxRadius: number;
}
