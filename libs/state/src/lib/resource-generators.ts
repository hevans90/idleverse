import { makeVar } from '@apollo/client';
import { ResourceGeneratorsQuery } from '@idleverse/galaxy-gql';

export const resourceGeneratorsVar = makeVar<
  ResourceGeneratorsQuery['resource_generator']
>([]);
