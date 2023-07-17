import { makeVar } from '@apollo/client';
import { NpcsQuery } from '@idleverse/galaxy-gql';

export const npcsVar = makeVar<NpcsQuery['npc']>([]);
