import { apolloBootstrapper } from '@idleverse/graphql-utils';
import { DataSources } from 'apollo-server-core/dist/requestPipeline';
import { ApolloServer } from 'apollo-server-express';
import fetch from 'cross-fetch';
import express from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { buildSchema } from 'type-graphql';
import { authChecker } from './authChecker';
import { Auth0API } from './datasources/auth0-api';
import { Context } from './datasources/context';
import { FoodAPI } from './datasources/food-api';
import { RegisterResolver } from './entities/register';

import ws = require('ws');

(async () => {
  const client = apolloBootstrapper(
    process.env.HASURA_URI,
    process.env.SECURE_HASURA === 'secure',
    'admin-secret',
    () => process.env.HASURA_ADMIN_SECRET_FOOD,
    {},
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

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
    authChecker,
    emitSchemaFile: true,
  });

  const app = express();
  const path = '/graphql';

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context: Partial<Context> = {
        req,
        user: req['user'], // `req.user` comes from `express-jwt`
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
    dataSources: (): DataSources<Partial<Context['dataSources']>> => {
      return {
        FoodAPI: new FoodAPI(client),
        auth0API: new Auth0API(),
      };
    },
    introspection: true,
  });

  // Mount a jwt or other authentication middleware that is run before the GraphQL execution
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

  await server.start();

  // Apply the GraphQL server middleware
  server.applyMiddleware({ app, path });

  // Launch the express server
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT || 4000}${
        server.graphqlPath
      }`
    )
  );
})();
