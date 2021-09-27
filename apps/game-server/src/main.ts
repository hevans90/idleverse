import { apolloBootstrapper, LatestMessageDocument } from '@idleverse/graphql';
import fetch from 'cross-fetch';
import gql from 'graphql-tag';
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

client.mutate({ mutation });
