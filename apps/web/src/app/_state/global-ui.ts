import { makeVarPersisted } from './utils';

export const globalUiVar = makeVarPersisted<{
  escapeMenuOpen: boolean;
  questJournalOpen: boolean;
}>(
  {
    escapeMenuOpen: false,
    questJournalOpen: false,
  },
  'globalUi'
);
