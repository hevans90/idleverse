import { Client, Room, ServerError } from 'colyseus';
import { IncomingMessage } from 'http';
import { MyRoomState } from './room-state';

import { verify } from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';
import jwt_decode from 'jwt-decode';

type JoinOptions = { accessToken: string; displayName: string };

export class MyRoom extends Room<MyRoomState> {
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
    this.setState(new MyRoomState());

    this.onMessage('type', (client, message) => {
      //
      // handle "type" message
      //
    });
  }

  onJoin(client: Client, options: JoinOptions) {
    console.log(`${options.displayName} (${client.sessionId})`, 'joined!');
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left!');
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}
