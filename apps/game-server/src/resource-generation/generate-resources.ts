import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  ResourceGeneratorsDocument,
  ResourceGeneratorsSubscription,
} from '@idleverse/galaxy-gql';

export const generateResources = (
  client: ApolloClient<NormalizedCacheObject>
) => {
  console.log('Beginning resource generation');

  client
    .subscribe<ResourceGeneratorsSubscription>({
      query: ResourceGeneratorsDocument,
    })
    .subscribe({
      next: (x) => console.log(JSON.stringify(x)),
    });
};
