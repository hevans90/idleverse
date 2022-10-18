import { Schema, type } from '@colyseus/schema';

export class ColyseusImpulse extends Schema {
  @type('boolean') up: boolean;
  @type('boolean') right: boolean;
  @type('boolean') down: boolean;
  @type('boolean') left: boolean;

  @type('string') colyseusUserId: string;
}
