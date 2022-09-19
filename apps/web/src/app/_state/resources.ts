import { makeVar } from '@apollo/client';
import { ResourcesQuery } from '@idleverse/galaxy-gql';

export const resourcesVar = makeVar<ResourcesQuery['resource_type']>([]);
