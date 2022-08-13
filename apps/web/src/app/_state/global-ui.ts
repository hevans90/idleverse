import { makeVarPersisted } from './utils';

export const globalUiVar = makeVarPersisted<{
  escapeMenuOpen: boolean;
  questJournalOpen: boolean;
  questJournalShowCompleted: boolean;
  npcDialogOpen: boolean;
}>(
  {
    escapeMenuOpen: false,
    questJournalOpen: false,
    questJournalShowCompleted: true,
    npcDialogOpen: false,
  },
  'globalUi'
);
