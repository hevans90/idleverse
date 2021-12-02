import * as PIXI from 'pixi.js';
import { closeAllDrawers } from './drawer';
import { initBoxIndicator } from './indicators';
import { disablePlacement } from './tile';
import { debug } from './utils/constants';
import {
  app,
  board,
  cards,
  marketingTiles,
  phases,
  currentPhase,
} from './utils/singletons';

export type Phase = {
  name: string;
  nextPhase?: string;
  start?: () => void;
  end?: () => void;
};

export const drawPhaseIndicator = () => {
  const currentPhaseIndicator = app.stage.getChildByName('phaseIndicator');
  const indicatorWidth = 180;
  const indicatorHeight = 50;
  if (currentPhaseIndicator) {
    app.stage.removeChild(currentPhaseIndicator);
    currentPhaseIndicator.destroy();
  }
  const phaseIndicatorContainer = new PIXI.Container();
  Object.values(phases).forEach((phase, i) => {
    const phaseIndicatorElement = initBoxIndicator({
      height: indicatorHeight,
      width: indicatorWidth,
      borderColor: phase === currentPhase.phase ? 0x27684d : 0x27684d,
      bgColor: phase === currentPhase.phase ? 0x27b46e : 0x37946e,
      textColor: 0xffffff,
      text: phase.name,
    }).container;
    phaseIndicatorElement.position.x = i * indicatorWidth;
    phaseIndicatorElement.interactive = true;
    phaseIndicatorElement.buttonMode = true;
    phaseIndicatorElement.on('pointerdown', () => {
      endCurrentPhase();
      startPhase(phase);
    });
    phaseIndicatorContainer.addChild(phaseIndicatorElement);
  });
  phaseIndicatorContainer.pivot.x = phaseIndicatorContainer.width / 2;
  phaseIndicatorContainer.x = app.screen.width * 0.5;
  phaseIndicatorContainer.y = app.screen.height - 50;
  phaseIndicatorContainer.name = 'phaseIndicator';

  app.stage.addChild(phaseIndicatorContainer);
};

export const drawNextPhaseButton = () => {
  const nextPhaseButton = initBoxIndicator({
    height: 50,
    width: 200,
    borderColor: 0xffbd2e,
    bgColor: 0xffd67d,
    textColor: 0x000000,
    text: 'Next Phase',
  });
  nextPhaseButton.container.position.x =
    app.screen.width - nextPhaseButton.width - 20;
  nextPhaseButton.container.position.y = app.screen.height - 50;
  nextPhaseButton.container.interactive = true;
  nextPhaseButton.container.buttonMode = true;
  nextPhaseButton.container.on('pointerdown', () => {
    endCurrentPhase();
    startPhase(getPhase(currentPhase.phase.nextPhase));
  });
  app.stage.addChild(nextPhaseButton.container);
};

export const drawDebugButton = () => {
  const nextPhaseButton = initBoxIndicator({
    height: 50,
    width: 200,
    borderColor: 0xffbd2e,
    bgColor: 0xffd67d,
    textColor: 0x000000,
    text: 'Debug Mode',
  });
  nextPhaseButton.container.position.x = 20;
  nextPhaseButton.container.position.y = app.screen.height - 50;
  nextPhaseButton.container.interactive = true;
  nextPhaseButton.container.buttonMode = true;
  nextPhaseButton.container.on('pointerdown', () => {
    board.tiles
      .concat(board.roads, board.houses, board.drinks)
      .forEach((tile) => (tile.sprite.tint = 0xffffff));
    debug.enabled = !debug.enabled;
    console.log(debug);
  });
  app.stage.addChild(nextPhaseButton.container);
};

export const getPhase = (phaseName: string) => {
  return phases.find((phase) => phase.name === phaseName);
};

export const startPhase = (phase: Phase) => {
  currentPhase.phase = phase;
  if (currentPhase.phase.start) currentPhase.phase.start();
  drawPhaseIndicator();
};

const endCurrentPhase = () => {
  cards.forEach((card) => {
    card.container.removeAllListeners();
    card.container.interactive = false;
    card.container.buttonMode = false;
  });
  marketingTiles.forEach((tile) => {
    tile.sprite.removeAllListeners();
    tile.sprite.interactive = false;
    tile.sprite.buttonMode = false;
  });
  board.diner.sprite.removeAllListeners();
  board.diner.sprite.interactive = false;
  board.diner.sprite.buttonMode = false;
  disablePlacement(board);
  closeAllDrawers();
};
