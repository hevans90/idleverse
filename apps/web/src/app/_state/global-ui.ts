import { makeVarPersisted } from './utils';

export const globalUiVar = makeVarPersisted<{
  escapeMenuOpen: boolean;
  questJournalOpen: boolean;
  npcDialogOpen: boolean;
}>(
  {
    escapeMenuOpen: false,
    questJournalOpen: false,
    npcDialogOpen: false,
  },
  'globalUi'
);
