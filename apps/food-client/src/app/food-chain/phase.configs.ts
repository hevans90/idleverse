import { enableDinnerTime } from './board';
import { untapCards } from './card/card';
import { startHire } from './card/card.hire';
import { startMarketing } from './card/card.market';
import { enableProduction } from './card/card.produce';
import { enableCardStructure } from './card/card.structure';
import { startTrain } from './card/card.train';
import { enableDinerPlacement } from './diner';
import { openDrawer } from './drawer';
import { enableExtraHousePlacement } from './house';
import { enableAdvertise } from './marketingTile';
import {
  phases,
  players,
  communalDrawers,
  marketingTiles,
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
    nextPhase: 'Train',
  });
  phases.push({
    name: 'Train',
    start: () => {
      openDrawer(communalDrawers.recruit);
      startTrain();
      players.forEach((player) => {
        openDrawer(player.drawers.structure);
        openDrawer(player.drawers.beach);
      });
    },
    nextPhase: 'Market',
  });
  phases.push({
    name: 'Market',
    start: () => startMarketing(),
    nextPhase: 'Produce',
  });
  phases.push({
    name: 'Produce',
    start: () => {
      players.forEach((player) => {
        openDrawer(player.drawers.structure);
        enableProduction(player);
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
