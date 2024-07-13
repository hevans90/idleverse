import { expressMiddleware } from '@apollo/server/express4';
import { apolloBootstrapper } from '@idleverse/graphql-utils';

import { ApolloServer } from '@apollo/server';
import fetch from 'cross-fetch';
import express, { json } from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { buildSchema } from 'type-graphql';
import { authChecker } from './authChecker';
import { Auth0API } from './datasources/auth0';
import { Context } from './datasources/context';
import { HasuraAPI } from './datasources/hasura-api';
import { HasuraEmpirePurchases } from './datasources/hasura-empire-purchases';
import { HasuraEmpireResourceModifiers } from './datasources/hasura-empire-resource-modifiers';
import { HasuraQuestProgression } from './datasources/hasura-quest-progression';
import { CelestialManagementResolver } from './entities/celestial-management';
import { EmpirePurchasesResolver } from './entities/empire-purchases';
import { GalaxyManagementResolver } from './entities/galaxy-management';
import { QuestManagementResolver } from './entities/quest-management';
import { RegisterResolver } from './entities/register';
import { automaticMainQuestAssignment } from './quest-progression/automatic-quest-assignment';
import ws = require('ws');

import { Client as MinioClient } from 'minio';
import { MinioAPI } from './datasources/minio';
import { MinioMediaResolver } from './entities/minio-media';

(async () => {
  const apolloClient = apolloBootstrapper(
    process.env.HASURA_URI,
    process.env.SECURE_HASURA === 'secure',
    'admin-secret',
    () => process.env.HASURA_ADMIN_SECRET,
    {
      typePolicies: {
        Subscription: {
          fields: {
            galactic_empire_resource_generator: {
              merge(existing, incoming) {
                return { ...incoming };
              },
            },
          },
        },
      },
    },
    fetch,
    ws,
    {
      query: {
        fetchPolicy: 'no-cache',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    }
  );

  const minioClient = new MinioClient({
    endPoint: process.env.MINIO_BASE_URL,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
  });

  const schema = await buildSchema({
    resolvers: [
      CelestialManagementResolver,
      EmpirePurchasesResolver,
      GalaxyManagementResolver,
      MinioMediaResolver,
      QuestManagementResolver,
      RegisterResolver,
    ],
    authChecker,
    emitSchemaFile: true,
  });

  const app = express();
  const path = '/graphql';

  const server = new ApolloServer({
    schema,
    introspection: true,
  });

  await server.start();

  app.use(
    path,
    jwt({
      credentialsRequired: false,
      // Dynamically provide a signing key
      // based on the kid in the header and
      // the signing keys provided by the JWKS endpoint.
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),

      // Validate the audience and the issuer.
      audience: process.env.AUTH0_CLIENT_ID,
      issuer: [`https://${process.env.AUTH0_DOMAIN}/`],
      algorithms: ['RS256'],
    })
  );

  app.use(
    path,
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const context: Partial<Context> = {
          req,
          user: req['user'], // `req.user` comes from `express-jwt`
          dataSources: {
            hasuraAPI: new HasuraAPI(apolloClient),
            hasuraEmpirePurchases: new HasuraEmpirePurchases(apolloClient),
            hasuraQuestProgression: new HasuraQuestProgression(apolloClient),
            hasuraEmpireResourceModifiers: new HasuraEmpireResourceModifiers(
              apolloClient
            ),
            auth0API: new Auth0API(),
            minio: new MinioAPI(minioClient),
          },
        };

        if (req['user']) {
          if (context.req['user'][process.env.HASURA_NAMESPACE]) {
            if (
              context.req['user'][process.env.HASURA_NAMESPACE][
                'x-hasura-allowed-roles'
              ]
            )
              context.roles =
                context.req['user'][process.env.HASURA_NAMESPACE][
                  'x-hasura-allowed-roles'
                ];
            if (
              context.req['user'][process.env.HASURA_NAMESPACE][
                'x-hasura-user-id'
              ]
            )
              context.id =
                context.req['user'][process.env.HASURA_NAMESPACE][
                  'x-hasura-user-id'
                ];
          }
        }

        return context;
      },
    })
  );

  automaticMainQuestAssignment(
    apolloClient,
    new HasuraQuestProgression(apolloClient)
  );

  // Launch the express server
  app.listen({ port: process.env.PORT || 4000, host: '' }, () => {
    console.log(
      `🚀 Idleverse Game Server ready at http://localhost:${
        process.env.PORT || 4000
      }/graphql`
    );
  });
})();
