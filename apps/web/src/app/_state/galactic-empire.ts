import {
  ActiveGalacticEmpireQuestsSubscription,
  CompletedGalacticEmpireQuestsSubscription,
  GalacticEmpireFieldsFragment,
  GalacticEmpireNpcsSubscription,
} from '@idleverse/galaxy-gql';
import { makeVarPersisted } from './utils';

export const galacticEmpireVar = makeVarPersisted<GalacticEmpireFieldsFragment>(
  null,
  'galacticEmpire'
);

export const myEmpireVar = makeVarPersisted<boolean>(false, 'myEmpire');

export const empireResourcesVar = makeVarPersisted<
  { id: string; imageUrl: string; name: string; value: number }[]
>([], 'empireResources');

export const empireNpcsVar = makeVarPersisted<
  GalacticEmpireNpcsSubscription['galactic_empire_npc'][0]['npc'][]
>([], 'empireNpcs');

export const activeQuestsVar = makeVarPersisted<
  ActiveGalacticEmpireQuestsSubscription['galactic_empire_quest']
>([], 'activeQuests');

export const completedQuestsVar = makeVarPersisted<
  CompletedGalacticEmpireQuestsSubscription['galactic_empire_quest']
>([], 'completedQuests');
