import { enableDinnerTime } from './board';
import {
  untapCards,
  enableCardStructure,
  enableFoodProduction,
  startHire,
} from './card';
import { enableDinerPlacement } from './diner';
import { openDrawer } from './drawer';
import { enableExtraHousePlacement } from './house';
import { enableMarketingTilePlacement, enableAdvertise } from './marketingTile';
import {
  communalDrawers,
  marketingTiles,
  phases,
  players,
} from './utils/singletons';

export const initPhases = () => {
  phases.push({
    name: 'Launch',
    start: () => {
      players.forEach((player) => {
        openDrawer(player.drawers.diners);
        enableDinerPlacement(player);
      });
    },
    nextPhase: 'Structure',
  });
  phases.push({
    name: 'Structure',
    start: () => {
      untapCards();
      enableCardStructure();
      players.forEach((player) => {
        openDrawer(player.drawers.beach);
        openDrawer(player.drawers.structure);
      });
    },
    nextPhase: 'Hire',
  });
  phases.push({
    name: 'Hire',
    start: () => {
      openDrawer(communalDrawers.recruit);
      startHire();
      players.forEach((player) => {
        openDrawer(player.drawers.structure);
        openDrawer(player.drawers.beach);
      });
    },
    //end: () => deactivateCardHire(),
    nextPhase: 'Market',
  });
  phases.push({
    name: 'Market',
    start: () => {
      openDrawer(communalDrawers.market);
      enableMarketingTilePlacement();
    },
    nextPhase: 'Produce',
  });
  phases.push({
    name: 'Produce',
    start: () => {
      players.forEach((player) => {
        openDrawer(player.drawers.structure);
        enableFoodProduction(player);
      });
      untapCards();
    },
    nextPhase: 'Development',
  });
  phases.push({
    name: 'Development',
    start: () => {
      openDrawer(communalDrawers.development);
      enableExtraHousePlacement();
    },
    nextPhase: 'Dinner Time',
  });
  phases.push({
    name: 'Dinner Time',
    start: () => {
      enableDinnerTime();
    },
    nextPhase: 'Advertise',
  });
  phases.push({
    name: 'Advertise',
    start: () => {
      enableAdvertise(marketingTiles);
    },
    nextPhase: 'Structure',
  });
};
