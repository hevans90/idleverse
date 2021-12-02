import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { addDinerToBoard } from './diner';
import { drawBoxIndicator, Indicator } from './indicators';
import { renderDrawer, Drawer } from './drawer';
import { initCards } from './card';
import { addBoardToStage, Board } from './board';
import { tileConfigs } from './tile.configs';
import { drawChunks, drawOuterSquares } from './chunk';
import {
  drawDebugButton,
  drawNextPhaseButton,
  drawPhaseIndicator,
  Phase,
} from './phase';
import { cardConfigs } from './card.configs';
import { initCEOCard } from './ceo';
import { initMarketingTiles } from './marketingTile';
import { marketingTileConfigs } from './marketingTile.configs';
import { disablePlacement, enablePlacement } from './tile';
import { animations, app, keyEventMap } from './utils/singletons';
import { getSquaresInRange, isValidPosition } from './utils/utils';

export const FoodChain = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    app.resizeTo = gameElement;
    app.stage.sortableChildren = true;

    const player = {
      cards: [],
      hiresAvailable: 10,
    };

    const board: Board = {
      chunksWide: 5,
      chunksHigh: 4,
      tiles: [],
      outerTiles: [],
      roads: [],
      houses: [],
      drinks: [],
      marketingTiles: [],
      diner: null,
      container: new PIXI.Container(),
    };

    const phases: { [key: string]: Phase } = {
      launch: {
        name: 'Launch',
      },
      structure: {
        name: 'Structure',
      },
      hire: {
        name: 'Hire',
      },
      train: {
        name: 'Train',
      },
      market: {
        name: 'Market',
      },
      advertise: {
        name: 'Advertise',
      },
    };

    phases.launch.nextPhase = phases.structure;
    phases.structure.nextPhase = phases.hire;
    phases.hire.nextPhase = phases.train;
    phases.train.nextPhase = phases.market;
    phases.market.nextPhase = phases.advertise;
    phases.advertise.nextPhase = phases.structure;

    const currentPhase = phases.train;

    document.addEventListener('keydown', (e) => {
      if (Object.keys(keyEventMap).includes(e.code)) keyEventMap[e.code]();
    });

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

    const hiresIndicator: Indicator = {
      height: 50,
      width: 250,
      borderColor: 0xffbd2e,
      bgColor: 0xffd67d,
      textColor: 0x000000,
      text: `Hires Available: ${player.hiresAvailable.toString()}`,
    };

    drawChunks(board, tileConfigs);
    addDinerToBoard(board);
    addBoardToStage(app, board);
    drawOuterSquares(board);

    renderDrawer(recruitDrawer);
    renderDrawer(marketingDrawer);
    renderDrawer(structureDrawer);
    renderDrawer(beachDrawer);

    const ceoCard = initCEOCard(player, structureDrawer);
    const cards = initCards(recruitDrawer, Object.values(cardConfigs));
    const marketingTiles = initMarketingTiles(
      marketingDrawer,
      marketingTileConfigs
    );

    drawPhaseIndicator(app, Object.values(phases), currentPhase);
    drawNextPhaseButton(
      board,
      player,
      hiresIndicator,
      phases,
      currentPhase,
      recruitDrawer,
      beachDrawer,
      structureDrawer,
      marketingDrawer,
      ceoCard,
      cards,
      marketingTiles
    );
    drawDebugButton(board);
    drawBoxIndicator(hiresIndicator);
    beachDrawer.contentsContainer.addChild(hiresIndicator.container);
    hiresIndicator.container.position.x = 620;
    hiresIndicator.container.position.y = 180;

    if (currentPhase === phases.launch)
      enablePlacement(
        board,
        board.diner,
        board.tiles,
        (square) => isValidPosition(board, board.diner, square, true),
        (square) => getSquaresInRange(board, board.diner, square, 1),
        () => disablePlacement(board)
      );

    app.ticker.add(() => {
      animations.forEach((animation) => animation.update());
    });
    gameElement.appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  return <Box id="game" mx="2vw" w="96vw" my="2vh" h="96vh"></Box>;
};
