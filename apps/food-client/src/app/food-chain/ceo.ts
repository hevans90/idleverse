import * as PIXI from 'pixi.js';
import { Card, createCardSprite } from './card';
import { ceoCardConfig, emptyCardConfig } from './cardConfigs';
import { Drawer } from './drawer';
import { Player } from './types';

const validCardTint = new PIXI.Graphics();
validCardTint.beginFill(0x37946e, 0.25);
validCardTint.drawRoundedRect(0, 0, 200, 192, 12);
validCardTint.endFill();

const invalidCardTint = new PIXI.Graphics();
invalidCardTint.beginFill(0xd3002c, 0.25);
invalidCardTint.drawRoundedRect(0, 0, 200, 192, 12);
invalidCardTint.endFill();

export const initCEOCard = (player: Player, structureDrawer: Drawer) => {
  const ceoCard: Card = {
    ...ceoCardConfig,
    container: createCardSprite(ceoCardConfig),
    owner: player,
    employees: [],
  };
  ceoCard.container.on('pointerover', () => {
    if (ceoCard.employees.length < ceoCard.managementSlots) {
      ceoCard.container.addChild(validCardTint);
    } else ceoCard.container.addChild(invalidCardTint);
  });

  ceoCard.container.on('pointerout', () => {
    ceoCard.container.removeChild(validCardTint);
    ceoCard.container.removeChild(invalidCardTint);
  });

  ceoCard.container.position.x =
    structureDrawer.width / 2 - ceoCard.container.width / 2;
  ceoCard.container.position.y = 50;
  structureDrawer.container.addChild(ceoCard.container);

  ceoCard.managingContainer = new PIXI.Container();
  ceoCard.managingContainer.x = ceoCard.container.position.x;
  ceoCard.managingContainer.y =
    ceoCard.container.position.y + ceoCard.container.height + 50;

  for (let i = -1; i < 2; i++) {
    const emptyCard = {
      ...emptyCardConfig,
      container: createCardSprite(emptyCardConfig),
    };
    emptyCard.container.position.x = 3 * i * (ceoCard.container.width + 20);

    ceoCard.managingContainer.addChild(emptyCard.container);
  }

  structureDrawer.container.addChild(ceoCard.managingContainer);
  return ceoCard;
};
