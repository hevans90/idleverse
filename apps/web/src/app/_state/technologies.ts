import { makeVar } from '@apollo/client';
import { TechnologiesQuery } from '@idleverse/galaxy-gql';

export const technologiesVar = makeVar<TechnologiesQuery['technology']>([]);
