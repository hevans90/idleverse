import * as PIXI from 'pixi.js';
import { Board } from './board';
import { Card, enableCardStructure, enableCardHire } from './card';
import { Drawer, toggleOpen } from './drawer';
import { drawBoxIndicator, Indicator } from './indicators';
import {
  enableAdvertise,
  enableMarketingTilePlacement,
  MarketingTile,
} from './marketingTile';
import { Player } from './types';
import { debug } from './utils/constants';
import { app } from './utils/singletons';

export type Phase = {
  name: string;
  nextPhase?: Phase;
};

export const drawPhaseIndicator = (
  app: PIXI.Application,
  phases: Phase[],
  currentPhase: Phase
) => {
  const currentPhaseIndicator = app.stage.getChildByName('phaseIndicator');
  const indicatorWidth = 180;
  const indicatorHeight = 50;
  if (currentPhaseIndicator) {
    app.stage.removeChild(currentPhaseIndicator);
    currentPhaseIndicator.destroy();
  }
  const phaseIndicatorContainer = new PIXI.Container();
  Object.values(phases).forEach((phase, i) => {
    const phaseIndicatorElement = drawBoxIndicator({
      height: indicatorHeight,
      width: indicatorWidth,
      borderColor: phase === currentPhase ? 0x27684d : 0x27684d,
      bgColor: phase === currentPhase ? 0x27b46e : 0x37946e,
      textColor: 0xffffff,
      text: phase.name,
    });
    phaseIndicatorElement.position.x = i * indicatorWidth;
    phaseIndicatorContainer.addChild(phaseIndicatorElement);
  });
  phaseIndicatorContainer.pivot.x = phaseIndicatorContainer.width / 2;
  phaseIndicatorContainer.x = app.screen.width * 0.5;
  phaseIndicatorContainer.y = 20;
  phaseIndicatorContainer.name = 'phaseIndicator';
  app.stage.addChild(phaseIndicatorContainer);
};

export const drawNextPhaseButton = (
  board: Board,
  player: Player,
  hiresIndicator: Indicator,
  phases: { [key: string]: Phase },
  currentPhase: Phase,
  recruitDrawer: Drawer,
  beachDrawer: Drawer,
  structureDrawer: Drawer,
  marketingDrawer: Drawer,
  ceoCard: Card,
  cards: Card[],
  marketingTiles: MarketingTile[]
) => {
  const nextPhaseButton = drawBoxIndicator({
    height: 50,
    width: 200,
    borderColor: 0xffbd2e,
    bgColor: 0xffd67d,
    textColor: 0x000000,
    text: 'Next Phase',
  });
  nextPhaseButton.position.x = app.screen.width - nextPhaseButton.width - 20;
  nextPhaseButton.position.y = 20;
  nextPhaseButton.interactive = true;
  nextPhaseButton.buttonMode = true;
  nextPhaseButton.on('pointerdown', () => {
    currentPhase = currentPhase.nextPhase;
    drawPhaseIndicator(app, Object.values(phases), currentPhase);
    cards.forEach((card) => {
      card.container.removeAllListeners();
      card.container.interactive = false;
      card.container.buttonMode = false;
      if (currentPhase === phases.structure)
        enableCardStructure(app, beachDrawer, structureDrawer, card, ceoCard);
      else if (currentPhase === phases.hire)
        enableCardHire(
          player,
          card,
          recruitDrawer,
          beachDrawer,
          hiresIndicator
        );
    });
    marketingTiles.forEach((tile) => {
      tile.sprite.removeAllListeners();
      tile.sprite.interactive = false;
      tile.sprite.buttonMode = false;
      if (currentPhase === phases.market) {
        if (!marketingDrawer.open) toggleOpen(marketingDrawer);
        enableMarketingTilePlacement(board, marketingDrawer, tile);
      } else if (currentPhase === phases.advertise)
        enableAdvertise(board, tile);
    });
  });
  app.stage.addChild(nextPhaseButton);
};

export const drawDebugButton = (board: Board) => {
  const nextPhaseButton = drawBoxIndicator({
    height: 50,
    width: 200,
    borderColor: 0xffbd2e,
    bgColor: 0xffd67d,
    textColor: 0x000000,
    text: 'Debug Mode',
  });
  nextPhaseButton.position.x = 20;
  nextPhaseButton.position.y = 20;
  nextPhaseButton.interactive = true;
  nextPhaseButton.buttonMode = true;
  nextPhaseButton.on('pointerdown', () => {
    board.tiles
      .concat(board.roads, board.houses, board.drinks)
      .forEach((tile) => (tile.sprite.tint = 0xffffff));
    debug.enabled = !debug.enabled;
    console.log(debug);
  });
  app.stage.addChild(nextPhaseButton);
};
