import { GalacticEmpireFieldsFragment } from '@idleverse/galaxy-gql';
import { makeVarPersisted } from './utils';

export const galacticEmpireVar = makeVarPersisted<GalacticEmpireFieldsFragment>(
  null,
  'galacticEmpire'
);
