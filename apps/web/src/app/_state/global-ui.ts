import { makeVarPersisted } from './utils';

export const globalUiVar = makeVarPersisted<{ escapeMenuOpen: boolean }>(
  {
    escapeMenuOpen: false,
  },
  'globalUi'
);
