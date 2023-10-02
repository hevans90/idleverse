import { makeVar } from '@apollo/client';
import { Background } from '@idleverse/galaxy-gql';

export const backgroundsVar = makeVar<Background[]>([]);
