import { makeVar } from '@apollo/client';
import { QuestsQuery } from '@idleverse/galaxy-gql';

export const questsVar = makeVar<QuestsQuery['quest']>([]);
