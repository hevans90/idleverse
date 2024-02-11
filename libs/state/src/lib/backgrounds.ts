import { makeVar } from '@apollo/client';
import { Background } from '@idleverse/galaxy-gql';
import { BACKGROUNDS, HydratedMediaResult } from '@idleverse/models';
import { makeVarPersisted } from './utils';

export const backgroundsVar = makeVar<Background[]>([]);

export const backgroundsMediaVar = makeVar<{
  data: HydratedMediaResult[];
}>({
  data: [],
});

export const backgroundsMediaListenedToVar = makeVarPersisted<{
  [key in typeof BACKGROUNDS[number]]: boolean;
}>({ ecologist: false, prospector: false }, 'backgroundsMediaListenedToVar');
