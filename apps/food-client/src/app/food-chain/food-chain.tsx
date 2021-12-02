import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { addDinerToBoard } from './diner';
import { drawBoxIndicator, Indicator } from './indicators';
import { renderDrawer, Drawer } from './drawer';
import { Card, createCardSprite, initCards } from './card';
import { Board } from './board';
import { Anim } from './animation';
import { tileConfigs } from './tileConfigs';
import { drawChunks } from './chunk';
import { drawNextPhaseButton, drawPhaseIndicator, Phase } from './phase';
import { cardConfigs, ceoCardConfig } from './cardConfigs';
import { addCEOCardToDrawer } from './ceo';
import { initMarketingTiles, MarketingTile } from './marketingTile';
import { marketingTileConfigs } from './marketingTileConfigs';

export const FoodChain = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    const app = new PIXI.Application({
      transparent: true,
      resizeTo: gameElement,
    });
    app.stage.sortableChildren = true;

    const animations: Anim[] = [];
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

    drawChunks(app, animations, board, tileConfigs);

    addDinerToBoard(board);

    board.container.pivot.x = board.container.width / 2;
    board.container.pivot.y = board.container.height / 2;
    board.container.position.x = app.screen.width / 2;
    board.container.position.y = app.screen.height / 2;
    board.container.scale.x = 0.8;
    board.container.scale.y = 0.8;
    app.stage.addChild(board.container);

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
    renderDrawer(app, recruitDrawer);

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
    renderDrawer(app, marketingDrawer);

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
    renderDrawer(app, structureDrawer);

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
    renderDrawer(app, beachDrawer);

    const hiresIndicator: Indicator = {
      height: 50,
      width: 250,
      borderColor: 0xffbd2e,
      bgColor: 0xffd67d,
      textColor: 0x000000,
      text: `Hires Available: ${player.hiresAvailable.toString()}`,
    };
    drawBoxIndicator(hiresIndicator);
    beachDrawer.container.addChild(hiresIndicator.container);
    hiresIndicator.container.position.x = 620;
    hiresIndicator.container.position.y = 180;

    addCEOCardToDrawer(ceoCard, structureDrawer);
    initCards(
      app,
      animations,
      player,
      hiresIndicator,
      phases,
      currentPhase,
      recruitDrawer,
      beachDrawer,
      structureDrawer,
      Object.values(cardConfigs),
      ceoCard,
      cards
    );

    initMarketingTiles(marketingDrawer, marketingTileConfigs, marketingTiles);

    drawPhaseIndicator(app, Object.values(phases), currentPhase);
    drawNextPhaseButton(
      app,
      animations,
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

    app.ticker.add(() => {
      animations.forEach((animation) => animation.update());
    });

    gameElement.appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  return <Box id="game" mx="2vw" w="96vw" my="2vh" h="96vh"></Box>;
};
