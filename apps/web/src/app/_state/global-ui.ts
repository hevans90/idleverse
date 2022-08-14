import { makeVarPersisted } from './utils';

export const globalUiVar = makeVarPersisted<{
  escapeMenuOpen: boolean;
  questJournalOpen: boolean;
  questJournalShowCompleted: boolean;
  npcContactOpen: boolean;
}>(
  {
    escapeMenuOpen: false,
    questJournalOpen: false,
    questJournalShowCompleted: true,
    npcContactOpen: false,
  },
  'globalUi'
);
