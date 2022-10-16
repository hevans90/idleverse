import { ArraySchema, Schema, type } from '@colyseus/schema';
import { JoinOptions } from './types';

export class ColyseusUser extends Schema implements JoinOptions {
  @type('string') accessToken: string;
  @type('string') displayName: string;
  @type('string') avatarUrl: string;
  @type('string') userId: string;
  @type('string') colyseusUserId?: string;
}

export class RoomState extends Schema {
  @type([ColyseusUser]) connectedUsers = new ArraySchema<ColyseusUser>();
}
