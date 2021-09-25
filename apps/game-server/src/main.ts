import { LatestMessageDocument } from '@idleverse/graphql';
import gql from 'graphql-tag';
import { apolloBootstrapper } from './apollo-bootstrapper';

const client = apolloBootstrapper(process.env.HASURA_ADMIN_SECRET);

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
