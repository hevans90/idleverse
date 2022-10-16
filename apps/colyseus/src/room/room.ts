import { Client, Room, ServerError } from 'colyseus';
import { IncomingMessage } from 'http';

import { verify } from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';
import jwt_decode from 'jwt-decode';

import {
  ColyseusImpulse,
  ColyseusUser,
  Impulse,
  JoinOptions,
  PlayerMessage,
  RoomState,
} from '@idleverse/colyseus-shared';

export class GameRoom extends Room<RoomState> {
  async onAuth(
    client: Client,
    { accessToken, displayName }: JoinOptions,
    request?: IncomingMessage
  ) {
    // first decode the token
    const {
      iss: issuerBaseURL,
      sub: userId,
    }: { aud: string; iss: string; sub: string; name: string } =
      jwt_decode(accessToken);

    // then decode the token header to get the kid
    const { kid }: { kid: string } = jwt_decode(accessToken, { header: true });

    const jwksClient = jwksRsa({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${issuerBaseURL}.well-known/jwks.json`,
    });

    const key = (await jwksClient.getSigningKey(kid)).getPublicKey();

    const verifyToken = () =>
      new Promise((res, rej) => {
        verify(accessToken, key, (err, data) => {
          if (err) {
            rej(err);
          } else {
            res(data);
          }
        });
      });

    try {
      await verifyToken();
      console.log(`User ${displayName}: ${userId} successfully validated.`);
    } catch (err) {
      throw new ServerError(400, 'invalid access token');
    }

    return { userId, displayName };
  }

  onCreate(options: any) {
    this.setSimulationInterval((deltaTime) => this.update(deltaTime));

    this.setState(new RoomState());

    this.clock.start();

    this.onMessage(PlayerMessage.Impulse, (client, message: Impulse) => {
      const { colyseusUserId, displayName } = this.state.connectedUsers.find(
        ({ colyseusUserId }) => colyseusUserId === client.id
      );

      this.state.impulses.find(
        ({ colyseusUserId }) => colyseusUserId === client.id
      )[message.direction] = true;

      console.log(displayName, message);
    });

    this.onMessage(PlayerMessage.ImpulseStopped, (client, message: Impulse) => {
      this.state.impulses.find(
        ({ colyseusUserId }) => colyseusUserId === client.id
      )[message.direction] = false;

      console.log(message);
    });
  }

  update(deltaTime: number) {
    // implement your physics or world updates here!
    // this is a good place to update the room state
    this.state.patchFrames = this.state.patchFrames + 1;
  }

  onJoin(client: Client, options: JoinOptions) {
    this.state.connectedUsers.push(
      new ColyseusUser({ ...options, colyseusUserId: client.id })
    );
    this.state.impulses.push(
      new ColyseusImpulse({
        left: false,
        up: false,
        right: false,
        down: false,
        colyseusUserId: client.id,
      })
    );

    console.log(`${options.displayName} (${client.sessionId}) joined!`);
  }

  onLeave(client: Client, consented: boolean) {
    const user = this.state.connectedUsers.find(
      ({ colyseusUserId }) => colyseusUserId === client.id
    );
    const impulse = this.state.impulses.find(
      ({ colyseusUserId }) => colyseusUserId === client.id
    );

    const userIndex = this.state.connectedUsers.indexOf(user);
    this.state.connectedUsers.splice(userIndex, 1);

    const impulseIndex = this.state.impulses.indexOf(impulse);
    this.state.impulses.splice(impulseIndex, 1);

    console.log(
      `${user.displayName} (${client.sessionId}) ${
        consented ? 'left voluntarily' : 'was disconnected'
      }.`
    );
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}
