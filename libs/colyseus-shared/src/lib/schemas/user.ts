import { Schema, type } from '@colyseus/schema';
import { JoinOptions } from '../types';

export class ColyseusUser extends Schema implements JoinOptions {
  @type('string') accessToken: string;
  @type('string') displayName: string;
  @type('string') avatarUrl: string;
  @type('string') userId: string;
  @type('boolean') connected: boolean;

  @type('string') colyseusUserId?: string;
}
