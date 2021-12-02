import * as PIXI from 'pixi.js';
import { Drawer, renderRecruitDrawerContents } from '../drawer';
import { Player } from '../player';
import { EmployeeTypes } from '../types';
import { app, communalDrawers, players, cards } from '../utils/singletons';
import { CardConfig, emptyCardConfig, emptyCardKind } from './card.configs';

export type Card = CardConfig & {
  owner?: Player;
  parent?: Drawer | Card;
  employees?: Card[];
  hiresAvailable?: number;
  trainsAvailable?: number;
  hiresText?: PIXI.Text;
  trainsText?: PIXI.Text;
  hiredBy?: Card;
  trainedBy?: Card;
  trainedFrom?: Card;
  active: boolean;
  used: boolean;
  container?: PIXI.Container;
  sprite?: PIXI.Sprite;
  contentsContainer?: PIXI.Container;
  contentsSpacing?: number;
  contentsSlot?: number;
  renderContents?: () => void;
};

export const createCardSprite = (cardConfig: CardConfig) => {
  const topAlpha =
    cardConfig.type.topAlpha !== null ? cardConfig.type.topAlpha : 1;
  const bottomAlpha =
    cardConfig.type.bottomAlpha !== null ? cardConfig.type.bottomAlpha : 1;

  const cardGraphic = new PIXI.Graphics();
  cardGraphic.lineStyle(2, 0x0, 0);
  cardGraphic.beginFill(cardConfig.type.topColour, topAlpha);
  cardGraphic.drawRoundedRect(0, 0, 200, 72, 12);
  cardGraphic.endFill();

  cardGraphic.beginFill(cardConfig.type.bottomColour, bottomAlpha);
  cardGraphic.drawRoundedRect(0, 56, 200, 136, 12);
  cardGraphic.endFill();

  cardGraphic.beginFill(cardConfig.type.topColour, topAlpha);
  cardGraphic.drawRect(0, 56, 200, 12);
  cardGraphic.endFill();

  if (cardConfig.type.borderColor) {
    cardGraphic.lineStyle(2, cardConfig.type.borderColor, 1);
    cardGraphic.drawRoundedRect(0, 0, 200, 192, 12);
  }

  const cardTitleText = new PIXI.Text(
    cardConfig.title,
    new PIXI.TextStyle({
      fontFamily: 'consolas',
      fontWeight: 'bold',
      fill: '#ffffff',
      align: 'center',
      fontSize: 24,
      wordWrap: true,
      wordWrapWidth: 200,
    })
  );
  cardTitleText.position.x = 100;
  cardTitleText.position.y = 8;
  cardTitleText.anchor.x = 0.5;

  const cardDescText = new PIXI.Text(
    cardConfig.description,
    new PIXI.TextStyle({
      fontFamily: 'consolas',
      fill: cardConfig.type.textColour,
      align: 'center',
      fontSize: 20,
      wordWrap: true,
      wordWrapWidth: 190,
    })
  );
  cardDescText.position.x = 100;
  cardDescText.position.y = 80;
  cardDescText.anchor.x = 0.5;

  const renderContainer = new PIXI.Container();
  renderContainer.addChild(cardGraphic, cardTitleText, cardDescText);

  const baseTexture = new PIXI.BaseRenderTexture({
    width: 200,
    height: 192,
  });
  const renderTexture = new PIXI.RenderTexture(baseTexture);

  app.renderer.render(renderContainer, { renderTexture });

  const cardSprite = new PIXI.Sprite(renderTexture);

  cardSprite.scale.x = 0.65;
  cardSprite.scale.y = 0.65;

  return cardSprite;
};

export const initCards = (cardConfigs: CardConfig[], cards: Card[]) => {
  const recruitDrawer = communalDrawers.recruit;
  Object.values(cardConfigs).forEach((cardConfig) => {
    for (let i = 0; i < cardConfig.count; i++) {
      const card: Card = {
        ...cardConfig,
        container: new PIXI.Container(),
        sprite: createCardSprite(cardConfig),
        owner: null,
        parent: recruitDrawer,
        employees: [],
        active: false,
        used: false,
      };
      card.container.addChild(card.sprite);
      if (card.type === EmployeeTypes.manager) {
        card.contentsSpacing = 1;
        card.renderContents = () => renderManagerCards(card);
      }
      if (card.maxHires) {
        card.hiresText = new PIXI.Text(
          '',
          new PIXI.TextStyle({
            fontFamily: 'consolas',
            fontWeight: 'bold',
            fill: '#ff00af',
            align: 'center',
            fontSize: 72,
          })
        );
        card.hiresText.anchor.x = 0.5;
        card.hiresText.anchor.y = 0.5;
        card.hiresText.x = card.sprite.width / 2;
        card.hiresText.y = card.sprite.height / 2;
        card.container.addChild(card.hiresText);
      }
      if (card.maxTrains) {
        card.trainsText = new PIXI.Text(
          '',
          new PIXI.TextStyle({
            fontFamily: 'consolas',
            fontWeight: 'bold',
            fill: '#ff00af',
            align: 'center',
            fontSize: 72,
          })
        );
        card.trainsText.anchor.x = 0.5;
        card.trainsText.anchor.y = 0.5;
        card.trainsText.x = card.sprite.width / 2;
        card.trainsText.y = card.sprite.height / 2;
        card.container.addChild(card.trainsText);
      }
      cards.push(card);
      addCardToParent(recruitDrawer, card);
    }
  });
  renderRecruitDrawerContents();
  return cards;
};

export const initManagerContentsContainer = (card: Card) => {
  card.contentsContainer = new PIXI.Container();
  card.contentsContainer.position.x =
    card.container.position.x -
    card.contentsSpacing * (card.container.width + 20);
  card.contentsContainer.position.y =
    card.container.position.y + card.container.height + 50;
  initManagerCards(card);
  renderManagerCards(card);
  card.parent.contentsContainer.addChild(card.contentsContainer);
};

export const removeManagerContentsContainer = (card: Card) => {
  card.contentsContainer.destroy();
  card.contentsContainer = null;
  card.employees.forEach((emptyCard) => emptyCard.container.destroy());
  card.employees = [];
};

export const initManagerCards = (card: Card) => {
  for (let i = 0; i < card.managementSlots; i++) {
    const emptyCard: Card = {
      ...emptyCardConfig,
      parent: card,
      contentsSlot: i,
      active: false,
      used: false,
      container: createCardSprite(emptyCardConfig),
    };
    card.employees.push(emptyCard);
  }
};

export const renderManagerCards = (card: Card) => {
  card.employees.forEach((childCard) => {
    childCard.container.position.x =
      card.contentsSpacing *
      (childCard.contentsSlot % 3) *
      (card.container.width + 20);
    childCard.container.position.y =
      Math.floor(childCard.contentsSlot / 3) * (card.container.height + 20);
    card.contentsContainer.addChild(childCard.container);
  });
};

export const getAllCards = () => {
  const ceoCards = [];
  players.forEach((player) => ceoCards.push(player.ceo.card));
  return [].concat(ceoCards, cards);
};

export const moveCardToParent = (
  parent: Drawer | Card,
  card: Card,
  slot?: number
) => {
  if (slot) card.contentsSlot = slot;
  removeCardFromParent(card.parent, card);
  addCardToParent(parent, card);
  parent.renderContents();
};

export const addCardToParent = (parent: Drawer | Card, card: Card) => {
  card.parent = parent;
  parent.employees.push(card);
  parent.contentsContainer.addChild(card.container);
  //parent.renderContents();
};

export const removeCardFromParent = (parent: Drawer | Card, card: Card) => {
  const i = parent.employees.indexOf(card);
  if (i > -1) {
    parent.employees.splice(i, 1);
    parent.contentsContainer.removeChild(card.container);
  }
  parent.renderContents();
};

export const cardContainsEvent = (event: PIXI.InteractionEvent, card: Card) =>
  card.container.getBounds().contains(event.data.global.x, event.data.global.y);

export const hasEmployees = (card: Card) =>
  card.employees.filter((employee) => !(employee.kind === emptyCardKind))
    .length > 0;

export const untapCards = () => {
  cards.forEach((card) => (card.used = false));
};
