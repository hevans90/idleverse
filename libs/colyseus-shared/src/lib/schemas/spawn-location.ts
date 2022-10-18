import { Schema, type } from '@colyseus/schema';

export class ColyseusSpawnLocation extends Schema {
  constructor({ x, y }: { x: number; y: number }) {
    super();
    this.x = x;
    this.y = y;
  }
  @type('number') x: number;
  @type('number') y: number;

  @type('string') colyseusUserId?: string;
}
