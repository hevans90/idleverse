import { makeVar } from '@apollo/client';
import { Background } from '@idleverse/galaxy-gql';
import { HydratedMediaResult } from '@idleverse/models';

export const backgroundsVar = makeVar<Background[]>([]);

export const backgroundsMediaVar = makeVar<{
  data: HydratedMediaResult[];
}>({
  data: [],
});
