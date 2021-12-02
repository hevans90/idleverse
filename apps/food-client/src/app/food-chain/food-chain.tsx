import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { addDinerToBoard } from './diner';
import { drawBoxIndicator, Indicator } from './indicators';
import { renderDrawer, Drawer } from './drawer';
import { Card, createCardSprite, initCards } from './card';
import { addBoardToStage, Board } from './board';
import { tileConfigs } from './tileConfigs';
import { drawChunks, drawOuterSquares } from './chunk';
import {
  drawDebugButton,
  drawNextPhaseButton,
  drawPhaseIndicator,
  Phase,
} from './phase';
import { cardConfigs, ceoCardConfig } from './cardConfigs';
import { initCEOCard } from './ceo';
import { initMarketingTiles, MarketingTile } from './marketingTile';
import { marketingTileConfigs } from './marketingTileConfigs';
import { disablePlacement, enablePlacement } from './tile';
import { animations, app, keyEventMap } from './utils/singletons';

export const FoodChain = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    app.resizeTo = gameElement;
    app.stage.sortableChildren = true;
    const cards: Card[] = [];
    const marketingTiles: MarketingTile[] = [];

    const player = {
      cards: [],
      hiresAvailable: 10,
    };

    const ceoCard: Card = {
      ...ceoCardConfig,
      container: createCardSprite(ceoCardConfig),
      owner: player,
      employees: [],
    };

    const board: Board = {
      chunksWide: 5,
      chunksHigh: 4,
      tiles: [],
      roads: [],
      houses: [],
      drinks: [],
      marketingTiles: [],
      diner: null,
      container: new PIXI.Container(),
    };

    const phases: { [key: string]: Phase } = {
      structure: {
        name: 'Structure',
      },
      hire: {
        name: 'Hire',
      },
      train: {
        name: 'Train',
      },
    };

    phases.structure.nextPhase = phases.hire;
    phases.hire.nextPhase = phases.train;
    phases.train.nextPhase = phases.structure;

    const currentPhase = phases.structure;

    document.addEventListener('keydown', (e) => {
      if (Object.keys(keyEventMap).includes(e.code)) keyEventMap[e.code]();
    });

    drawChunks(board, tileConfigs);
    addDinerToBoard(board);
    addBoardToStage(app, board);
    drawOuterSquares(board);
    enablePlacement(board, board.diner, true, () => disablePlacement(board));

    const recruitDrawer: Drawer = {
      open: false,
      y: 100,
      width: 900,
      height: app.screen.height - 100,
      tabY: 0,
      tabWidth: 40,
      tabHeight: (app.screen.height - 100) / 2,
      orient: 'right',
      cards: [],
      marketingTiles: [],
    };
    renderDrawer(recruitDrawer);

    const marketingDrawer: Drawer = {
      open: false,
      y: 100,
      width: 900,
      height: app.screen.height - 100,
      tabY: (app.screen.height - 100) / 2,
      tabWidth: 40,
      tabHeight: (app.screen.height - 100) / 2,
      orient: 'right',
      cards: [],
      marketingTiles: [],
    };
    renderDrawer(marketingDrawer);

    const structureDrawer: Drawer = {
      open: false,
      y: 100,
      width: 1500,
      height: app.screen.height * 0.8 - 100,
      tabWidth: 40,
      orient: 'left',
      cards: [],
      marketingTiles: [],
    };
    renderDrawer(structureDrawer);

    const beachDrawer: Drawer = {
      open: false,
      y: app.screen.height * 0.8,
      width: 1500,
      height: app.screen.height * 0.2,
      tabWidth: 40,
      orient: 'left',
      cards: [],
      marketingTiles: [],
    };
    renderDrawer(beachDrawer);

    const hiresIndicator: Indicator = {
      height: 50,
      width: 250,
      borderColor: 0xffbd2e,
      bgColor: 0xffd67d,
      textColor: 0x000000,
      text: `Hires Available: ${player.hiresAvailable.toString()}`,
    };

    initCEOCard(ceoCard, structureDrawer);
    initCards(recruitDrawer, Object.values(cardConfigs), cards);
    initMarketingTiles(
      board,
      marketingDrawer,
      marketingTileConfigs,
      marketingTiles
    );

    drawPhaseIndicator(app, Object.values(phases), currentPhase);
    drawNextPhaseButton(
      player,
      hiresIndicator,
      phases,
      currentPhase,
      recruitDrawer,
      beachDrawer,
      structureDrawer,
      ceoCard,
      cards
    );
    drawDebugButton(board);
    drawBoxIndicator(hiresIndicator);
    beachDrawer.contentsContainer.addChild(hiresIndicator.container);
    hiresIndicator.container.position.x = 620;
    hiresIndicator.container.position.y = 180;

    app.stage.sortableChildren = true;

    app.ticker.add(() => {
      animations.forEach((animation) => animation.update());
    });

    gameElement.appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  return <Box id="game" mx="2vw" w="96vw" my="2vh" h="96vh"></Box>;
};
