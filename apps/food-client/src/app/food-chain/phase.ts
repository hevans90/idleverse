import * as PIXI from 'pixi.js';
import { Anim } from './animation';
import { Card, enableCardStructure, enableCardHire } from './card';
import { Drawer } from './drawer';
import { drawBoxIndicator, Indicator } from './indicators';
import { Player } from './types';

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
  if (currentPhaseIndicator) {
    app.stage.removeChild(currentPhaseIndicator);
    currentPhaseIndicator.destroy();
  }
  const phaseIndicatorContainer = new PIXI.Container();
  Object.values(phases).forEach((phase, i) => {
    const phaseIndicatorElement = drawBoxIndicator({
      height: 50,
      width: 200,
      borderColor: phase === currentPhase ? 0x27684d : 0x27684d,
      bgColor: phase === currentPhase ? 0x27b46e : 0x37946e,
      textColor: 0xffffff,
      text: phase.name,
    });
    phaseIndicatorElement.position.x = i * 200;
    phaseIndicatorContainer.addChild(phaseIndicatorElement);
  });
  phaseIndicatorContainer.pivot.x = phaseIndicatorContainer.width / 2;
  phaseIndicatorContainer.x = app.screen.width * 0.5;
  phaseIndicatorContainer.y = 20;
  phaseIndicatorContainer.name = 'phaseIndicator';
  app.stage.addChild(phaseIndicatorContainer);
};

export const drawNextPhaseButton = (
  app: PIXI.Application,
  animations: Anim[],
  player: Player,
  hiresIndicator: Indicator,
  phases: { [key: string]: Phase },
  currentPhase: Phase,
  recruitDrawer: Drawer,
  beachDrawer: Drawer,
  structureDrawer: Drawer,
  ceoCard: Card,
  cards: Card[]
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
      if (currentPhase === phases.structure)
        enableCardStructure(app, beachDrawer, structureDrawer, card, ceoCard);
      else if (currentPhase === phases.hire) {
        enableCardHire(
          animations,
          player,
          card,
          recruitDrawer,
          beachDrawer,
          hiresIndicator
        );
      }
    });
  });
  app.stage.addChild(nextPhaseButton);
};
