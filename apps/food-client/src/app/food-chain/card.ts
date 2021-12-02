import * as PIXI from 'pixi.js';
import { translateObject } from './animation';
import { getAdjacentDrinks } from './board';
import { playProduceAnimation } from './card.animations';
import { cardConfigs, emptyCardConfig, emptyCardKind } from './card.configs';
import {
  Drawer,
  renderRecruitDrawerContents,
  toggleDrawerOpen,
} from './drawer';
import { foodKinds } from './food';
import { Player } from './player';
import { EmployeeType, EmployeeTypes } from './types';
import { ts, ts1_2 } from './utils/constants';
import { addSpriteToBoard, setSpriteZOrder } from './utils/graphics-utils';
import {
  app,
  board,
  cards,
  communalDrawers,
  currentPlayer,
} from './utils/singletons';

export type CardConfig = {
  kind?: keyof typeof cardConfigs;
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
  contentsSpacing?: number;
  contentsSlot?: number;
  renderContents?: () => void;
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

export const initCards = (cardConfigs: CardConfig[], cards: Card[]) => {
  const recruitDrawer = communalDrawers.recruit;
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
      if (card.type === EmployeeTypes.manager) {
        card.contentsSpacing = 1;
        card.renderContents = () => renderManagerCards(card);
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

export const moveCardToParent = (
  parent: Drawer | Card,
  card: Card,
  slot?: number
) => {
  const oldParent = card.parent;
  if (slot) card.contentsSlot = slot;
  removeCardFromParent(card.parent, card);
  addCardToParent(parent, card);
  oldParent.renderContents();
  parent.renderContents();
};

export const addCardToParent = (parent: Drawer | Card, card: Card) => {
  card.parent = parent;
  parent.employees.push(card);
  parent.contentsContainer.addChild(card.container);
  if (parent['title']) {
    console.log('added card to parent');
    console.log(parent, card);
  }
};

export const removeCardFromParent = (parent: Drawer | Card, card: Card) => {
  const i = parent.employees.indexOf(card);
  if (i > -1) {
    parent.employees.splice(i, 1);
    parent.contentsContainer.removeChild(card.container);
  }
};

export const hireCard = async (player: Player, card: Card) => {
  const beachDrawer = player.drawers.beach;
  card.container.position.x = card.container.getGlobalPosition().x;
  card.container.position.y = card.container.getGlobalPosition().y;
  app.stage.addChild(card.container);
  await translateObject(
    card.container,
    { x: card.container.position.x, y: card.container.position.y },
    {
      x: beachDrawer.container.x,
      y: beachDrawer.container.y,
    },
    50
  );
  moveCardToParent(beachDrawer, card);
  card.owner = player;
  player.hiresAvailable--;
};

export const fireCard = (player: Player, recruitDrawer: Drawer, card: Card) => {
  moveCardToParent(recruitDrawer, card);
  card.owner = null;
  player.hiresAvailable++;
};

export const manageCard = (manager: Card, card: Card, slot: number) => {
  card.contentsSlot = slot;
  moveCardToParent(manager, card);
  card.active = true;
  if (card.managementSlots) {
    initManagerContentsContainer(card);
  }
};

export const unmanageCard = () => (beachDrawer: Drawer, card: Card) => {
  moveCardToParent(beachDrawer, card);
  card.active = false;
};

export const enableCardHire = () => {
  const recruitDrawer = communalDrawers.recruit;
  cards.forEach((card) => {
    card.container.interactive = true;
    card.container.buttonMode = true;
    card.container.on('pointerdown', () => {
      const player = currentPlayer.player;
      const beachDrawer = player.drawers.beach;
      if (card.parent === recruitDrawer) {
        if (player.hiresAvailable > 0) {
          hireCard(player, card);
        }
      } else if (card.parent === beachDrawer) {
        fireCard(player, recruitDrawer, card);
      }
      player.hiresIndicator.textGraphic.text = `Hires Available: ${player.hiresAvailable.toString()}`;
    });
  });
};

export const slotIsFree = (card: Card, slot: number) =>
  card.employees.filter(
    (childCard) =>
      childCard.contentsSlot === slot && !(childCard.kind === emptyCardKind)
  ).length === 0;

export const cardContainsEvent = (event: PIXI.InteractionEvent, card: Card) =>
  card.container.getBounds().contains(event.data.global.x, event.data.global.y);

export const hasEmployees = (card: Card) =>
  card.employees.filter((employee) => !(employee.kind === emptyCardKind))
    .length > 0;

export const enableCardStructure = () => {
  cards.forEach((card) => {
    let global: PIXI.Point;
    const start = { x: 0, y: 0 };
    const click = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };
    let dragging = false;

    function onDragStart(event: PIXI.InteractionEvent) {
      if (!hasEmployees(card)) {
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
      const ceoCard = currentPlayer.player.ceo.card;
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
      const ceoCard = currentPlayer.player.ceo.card;
      const beachDrawer = currentPlayer.player.drawers.beach;
      if (dragging) {
        ceoCard.container.emit('pointerout');

        if (card.contentsContainer) {
          removeManagerContentsContainer(card);
        }

        // Check if card dragged to a CEO card slot
        for (let i = 0; i < ceoCard.employees.length; i++) {
          const childCard = ceoCard.employees[i];
          if (
            childCard.kind === emptyCardKind &&
            cardContainsEvent(event, childCard) &&
            slotIsFree(ceoCard, childCard.contentsSlot)
          ) {
            manageCard(ceoCard, card, childCard.contentsSlot);
            dragging = false;
            return;
            //Check if card is dragged to a manager slot
          } else if (
            childCard !== card &&
            childCard.type === EmployeeTypes.manager &&
            card.type !== EmployeeTypes.manager
          ) {
            const manager = childCard;
            for (let j = 0; j < manager.employees.length; j++) {
              const emptyCard = manager.employees[j];
              if (
                cardContainsEvent(event, emptyCard) &&
                slotIsFree(manager, emptyCard.contentsSlot)
              ) {
                manageCard(manager, card, emptyCard.contentsSlot);
                dragging = false;
                return;
              }
            }
          }
        }

        // Finally move card to beach drawer
        moveCardToParent(beachDrawer, card);
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

export const untapCards = () => {
  cards.forEach((card) => (card.used = false));
};

export const enableFoodProduction = (player: Player) => {
  cards.forEach((card) => {
    if (card.owner === player && card.active && card.kind === 'burgerCook') {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container.on('pointerdown', () => {
        if (!card.used) {
          card.used = true;
          (async function () {
            for (let i = 0; i < 3; i++) {
              await playProduceAnimation(
                player,
                card.container,
                foodKinds.burger
              );
            }
          })();
        }
      });
    }
    if (card.owner === player && card.active && card.kind === 'pizzaChef') {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container.on('pointerdown', () => {
        if (!card.used) {
          card.used = true;
          (async function () {
            for (let i = 0; i < 8; i++) {
              await playProduceAnimation(
                player,
                card.container,
                foodKinds.pizza
              );
            }
          })();
        }
      });
    }
    if (card.owner === player && card.active && card.kind === 'cartOperator') {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container.on('pointerdown', async () => {
        if (!card.used) {
          await toggleDrawerOpen(player.drawers.structure);
          card.used = true;
          const truck = addSpriteToBoard('truck', ts * 2);
          const diner = player.diners[0];
          const collectedDrinks = [];
          if (diner.drinksPath.length > 1) {
            for (let i = 0; i < diner.drinksPath.length - 1; i++) {
              const item1 = diner.drinksPath[i];
              const item2 = diner.drinksPath[i + 1];
              if (item1 !== item2)
                truck.sprite.rotation = Math.atan2(
                  item2.container.position.y - item1.container.position.y,
                  item2.container.position.x - item1.container.position.x
                );
              setSpriteZOrder(truck.container, item1, item2);
              await translateObject(
                truck.container,
                {
                  x: item1.container.position.x + ts1_2,
                  y: item1.container.position.y + ts1_2,
                },
                {
                  x: item2.container.position.x + ts1_2,
                  y: item2.container.position.y + ts1_2,
                },
                20
              );
              const drinks = getAdjacentDrinks(item2);
              for (let j = 0; j < drinks.length; j++) {
                const drink = drinks[j];
                if (!collectedDrinks.includes(drink)) {
                  collectedDrinks.push(drink);
                  await playProduceAnimation(
                    player,
                    drink.container,
                    drink.kind
                  );
                  await playProduceAnimation(
                    player,
                    drink.container,
                    drink.kind
                  );
                  await playProduceAnimation(
                    player,
                    drink.container,
                    drink.kind
                  );
                }
              }
            }
          }
          board.container.removeChild(truck.container, truck.sprite);
        }
      });
    }
  });
};
