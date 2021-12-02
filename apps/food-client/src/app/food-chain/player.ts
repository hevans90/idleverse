import * as PIXI from 'pixi.js';
import {
  Card,
  createCardSprite,
  initManagerContentsContainer,
  renderManagerCards,
} from './card';
import { ceoCardConfig } from './card.configs';
import { Diner } from './diner';
import { Drawer } from './drawer';

export type Player = {
  diner: Diner;
  ceo: { card: Card };
  cards: Card[];
  food: {
    [key: string]: {
      amount: number;
      sprite?: PIXI.Sprite;
      textSprite?: PIXI.Text;
    };
  };
  cash: number;
  hiresAvailable: number;
};

const validCardTint = new PIXI.Graphics();
validCardTint.beginFill(0x37946e, 0.25);
validCardTint.drawRoundedRect(0, 0, 200, 192, 12);
validCardTint.endFill();

const invalidCardTint = new PIXI.Graphics();
invalidCardTint.beginFill(0xd3002c, 0.25);
invalidCardTint.drawRoundedRect(0, 0, 200, 192, 12);
invalidCardTint.endFill();

export const initCEOCard = (player: Player, structureDrawer: Drawer) => {
  player.ceo.card = {
    ...ceoCardConfig,
    container: createCardSprite(ceoCardConfig),
    owner: player,
    active: false,
    used: false,
    employees: [],
    managementSlots: 3,
    contentsSpacing: 3,
    renderContents: () => renderManagerCards(player.ceo.card),
  };
  const ceoCard = player.ceo.card;

  // ceoCard.container.on('pointerover', () => {
  //   if (ceoCard.employees.length < ceoCard.managementSlots) {
  //     ceoCard.container.addChild(validCardTint);
  //   } else ceoCard.container.addChild(invalidCardTint);
  // });

  // ceoCard.container.on('pointerout', () => {
  //   ceoCard.container.removeChild(validCardTint);
  //   ceoCard.container.removeChild(invalidCardTint);
  // });

  ceoCard.container.position.x =
    structureDrawer.width / 2 - ceoCard.container.width / 2;
  ceoCard.container.position.y = 50;

  initManagerContentsContainer(ceoCard, structureDrawer);

  structureDrawer.contentsContainer.addChild(ceoCard.container);
  structureDrawer.contentsContainer.addChild(ceoCard.contentsContainer);
};
