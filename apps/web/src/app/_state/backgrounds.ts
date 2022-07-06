import { makeVar } from '@apollo/client';
import { CharacterDataQuery } from '@idleverse/galaxy-gql';

export type Background = CharacterDataQuery['background'][0];

export const backgroundsVar = makeVar<Background[]>([]);
