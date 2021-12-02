import { openDrawer, toggleDrawerOpen } from '../drawer';
import { enableMarketingTilePlacement } from '../marketingTile';
import { Player } from '../player';
import { addGlow } from '../utils/graphics-utils';
import {
  currentPlayer,
  cards,
  marketingTiles,
  communalDrawers,
} from '../utils/singletons';
import { Card } from './card';

export const getAllMarketers = (player: Player) => {
  const ceoCard = player.ceo.card;
  const recruiters: Card[] = [];
  ceoCard.employees.forEach((employee1) => {
    if (employee1.marketingKinds) recruiters.push(employee1);
    else if (employee1.employees && employee1.employees.length > 0)
      employee1.employees.forEach((employee2) => {
        if (employee2.marketingKinds) recruiters.push(employee2);
      });
  });
  return recruiters;
};

export const startMarketing = () => {
  openDrawer(currentPlayer.player.drawers.structure);
  const marketers = getAllMarketers(currentPlayer.player);
  marketers.forEach((marketer) => {
    marketer.used = false;
  });
  cards.forEach((card) => (card.hiredBy = null));
  enableMarketing(currentPlayer.player);
};

export const enableMarketing = (
  player: Player,
  activeMarketer: Card = null
) => {
  const marketers = getAllMarketers(currentPlayer.player).filter(
    (marketer) => !marketer.used
  );
  deactivateMarketing(player);
  marketers.forEach((marketer) => {
    marketer.container.interactive = true;
    marketer.container.buttonMode = true;
    if (marketer === activeMarketer) {
      marketer.container.on('pointerdown', () => {
        enableMarketing(player);
      });
    } else {
      marketer.container.on('pointerdown', () => {
        toggleDrawerOpen(player.drawers.structure);
        openDrawer(communalDrawers.market);
        enableMarketing(player, marketer);
      });
    }
  });
  if (activeMarketer) {
    addGlow(activeMarketer.container);
    enableMarketingTilePlacement(activeMarketer);
  }
};

export const deactivateMarketing = (player: Player) => {
  getAllMarketers(player).forEach((marketer) => {
    marketer.container.interactive = false;
    marketer.container.buttonMode = false;
    marketer.container.filters = [];
    marketer.container.removeAllListeners();
  });
  marketingTiles.forEach((tile) => {
    tile.container.removeAllListeners();
  });
};
