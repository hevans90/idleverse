import { Client, Room } from 'colyseus';
import { IncomingMessage } from 'http';

import { JoinOptions, RoomState } from '@idleverse/colyseus-shared';
import { onAuth } from './on-auth';
import { onCreate } from './on-create';
import { onJoin } from './on-join';
import { onLeave } from './on-leave';

export class GameRoom extends Room<RoomState> {
  async onAuth(
    client: Client,
    options: JoinOptions,
    request?: IncomingMessage
  ) {
    const { userId, displayName } = await onAuth(client, options, request);
    return { userId, displayName };
  }

  onCreate(options: any) {
    onCreate(options, this);
  }

  update(deltaTime: number) {
    // implement your physics or world updates here!
    // this is a good place to update the room state
    this.state.patchFrames = this.state.patchFrames + 1;
  }

  onJoin(client: Client, options: JoinOptions) {
    onJoin(client, options, this);
  }

  onLeave(client: Client, consented: boolean) {
    onLeave(client, consented, this);
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}
