import { gql } from '@apollo/client';
//import { typeDefs } from './schema';
import { apolloBootstrapper, LatestMessageDocument } from '@idleverse/graphql';
import { ApolloServer } from 'apollo-server-express';
import fetch from 'cross-fetch';
import express from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import { authChecker } from './authChecker';
import { RecipeResolver } from './entities/message';
import ws = require('ws');

const client = apolloBootstrapper(
  'admin-secret',
  process.env.HASURA_ADMIN_SECRET,
  {},
  fetch,
  ws
);

const consumer = client.subscribe({ query: LatestMessageDocument });
consumer.forEach((sub) => {
  console.log(sub.data);
});

const mutation = gql`
  mutation MemeGalaxy {
    insert_galaxy_one(
      object: {
        arm_width: 0.2
        arms: 5
        core_concentration_factor: 1
        core_radius_factor: 0.05
        curvature: 3
        name: "incelverse"
        radius: 10
        stars: 100
      }
    ) {
      id
    }
  }
`;

(async () => {
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
    authChecker,
    container: Container,
    emitSchemaFile: true,
  });

  const app = express();
  const path = '/graphql';

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        rule: req['user'], // `req.user` comes from `express-jwt`
      };
      return context;
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
