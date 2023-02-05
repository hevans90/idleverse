import { Client, Room } from 'colyseus';
import { IncomingMessage } from 'http';

import {
  Collision,
  JoinOptions,
  RoomState,
  ServerStatusMessage,
} from '@idleverse/colyseus-shared';
import { findByColyseusClient, logger } from './_utils';
import { onAuth } from './on-auth';
import { onCreate } from './on-create';
import { onJoin } from './on-join';
import { onLeave } from './on-leave';
import { updateShipPositions } from './update-loop/update-ship-positions';

import { SpatialHashGrid } from './collision-detection/fast';
import { SpatialHashGridClient } from './collision-detection/models';
import { processGravity } from './update-loop/process-gravity';
import { runCollisionDetection } from './update-loop/run-collision-detection';

export class GameRoom extends Room<RoomState> {
  grid: SpatialHashGrid;
  gridClients: { [key: string]: SpatialHashGridClient } = {};
  collisionsUnderResolution: { [key: string]: Collision } = {};

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
    updateShipPositions(deltaTime, this);
    runCollisionDetection(this);
    processGravity(this);
  }

  onJoin(client: Client, options: JoinOptions) {
    onJoin(client, options, this);
  }

  async onLeave(client: Client, consented: boolean) {
    const user = this.state.connectedUsers.find(
      findByColyseusClient({ client })
    );

    const userString = `${user.displayName} (${client.sessionId})`;

    try {
      if (consented) {
        throw new Error('consented leave');
      }

      // allow disconnected client to reconnect into this room until 20 seconds
      user.connected = false;

      this.broadcast(
        ServerStatusMessage.PlayerDisconnected,
        `${user.displayName} disconnected`
      );

      logger.warning(
        `${userString} disconnected... they have 45 seconds to rejoin`
      );

      await this.allowReconnection(client, 45);

      user.connected = true;

      this.broadcast(
        ServerStatusMessage.PlayerReconnected,
        `${user.displayName} reconnected`
      );
      logger.success(`${userString} successfully reconnected!`);
    } catch (e) {
      if (e.message !== 'consented leave') {
        // 45 seconds expired
        logger.warning(`${userString} timed out`);
      }
      onLeave(client, consented, this);
    }
  }

  onDispose() {
    logger.info(`Room (${this.roomId}) 'disposing...`);
  }
}
