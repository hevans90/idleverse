import * as PIXI from 'pixi.js';
import { emptyCardConfig } from './card.configs';
import {
  removeCardFromDrawer,
  addCardToDrawer,
  Drawer,
  organiseBeachDrawer,
  organiseRecruitDrawer,
} from './drawer';
import { Indicator } from './indicators';
import { Player } from './player';
import { EmployeeType, EmployeeTypes, lineColour } from './types';
import { animations, cards } from './utils/singletons';

export type CardConfig = {
  title: string;
  type: EmployeeType;
  description: string;
  count?: number;
  row?: number;
  position?: number;
  managementSlots?: number;
};

export type Card = CardConfig & {
  owner?: Player;
  container?: PIXI.Container;
  employees?: Card[];
  managingContainer?: PIXI.Container;
  onClick?: () => void;
};

export const createCardSprite = (cardConfig: CardConfig) => {
  const cardContainer = new PIXI.Container();

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

  cardContainer.addChild(cardGraphic);

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

  cardContainer.addChild(cardTitleText);

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

  cardContainer.addChild(cardDescText);

  cardContainer.scale.x = 0.65;
  cardContainer.scale.y = 0.65;

  return cardContainer;
};

export const initCards = (
  recruitDrawer: Drawer,
  cardConfigs: CardConfig[],
  cards: Card[]
) => {
  Object.values(cardConfigs).forEach((card) =>
    Array.from({ length: card.count }, () =>
      cards.push({
        ...card,
        container: createCardSprite(card),
        owner: null,
        employees: [],
      })
    )
  );
  cards.forEach((card) => {
    addCardToDrawer(recruitDrawer, card);
  });
  organiseRecruitDrawer(recruitDrawer);
  return cards;
};

export const addToCard = (parentCard: Card, childCard: Card) => {
  parentCard.employees.push(childCard);
  parentCard.managingContainer.addChild(childCard.container);
};

export const removeFromCard = (parentCard: Card, childCard: Card) => {
  const i = parentCard.employees.indexOf(childCard);
  if (i > -1) {
    parentCard.employees.splice(i, 1);
    parentCard.managingContainer.removeChild(childCard.container);
  }
};

export const organiseCEOCards = (card: Card) => {
  card.employees.forEach((childCard, i) => {
    childCard.container.position.x = 3 * (i - 1) * (card.container.width + 20);
    childCard.container.position.y = 0;
  });
};

export const organiseManagerCards = (card: Card) => {
  card.employees.forEach((childCard, i) => {
    childCard.container.position.x = (i % 3) * (card.container.width + 20);
    childCard.container.position.y =
      Math.floor(i / 3) * (card.container.height + 20);
  });
};

export const enableCardHire = (
  player: Player,
  cards: Card[],
  recruitDrawer: Drawer,
  beachDrawer: Drawer,
  indicator: Indicator
) => {
  cards.forEach((card) => {
    card.container.interactive = true;
    card.container.buttonMode = true;
    card.container.on('pointerdown', () => {
      if (!card.owner) {
        if (player.hiresAvailable > 0) {
          removeCardFromDrawer(recruitDrawer, card);
          animations.push();
          addCardToDrawer(beachDrawer, card);
          organiseRecruitDrawer(recruitDrawer);
          organiseBeachDrawer(beachDrawer);
          card.owner = player;
          player.hiresAvailable--;
        }
      } else {
        removeCardFromDrawer(beachDrawer, card);
        addCardToDrawer(recruitDrawer, card);
        organiseRecruitDrawer(recruitDrawer);
        organiseBeachDrawer(beachDrawer);
        card.owner = null;
        player.hiresAvailable++;
      }
      indicator.textGraphic.text = `Hires Available: ${player.hiresAvailable.toString()}`;
    });
  });
};

export const enableCardStructure = (
  app: PIXI.Application,
  beachDrawer: Drawer,
  structureDrawer: Drawer,
  cards: Card[],
  ceoCard: Card
) => {
  cards.forEach((card) => {
    let global: PIXI.Point;
    const start = { x: 0, y: 0 };
    const click = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };
    let dragging = false;

    function onDragStart(event: PIXI.InteractionEvent) {
      if (card.employees.length === 0) {
        start.x = card.container.position.x;
        start.y = card.container.position.y;
        click.x = event.data.global.x;
        click.y = event.data.global.y;
        global = card.container.getGlobalPosition();

        app.stage.addChild(card.container);
        card.container.position.x = global.x;
        card.container.position.y = global.y;

        dragging = true;
      }
    }

    function onDragMove(event: PIXI.InteractionEvent) {
      if (dragging) {
        cursor.x = event.data.global.x - click.x;
        cursor.y = event.data.global.y - click.y;
        card.container.position.x = global.x + cursor.x;
        card.container.position.y = global.y + cursor.y;
        if (
          ceoCard.container
            .getBounds()
            .contains(event.data.global.x, event.data.global.y)
        ) {
          ceoCard.container.emit('pointerover');
        } else {
          ceoCard.container.emit('pointerout');
        }
      }
    }

    function onDragEnd(event: PIXI.InteractionEvent) {
      if (dragging) {
        removeCardFromDrawer(beachDrawer, card);
        removeFromCard(ceoCard, card);
        ceoCard.employees.forEach((manager) => {
          removeFromCard(manager, card);
        });
        if (card.managingContainer) {
          card.managingContainer.destroy();
          card.managingContainer = null;
        }
        if (
          ceoCard.container
            .getBounds()
            .contains(event.data.global.x, event.data.global.y) &&
          ceoCard.employees.length < ceoCard.managementSlots
        ) {
          addToCard(ceoCard, card);
          organiseCEOCards(ceoCard);
          if (card.managementSlots) {
            const cardPos = structureDrawer.contentsContainer.toLocal(
              card.container.getGlobalPosition()
            );
            card.managingContainer = new PIXI.Container();
            card.managingContainer.x = cardPos.x - (card.container.width + 20);
            card.managingContainer.y = cardPos.y + card.container.height + 50;
            for (let i = 0; i < card.managementSlots; i++) {
              const emptyCard = {
                ...emptyCardConfig,
                container: createCardSprite(emptyCardConfig),
              };
              emptyCard.container.position.x =
                (i % 3) * (card.container.width + 20);
              emptyCard.container.position.y =
                Math.floor(i / 3) * (card.container.height + 20);

              card.managingContainer.addChild(emptyCard.container);
            }
            structureDrawer.contentsContainer.addChild(card.managingContainer);
          }

          organiseBeachDrawer(beachDrawer);
          dragging = false;
          return;
        }

        for (let i = 0; i < ceoCard.employees.length; i++) {
          const manager = ceoCard.employees[i];
          if (
            manager !== card &&
            card.type !== EmployeeTypes.manager &&
            manager.container
              .getBounds()
              .contains(event.data.global.x, event.data.global.y) &&
            manager.employees.length < manager.managementSlots
          ) {
            addToCard(manager, card);
            organiseManagerCards(manager);
            organiseBeachDrawer(beachDrawer);
            dragging = false;
            return;
          }
        }

        addCardToDrawer(beachDrawer, card);
        organiseBeachDrawer(beachDrawer);
        ceoCard.container.emit('pointerout');
        dragging = false;
      }
    }

    if (card.owner) {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
    }
  });
};

export const renderCardCount = (count) => {
  const cardCount = new PIXI.Text(
    `x ${count.toString()}`,
    new PIXI.TextStyle({
      fontFamily: 'consolas',
      fill: lineColour,
      align: 'center',
      fontSize: 20,
      wordWrap: true,
      wordWrapWidth: 190,
    })
  );
  cardCount.position.x = 100;
  cardCount.position.y = 200;
  cardCount.anchor.x = 0.5;

  return cardCount;
};
