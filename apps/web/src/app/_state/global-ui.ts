import { ActiveGalacticEmpireQuestsSubscription } from '@idleverse/galaxy-gql';
import { makeVarPersisted } from './utils';

export const globalUiVar = makeVarPersisted<{
  escapeMenuOpen: boolean;
  npcContactOpen: boolean;
  questJournalOpen: boolean;
  questJournalShowCompleted: boolean;
  resourceOverviewOpen: boolean;
}>(
  {
    escapeMenuOpen: false,
    npcContactOpen: false,
    questJournalOpen: false,
    questJournalShowCompleted: true,
    resourceOverviewOpen: false,
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
