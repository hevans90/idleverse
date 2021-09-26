import {} from 'apollo-server-express';
import {} from 'express';
import { VerifyOptions } from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import { AuthChecker } from 'type-graphql';

export const authChecker: AuthChecker<any> = async (
  { root, args, context, info },
  roles
) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  //if(req.headers.origin == "http://localhost:3000")
  //  console.log(req.headers);

  //   if (!context.idToken) return false;
  //   const idToken = new Promise<JwtPayload>((resolve, reject) => {
  //     try {
  //       verify(context.idToken, getKey, options, (err, decoded) => {
  //         if (err) {
  //           return reject(err);
  //         }
  //         resolve(decoded);
  //       });
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });

  //   let payload: JwtPayload;
  //   try {
  //     payload = await idToken;
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   const idTokenRoles: string[] =
  //     payload['https://hasura.io/jwt/claims']['x-hasura-allowed-roles'];

  const idTokenRoles: string[] = context.roles;
  for (const role of roles) {
    if (!idTokenRoles.includes(role)) return false;
  }

  return true; // or false if access is denied
};

const client = new JwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});
function getKey(header, cb) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    cb(null, signingKey);
  });
}

const options: VerifyOptions = {
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
};
