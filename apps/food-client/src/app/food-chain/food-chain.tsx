import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { getSquaresInRange, isValidPosition } from './utils/utils';
import { addBoardToStage } from './board';
import { initCEOCard, Player } from './player';
import {
  renderDrawer,
  Drawer,
  toggleOpen,
  organiseRecruitDrawer,
  organiseMarketingDrawer,
  organiseBeachDrawer,
  openDrawer,
} from './drawer';
import { drawerHiresIndicator } from './indicators';
import {
  drawDebugButton,
  drawNextPhaseButton,
  drawPhaseIndicator,
  getPhase,
} from './phase';
import { drawChunks, drawOuterSquares } from './chunk';
import { enablePlacement } from './tile';
import {
  initCards,
  enableCardHire,
  enableCardStructure,
  enableFoodProduction,
  untapCards,
  hireCard,
  manageCard,
} from './card';
import {
  initMarketingTiles,
  enableAdvertise,
  enableMarketingTilePlacement,
} from './marketingTile';
import { addDinerToBoard } from './diner';
import { drawToolbar } from './toolbar';
import {
  animations,
  app,
  board,
  cards,
  currentPhase,
  drawers,
  keyEventMap,
  marketingTiles,
  phases,
} from './utils/singletons';
import { tileConfigs } from './tile.configs';
import { cardConfigs } from './card.configs';
import { marketingTileConfigs } from './marketingTile.configs';
import { enableDinnerTime } from './house';

export const FoodChain = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    app.resizeTo = gameElement;
    app.stage.sortableChildren = true;

    const player: Player = {
      diner: null,
      ceo: { card: null },
      cards: [],
      hiresAvailable: 10,
      cash: 0,
      food: {
        beer: { amount: 0 },
        lemonade: { amount: 0 },
        cola: { amount: 0 },
        pizza: { amount: 0 },
        burger: { amount: 0 },
      },
    };

    phases.push({
      name: 'Launch',
      start: () => {
        enablePlacement(
          board.diner,
          board.tiles,
          (square) => isValidPosition(board, board.diner, square, true),
          (square) => getSquaresInRange(board, board.diner, square, 1)
        );
      },
      nextPhase: 'Structure',
    });
    phases.push({
      name: 'Structure',
      start: () => {
        openDrawer('Structure');
        openDrawer('Beach');
        untapCards();
        enableCardStructure(player, beachDrawer, structureDrawer, cards);
      },
      nextPhase: 'Hire',
    });
    phases.push({
      name: 'Hire',
      start: () => {
        openDrawer('Beach');
        openDrawer('Recruit');
        enableCardHire(
          player,
          cards,
          recruitDrawer,
          beachDrawer,
          hiresIndicator
        );
      },
      nextPhase: 'Market',
    });
    phases.push({
      name: 'Market',
      start: () => {
        openDrawer('Market');
        enableMarketingTilePlacement(marketDrawer, marketingTiles);
      },
      nextPhase: 'Produce',
    });
    phases.push({
      name: 'Produce',
      start: () => {
        enableFoodProduction(player);
        if (!structureDrawer.open) toggleOpen(structureDrawer);
      },
      nextPhase: 'Dinner Time',
    });
    phases.push({
      name: 'Dinner Time',
      start: () => {
        enableDinnerTime(player);
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

    document.addEventListener('keydown', (e) => {
      if (Object.keys(keyEventMap).includes(e.code)) keyEventMap[e.code]();
    });

    const recruitDrawer: Drawer = {
      name: 'Recruit',
      open: false,
      startY: 100,
      endY: app.screen.height - 100,
      width: 900,
      tabEndY: (app.screen.height - 200) / 2,
      tabWidth: 40,
      orient: 'right',
      employees: [],
      marketingTiles: [],
      organiseContents: () => organiseRecruitDrawer(recruitDrawer),
    };

    const marketDrawer: Drawer = {
      name: 'Market',
      open: false,
      startY: 100,
      endY: app.screen.height - 100,
      width: 900,
      tabStartY: (app.screen.height - 200) / 2,
      tabWidth: 40,
      orient: 'right',
      employees: [],
      marketingTiles: [],
      organiseContents: () => organiseMarketingDrawer(marketDrawer),
    };

    const beachDrawer: Drawer = {
      name: 'Beach',
      open: false,
      startY: (app.screen.height - 200) * 0.85,
      endY: app.screen.height - 100,
      width: 1500,
      tabWidth: 40,
      orient: 'left',
      employees: [],
      marketingTiles: [],
      organiseContents: () => organiseBeachDrawer(beachDrawer),
    };

    const structureDrawer: Drawer = {
      name: 'Structure',
      open: false,
      startY: 100,
      endY: (app.screen.height - 200) * 0.85,
      width: 1500,
      tabWidth: 40,
      orient: 'left',
      employees: [],
      marketingTiles: [],
    };

    drawers.push(recruitDrawer, marketDrawer, structureDrawer, beachDrawer);

    drawChunks(tileConfigs);
    addDinerToBoard(player);
    addBoardToStage();
    drawOuterSquares();

    drawers.forEach((drawer) => renderDrawer(drawer));
    const hiresIndicator = drawerHiresIndicator(player, beachDrawer);

    initCEOCard(player, structureDrawer);
    initCards(recruitDrawer, Object.values(cardConfigs), cards);
    initMarketingTiles(marketDrawer, marketingTileConfigs, marketingTiles);

    drawDebugButton();
    drawNextPhaseButton();

    const burgerCook = cards.find((card) => card.title === 'Burger\nCook');
    hireCard(player, beachDrawer, burgerCook);
    manageCard(player.ceo.card, burgerCook);
    const pizzaChef = cards.find((card) => card.title === 'Pizza\nChef');
    hireCard(player, beachDrawer, pizzaChef);
    manageCard(player.ceo.card, pizzaChef);

    drawToolbar(player);

    currentPhase.phase = getPhase('Produce');
    currentPhase.phase.start();
    drawPhaseIndicator();

    app.ticker.add(() => {
      animations.forEach((animation) => animation.update());
    });
    gameElement.appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  return <Box id="game" mx="0.5vw" w="99vw" my="1vh" h="98vh"></Box>;
};
