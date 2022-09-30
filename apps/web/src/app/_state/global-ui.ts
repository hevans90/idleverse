import { ActiveGalacticEmpireQuestsSubscription } from '@idleverse/galaxy-gql';
import { makeVarPersisted } from './utils';

export const globalUiVar = makeVarPersisted<{
  questJournalOpen: boolean;
  escapeMenuOpen: boolean;
  questJournalShowCompleted: boolean;
  npcContactOpen: boolean;
}>(
  {
    questJournalOpen: false,
    escapeMenuOpen: false,
    questJournalShowCompleted: true,
    npcContactOpen: false,
  },
  'globalUi'
);

export const questJournalVar = makeVarPersisted<{
  showCompleted: boolean;
  state: 'home' | 'detail';
}>({ showCompleted: true, state: 'home' }, 'questJournal');

export const questDetailVar = makeVarPersisted<{
  questStepId?: string;
  empireQuestId?: string;
  quest?: ActiveGalacticEmpireQuestsSubscription['galactic_empire_quest'][0]['quest'];
  completed?: boolean;
}>({}, 'questJournalDetail');
