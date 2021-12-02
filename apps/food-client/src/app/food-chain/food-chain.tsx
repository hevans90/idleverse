import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { getSquaresInRange, isValidPosition } from './utils/utils';
import { addBoardToStage } from './board';
import { Player } from './player';
import { renderDrawer, Drawer, openDrawer, toggleOpen } from './drawer';
import { drawerHiresIndicator } from './indicators';
import {
  drawDebugButton,
  drawNextPhaseButton,
  drawPhaseIndicator,
  getPhase,
} from './phase';
import { drawChunks, drawOuterSquares } from './chunk';
import { FoodKinds } from './food';
import { disablePlacement, enablePlacement } from './tile';
import { initCEOCard } from './ceo';
import { enableCardHire, enableCardStructure, initCards } from './card';
import {
  enableAdvertise,
  enableMarketingTilePlacement,
  initMarketingTiles,
} from './marketingTile';
import { addDinerToBoard } from './diner';
import { drawToolbar } from './toolbar';
import { tileConfigs } from './tile.configs';
import { cardConfigs } from './card.configs';
import { marketingTileConfigs } from './marketingTile.configs';
import {
  animations,
  app,
  board,
  cards,
  ceoCard,
  currentPhase,
  drawers,
  keyEventMap,
  marketingTiles,
  phases,
} from './utils/singletons';

export const FoodChain = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    app.resizeTo = gameElement;
    app.stage.sortableChildren = true;

    const player: Player = {
      cards: [],
      hiresAvailable: 10,
      food: {
        [FoodKinds.beer]: 0,
        [FoodKinds.lemonade]: 0,
        [FoodKinds.cola]: 0,
        [FoodKinds.pizza]: 0,
        [FoodKinds.burger]: 0,
      },
    };

    phases.push({
      name: 'Launch',
      start: () => {
        enablePlacement(
          board.diner,
          board.tiles,
          (square) => isValidPosition(board, board.diner, square, true),
          (square) => getSquaresInRange(board, board.diner, square, 1),
          () => disablePlacement(board)
        );
      },
      nextPhase: 'Structure',
    });
    phases.push({
      name: 'Structure',
      start: () => {
        if (!structureDrawer.open) toggleOpen(structureDrawer);
        if (!beachDrawer.open) toggleOpen(beachDrawer);
        enableCardStructure(app, beachDrawer, structureDrawer, cards, ceoCard);
      },
      nextPhase: 'Hire',
    });
    phases.push({
      name: 'Hire',
      start: () => {
        if (!beachDrawer.open) toggleOpen(beachDrawer);
        if (!recruitDrawer.open) toggleOpen(recruitDrawer);
        enableCardHire(
          player,
          cards,
          recruitDrawer,
          beachDrawer,
          hiresIndicator
        );
      },
      nextPhase: 'Train',
    });
    phases.push({
      name: 'Train',
      nextPhase: 'Market',
    });
    phases.push({
      name: 'Market',
      start: () => {
        if (!marketDrawer.open) toggleOpen(marketDrawer);
        enableMarketingTilePlacement(marketDrawer, marketingTiles);
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
    currentPhase.phase = getPhase('Launch');

    document.addEventListener('keydown', (e) => {
      if (Object.keys(keyEventMap).includes(e.code)) keyEventMap[e.code]();
    });

    const recruitDrawer: Drawer = {
      name: 'recruit',
      open: false,
      startY: 100,
      endY: app.screen.height - 100,
      width: 900,
      tabEndY: (app.screen.height - 200) / 2,
      tabWidth: 40,
      orient: 'right',
      cards: [],
      marketingTiles: [],
    };

    const marketDrawer: Drawer = {
      name: 'market',
      open: false,
      startY: 100,
      endY: app.screen.height - 100,
      width: 900,
      tabStartY: (app.screen.height - 200) / 2,
      tabWidth: 40,
      orient: 'right',
      cards: [],
      marketingTiles: [],
    };

    const structureDrawer: Drawer = {
      name: 'structure',
      open: false,
      startY: 100,
      endY: (app.screen.height - 200) * 0.85,
      width: 1500,
      tabWidth: 40,
      orient: 'left',
      cards: [],
      marketingTiles: [],
    };

    const beachDrawer: Drawer = {
      name: 'beach',
      open: false,
      startY: (app.screen.height - 200) * 0.85,
      endY: app.screen.height - 100,
      width: 1500,
      tabWidth: 40,
      orient: 'left',
      cards: [],
      marketingTiles: [],
    };

    drawers.push(recruitDrawer, marketDrawer, structureDrawer, beachDrawer);

    drawChunks(tileConfigs);
    addDinerToBoard();
    addBoardToStage();
    drawOuterSquares();

    drawers.forEach((drawer) => renderDrawer(drawer));
    const hiresIndicator = drawerHiresIndicator(player, beachDrawer);

    initCEOCard(player, structureDrawer, ceoCard);
    initCards(recruitDrawer, Object.values(cardConfigs), cards);
    initMarketingTiles(marketDrawer, marketingTileConfigs, marketingTiles);

    drawDebugButton();
    drawPhaseIndicator();
    drawNextPhaseButton();

    drawToolbar(player);

    currentPhase.phase.start();

    app.ticker.add(() => {
      animations.forEach((animation) => animation.update());
    });
    gameElement.appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  return <Box id="game" mx="0.5vw" w="99vw" my="1vh" h="98vh"></Box>;
};
