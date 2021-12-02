import * as PIXI from 'pixi.js';
import { playProduceAnimation } from './card.animations';
import { emptyCardConfig } from './card.configs';
import { Drawer, organiseRecruitDrawer } from './drawer';
import { foodKindConfigs } from './food';
import { Indicator } from './indicators';
import { Player } from './player';
import { EmployeeType, EmployeeTypes } from './types';
import { app, cards } from './utils/singletons';

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
  parent?: Drawer | Card;
  employees?: Card[];
  active: boolean;
  used: boolean;
  container?: PIXI.Container;
  contentsContainer?: PIXI.Container;
  organiseContents?: () => void;
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
  Object.values(cardConfigs).forEach((cardConfig) => {
    for (let i = 0; i < cardConfig.count; i++) {
      const card: Card = {
        ...cardConfig,
        container: createCardSprite(cardConfig),
        owner: null,
        parent: recruitDrawer,
        employees: [],
        active: false,
        used: false,
      };
      if (card.type === EmployeeTypes.manager)
        card.organiseContents = () => organiseManagerCards(card);
      cards.push(card);
      addCardToParent(recruitDrawer, card);
    }
  });
  organiseRecruitDrawer(recruitDrawer);
  return cards;
};

export const moveCardToParent = (parent: Drawer | Card, card: Card) => {
  console.log(parent);
  console.log(card);
  const oldParent = card.parent;
  removeCardFromParent(card.parent, card);
  addCardToParent(parent, card);
  console.log(parent);
  console.log(card);
  oldParent.organiseContents();
  parent.organiseContents();
};

export const addCardToParent = (parent: Drawer | Card, card: Card) => {
  card.parent = parent;
  parent.employees.push(card);
  parent.contentsContainer.addChild(card.container);
};

export const removeCardFromParent = (parent: Drawer | Card, card: Card) => {
  const i = parent.employees.indexOf(card);
  if (i > -1) {
    parent.employees.splice(i, 1);
    parent.contentsContainer.removeChild(card.container);
  }
};

export const organiseCEOCards = (ceoCard: Card) => {
  console.log('Organising CEO card');
  console.log(ceoCard.employees);
  ceoCard.employees.forEach((childCard, i) => {
    childCard.container.position.x =
      3 * (i - 1) * (ceoCard.container.width + 20);
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

export const hireCard = (player: Player, beachDrawer: Drawer, card: Card) => {
  moveCardToParent(beachDrawer, card);
  card.owner = player;
  console.log(card);
  player.hiresAvailable--;
};

export const fireCard = (player: Player, recruitDrawer: Drawer, card: Card) => {
  moveCardToParent(recruitDrawer, card);
  card.owner = null;
  player.hiresAvailable++;
};

export const manageCard = (manager: Card, card: Card) => {
  moveCardToParent(manager, card);
  card.active = true;
};

export const unmanageCard = () => (beachDrawer: Drawer, card: Card) => {
  moveCardToParent(beachDrawer, card);
  card.active = false;
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
      if (card.parent === recruitDrawer) {
        if (player.hiresAvailable > 0) {
          hireCard(player, beachDrawer, card);
        }
      } else if (card.parent === beachDrawer) {
        fireCard(player, recruitDrawer, card);
      }
      indicator.textGraphic.text = `Hires Available: ${player.hiresAvailable.toString()}`;
    });
  });
};

export const renderManagementContainer = (
  card: Card,
  structureDrawer: Drawer
) => {
  const cardPos = structureDrawer.contentsContainer.toLocal(
    card.container.getGlobalPosition()
  );
  card.contentsContainer = new PIXI.Container();
  card.contentsContainer.x = cardPos.x - (card.container.width + 20);
  card.contentsContainer.y = cardPos.y + card.container.height + 50;
  for (let i = 0; i < card.managementSlots; i++) {
    const emptyCard = {
      ...emptyCardConfig,
      container: createCardSprite(emptyCardConfig),
    };
    emptyCard.container.position.x = (i % 3) * (card.container.width + 20);
    emptyCard.container.position.y =
      Math.floor(i / 3) * (card.container.height + 20);

    card.contentsContainer.addChild(emptyCard.container);
  }
  structureDrawer.contentsContainer.addChild(card.contentsContainer);
};

export const cardContainsEvent = (event: PIXI.InteractionEvent, card: Card) => {
  return card.container
    .getBounds()
    .contains(event.data.global.x, event.data.global.y);
};

export const enableCardStructure = (
  player: Player,
  beachDrawer: Drawer,
  structureDrawer: Drawer,
  cards: Card[]
) => {
  const ceoCard = player.ceo.card;
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
        ceoCard.container.emit('pointerout');

        // Check if card dragged to CEO card
        if (card.contentsContainer) {
          card.contentsContainer.destroy();
          card.contentsContainer = null;
        }
        if (
          cardContainsEvent(event, ceoCard) &&
          ceoCard.employees.length < ceoCard.managementSlots
        ) {
          if (card.parent === beachDrawer) {
            manageCard(ceoCard, card);
            if (card.managementSlots) {
              renderManagementContainer(card, structureDrawer);
            }
          } else {
            card.parent.organiseContents();
          }
          dragging = false;
          return;
        }

        // Check if card dragged to manager card
        ceoCard.employees.forEach((manager) => {
          if (
            manager !== card &&
            card.type !== EmployeeTypes.manager &&
            cardContainsEvent(event, manager) &&
            manager.employees.length < manager.managementSlots
          ) {
            moveCardToParent(manager, card);
            dragging = false;
            return;
          }
        });

        // Finally move card to beach drawer
        moveCardToParent(beachDrawer, card);
        dragging = false;
      }
    }

    if (card.owner === player) {
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

export const untapCards = () => {
  cards.forEach((card) => (card.used = false));
};

export const enableFoodProduction = (player: Player) => {
  cards.forEach((card) => {
    if (card.owner === player && card.active && card.title === 'Burger\nCook') {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container.on('pointerdown', () => {
        if (!card.used) {
          card.used = true;
          (async function () {
            for (let i = 0; i < 3; i++) {
              await playProduceAnimation(
                player,
                card,
                foodKindConfigs.find((kind) => kind.name === 'burger')
              );
            }
          })();
        }
      });
    }
    if (card.owner === player && card.active && card.title === 'Pizza\nChef') {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container.on('pointerdown', () => {
        if (!card.used) {
          card.used = true;
          (async function () {
            for (let i = 0; i < 8; i++) {
              await playProduceAnimation(
                player,
                card,
                foodKindConfigs.find((kind) => kind.name === 'pizza')
              );
            }
          })();
        }
      });
    }
  });
};
