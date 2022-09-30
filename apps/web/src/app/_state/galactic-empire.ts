import {
  ActiveGalacticEmpireQuestsSubscription,
  CompletedGalacticEmpireQuestsSubscription,
  GalacticEmpireFieldsFragment,
  GalacticEmpireNpcsSubscription,
  GalacticEmpireResourcesSubscription,
} from '@idleverse/galaxy-gql';
import { makeVarPersisted } from './utils';

export const galacticEmpireVar = makeVarPersisted<GalacticEmpireFieldsFragment>(
  null,
  'galacticEmpire'
);

export const myEmpireVar = makeVarPersisted<boolean>(false, 'myEmpire');

export const empireResourcesVar = makeVarPersisted<
  GalacticEmpireResourcesSubscription['galactic_empire_resources']
>(undefined, 'empireResources');

export const empireNpcsVar = makeVarPersisted<
  GalacticEmpireNpcsSubscription['galactic_empire_npc'][0]['npc'][]
>(undefined, 'empireNpcs');

export const activeQuestsVar = makeVarPersisted<
  ActiveGalacticEmpireQuestsSubscription['galactic_empire_quest']
>(undefined, 'activeQuests');

export const completedQuestsVar = makeVarPersisted<
  CompletedGalacticEmpireQuestsSubscription['galactic_empire_quest']
>(undefined, 'completedQuests');
