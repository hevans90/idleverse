import {
  ActiveGalacticEmpireQuestsSubscription,
  CompletedGalacticEmpireQuestsSubscription,
  GalacticEmpireFieldsFragment,
  GalacticEmpireNpcsSubscription,
} from '@idleverse/galaxy-gql';
import { makeVarPersisted } from './utils';

export type ResourceGenerator = {
  id: string;
  name: string;
  rate: number;
  count: number;
  costGrowthExponent: number;
  costForNext: { resourceId: string; amount: number }[];
};

export const galacticEmpireVar =
  makeVarPersisted<GalacticEmpireFieldsFragment | null>(null, 'galacticEmpire');

export const myEmpireVar = makeVarPersisted<boolean>(false, 'myEmpire');

export const empireResourcesVar = makeVarPersisted<
  {
    id: string;
    imageUrl: string;
    name: string;
    value: number;
    generationRate: number;
    generators: ResourceGenerator[];
  }[]
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
