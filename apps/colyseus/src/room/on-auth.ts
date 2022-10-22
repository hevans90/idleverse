import { JoinOptions } from '@idleverse/colyseus-shared';
import { Client, ServerError } from 'colyseus';
import { IncomingMessage } from 'http';

import { verify } from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';
import jwt_decode from 'jwt-decode';
import { logger } from './_utils';

export const onAuth = async (
  client: Client,
  { accessToken, displayName }: JoinOptions,
  request?: IncomingMessage
) => {
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

  let key: string;

  try {
    key = (await jwksClient.getSigningKey(kid)).getPublicKey();
  } catch (e) {
    throw new ServerError(500, e);
  }

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
    logger.info(`User ${displayName}: ${userId} successfully validated.`);
  } catch (err) {
    throw new ServerError(400, 'invalid access token');
  }

  return { userId, displayName };
};
