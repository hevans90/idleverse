import { apolloBootstrapper } from '@idleverse/graphql';
import { DataSources } from 'apollo-server-core/dist/requestPipeline';
import { ApolloServer } from 'apollo-server-express';
import fetch from 'cross-fetch';
import express from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import { Pool } from 'undici';
import { authChecker } from './authChecker';
import { Auth0API } from './datasources/auth0-api';
import { Context } from './datasources/context';
import { HasuraAPI } from './datasources/hasura-api';
import { RecipeResolver } from './entities/message';
import ws = require('ws');

// const consumer = client.subscribe({ query: LatestMessageDocument });
// consumer.forEach((sub) => {
//   console.log(sub.data);
// });

// const mutation = gql`
//   mutation MemeGalaxy {
//     insert_galaxy_one(
//       object: {
//         arm_width: 0.2
//         arms: 5
//         core_concentration_factor: 1
//         core_radius_factor: 0.05
//         curvature: 3
//         name: "incelverse"
//         radius: 10
//         stars: 100
//       }
//     ) {
//       id
//     }
//   }
// `;

(async () => {
  const client = apolloBootstrapper(
    'admin-secret',
    process.env.HASURA_ADMIN_SECRET,
    {},
    fetch,
    ws
  );

  const schema = await buildSchema({
    resolvers: [RecipeResolver],
    authChecker,
    container: Container,
    emitSchemaFile: true,
  });

  const app = express();
  const path = '/graphql';

  const pool = new Pool(process.env.AUTH0_MANAGEMENT_API);

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context: Partial<Context> = {
        req,
        rule: req['user'], // `req.user` comes from `express-jwt`
      };
      if (
        context.req['user'][process.env.HASURA_NAMESPACE][
          'x-hasura-allowed-roles'
        ]
      )
        context.roles =
          context.req['user'][process.env.HASURA_NAMESPACE][
            'x-hasura-allowed-roles'
          ];
      if (context.req['user'][process.env.HASURA_NAMESPACE]['x-hasura-user-id'])
        context.id =
          context.req['user'][process.env.HASURA_NAMESPACE]['x-hasura-user-id'];

      return context;
    },
    dataSources: (): DataSources<Partial<Context>> => {
      return {
        hasuraAPI: new HasuraAPI(client),
        auth0API: new Auth0API(process.env.AUTH0_MANAGEMENT_API, pool),
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
      audience: process.env.AUTH0_AUDIENCE,
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
