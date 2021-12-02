import * as PIXI from 'pixi.js';
import {
  removeFromDrawer,
  addToDrawer,
  Drawer,
  organiseBeachDrawer,
  organiseRecruitDrawer,
} from './drawer';
import { Indicator } from './indicators';
import { EmployeeType, EmployeeTypes, lineColour, Player } from './types';

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
  managing?: Card[];
  managingContainer?: PIXI.Container;
  countText?: PIXI.Text;
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
  cardContainer.interactive = true;
  cardContainer.buttonMode = true;

  cardContainer.scale.x = 0.65;
  cardContainer.scale.y = 0.65;

  return cardContainer;
};

export const addToCard = (parentCard: Card, childCard: Card) => {
  parentCard.managing.push(childCard);
  parentCard.managingContainer.addChild(childCard.container);
};

export const removeFromCard = (parentCard: Card, childCard: Card) => {
  const i = parentCard.managing.indexOf(childCard);
  if (i > -1) {
    parentCard.managing.splice(i, 1);
    parentCard.managingContainer.removeChild(childCard.container);
  }
};

export const organiseCards = (card: Card) => {
  card.managing.forEach((childCard, i) => {
    childCard.container.position.x = 3 * (i - 1) * (card.container.width + 20);
    childCard.container.position.y = 0;
  });
};

export const enableCardHire = (
  player: Player,
  card: Card,
  srcDrawer: Drawer,
  destDrawer: Drawer,
  indicator: Indicator
) => {
  card.container.on('pointerdown', () => {
    if (!card.owner) {
      if (player.hiresAvailable > 0) {
        removeFromDrawer(srcDrawer, card);
        addToDrawer(destDrawer, card, player);
        organiseRecruitDrawer(srcDrawer);
        organiseBeachDrawer(destDrawer);
        player.hiresAvailable--;
      }
    } else {
      removeFromDrawer(destDrawer, card, player);
      addToDrawer(srcDrawer, card);
      organiseRecruitDrawer(srcDrawer);
      organiseBeachDrawer(destDrawer);
      player.hiresAvailable++;
    }
    indicator.textGraphic.text = `Hires Available: ${player.hiresAvailable.toString()}`;
  });
};

export const enableCardStructure = (
  app: PIXI.Application,
  srcDrawer: Drawer,
  card: Card,
  targetCard: Card
) => {
  let global: PIXI.Point;
  const start = { x: 0, y: 0 };
  const click = { x: 0, y: 0 };
  const cursor = { x: 0, y: 0 };
  let dragging = false;

  function onDragStart(event: PIXI.InteractionEvent) {
    start.x = card.container.position.x;
    start.y = card.container.position.y;
    click.x = event.data.global.x;
    click.y = event.data.global.y;
    global = card.container.getGlobalPosition();

    app.stage.addChild(card.container);
    card.container.position.x = global.x;
    card.container.position.y = global.y;

    //app.stage.addChild(card.container);
    dragging = true;
  }

  function onDragMove(event: PIXI.InteractionEvent) {
    if (dragging) {
      cursor.x = event.data.global.x - click.x;
      cursor.y = event.data.global.y - click.y;
      card.container.position.x = global.x + cursor.x;
      card.container.position.y = global.y + cursor.y;
      if (
        targetCard.container
          .getBounds()
          .contains(event.data.global.x, event.data.global.y)
      ) {
        targetCard.container.emit('pointerover');
      } else {
        targetCard.container.emit('pointerout');
      }
    }
  }

  function onDragEnd(event: PIXI.InteractionEvent) {
    if (dragging) {
      removeFromDrawer(srcDrawer, card);
      removeFromCard(targetCard, card);
      if (
        targetCard.container
          .getBounds()
          .contains(event.data.global.x, event.data.global.y) &&
        targetCard.managing.length < targetCard.managementSlots
      ) {
        addToCard(targetCard, card);
        organiseCards(targetCard);
        console.log(targetCard.managing);
      } else {
        addToDrawer(srcDrawer, card);
        organiseRecruitDrawer(srcDrawer);
        targetCard.container.emit('pointerout');
      }

      dragging = false;
    }
  }

  card.container
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);
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

export const ceoCardConfig: CardConfig = {
  title: 'CEO',
  type: EmployeeTypes.manager,
  description: 'This is you!',
  managementSlots: 3,
};

export const emptyCardConfig: CardConfig = {
  title: '',
  type: EmployeeTypes.empty,
  description: '',
};

export const cardConfigs: { [key: string]: CardConfig } = {
  waitress: {
    title: 'Waitress',
    type: EmployeeTypes.finance,
    description:
      'Get 3$ cash.\nWin ties against\nrestaurant with\nfewer waitresses',
    count: 12,
    row: 0,
    position: 0,
  },
  newBusinessDev: {
    title: 'New Business\nDeveloper',
    type: EmployeeTypes.finance,
    description: 'Place house\nor garden',
    count: 6,
    row: 0,
    position: 1,
  },
  localManager: {
    title: 'Local\nManager',
    type: EmployeeTypes.branchManager,
    description: 'Place new restaurant,\n"COMING SOON".\nDrive-in available',
    count: 6,
    row: 0,
    position: 2,
  },
  regionalManager: {
    title: 'Regional\nManager',
    type: EmployeeTypes.branchManager,
    description:
      'Place or move\nrestaurant, opens\nimmediately.\nDrive-in available',
    count: 3,
    row: 0,
    position: 3,
  },
  cfo: {
    title: 'CFO',
    type: EmployeeTypes.finance,
    description: 'Add +50% to cash\nearned this round',
    count: 3,
    row: 0,
    position: 4,
  },
  managementTrainee: {
    title: 'Management\nTrainee',
    type: EmployeeTypes.manager,
    description: 'Can manage 2 employees',
    count: 18,
    row: 1,
    position: 0,
    managementSlots: 2,
  },
  juniorVP: {
    title: 'Junior\nVice President',
    type: EmployeeTypes.manager,
    description: 'Can manage 3 employees',
    count: 6,
    row: 1,
    position: 1,
    managementSlots: 3,
  },
  VP: {
    title: 'Vice\nPresident',
    type: EmployeeTypes.manager,
    description: 'Can manage 4 employees',
    count: 6,
    row: 1,
    position: 2,
    managementSlots: 4,
  },
  seniorVP: {
    title: 'Senior\nVice President',
    type: EmployeeTypes.manager,
    description: 'Can manage 5 employees',
    count: 6,
    row: 1,
    position: 3,
    managementSlots: 5,
  },
  executiveVP: {
    title: 'Executive\nVice President',
    type: EmployeeTypes.manager,
    description: 'Can manage 10 employees',
    count: 3,
    row: 1,
    position: 4,
    managementSlots: 10,
  },
  pricingManager: {
    title: 'Pricing\nManager',
    type: EmployeeTypes.pricingManager,
    description: 'Price -$1',
    count: 12,
    row: 2,
    position: 0,
  },
  luxuriesManager: {
    title: 'Luxuries\nManager',
    type: EmployeeTypes.pricingManager,
    description: 'Price +$10',
    count: 3,
    row: 2,
    position: 1,
  },
  discountManager: {
    title: 'Discount\nManager',
    type: EmployeeTypes.pricingManager,
    description: 'Price -$3',
    count: 6,
    row: 2,
    position: 2,
  },
  recruitingGirl: {
    title: 'Recruiting\nGirl',
    type: EmployeeTypes.humanResources,
    description: 'Hire 1 Person',
    count: 12,
    row: 3,
    position: 0,
  },
  recruitingManager: {
    title: 'Recruiting\nManager',
    type: EmployeeTypes.humanResources,
    description: '2x Hire 1 person\nor $5 less salary',
    count: 6,
    row: 3,
    position: 2,
  },
  hrDirector: {
    title: 'HR\nDirector',
    type: EmployeeTypes.humanResources,
    description: '4x Hire 1 person\nor $5 less salary',
    count: 3,
    row: 3,
    position: 4,
  },
  trainer: {
    title: 'Trainer',
    type: EmployeeTypes.humanResources,
    description: 'Train 1 person',
    count: 12,
    row: 4,
    position: 0,
  },
  coach: {
    title: 'Coach',
    type: EmployeeTypes.humanResources,
    description: '2 training slots.\nMay train the same person two steps',
    count: 6,
    row: 4,
    position: 2,
  },
  guru: {
    title: 'Guru',
    type: EmployeeTypes.humanResources,
    description:
      '3 training slots.\nMay train the same person up to three steps',
    count: 3,
    row: 4,
    position: 3,
  },
  errandBoy: {
    title: 'Errand\nBoy',
    type: EmployeeTypes.drinks,
    description: 'Get 1 drink of\nany type',
    count: 12,
    row: 5,
    position: 0,
  },
  cartOperator: {
    title: 'Cart\nOperator',
    type: EmployeeTypes.drinks,
    description: 'Get 2 drinks from\neach source on route',
    count: 6,
    row: 5,
    position: 1,
  },
  truckDriver: {
    title: 'Truck\nDriver',
    type: EmployeeTypes.drinks,
    description: 'Get 3 drinks from\neach source on route',
    count: 6,
    row: 5,
    position: 2,
  },
  zeppelinPilot: {
    title: 'Zeppelin\nPilot',
    type: EmployeeTypes.drinks,
    description: 'Get 2 drinks from\neach source on route,\nignore roads',
    count: 3,
    row: 5,
    position: 3,
  },
  marketingTrainee: {
    title: 'Marketing\nTrainee',
    type: EmployeeTypes.marketeer,
    description: 'Place billboard\nmax duration 2',
    count: 12,
    row: 6,
    position: 0,
  },
  campaignManager: {
    title: 'Campaign\nManager',
    type: EmployeeTypes.marketeer,
    description: 'Place mailbox or\nlower, max duration 3',
    count: 6,
    row: 6,
    position: 1,
  },
  brandManager: {
    title: 'Brand\nManager',
    type: EmployeeTypes.marketeer,
    description: 'Place airplane or\nlower, max duration 4',
    count: 6,
    row: 6,
    position: 2,
  },
  brandDirector: {
    title: 'Brand\nDirector',
    type: EmployeeTypes.marketeer,
    description: 'Place radio or\nlower, max duration 5',
    count: 3,
    row: 6,
    position: 3,
  },
  kitchenTrainee: {
    title: 'Kitchen\nTrainee',
    type: EmployeeTypes.food,
    description: 'Produce 1 burger\nor 1 pizza',
    count: 12,
    row: 7.5,
    position: 0,
  },
  burgerCook: {
    title: 'Burger\nCook',
    type: EmployeeTypes.food,
    description: 'Produce 3 burgers',
    count: 6,
    row: 7,
    position: 1,
  },
  burgerChef: {
    title: 'Burger\nChef',
    type: EmployeeTypes.food,
    description: 'Produce 8 burgers',
    count: 3,
    row: 7,
    position: 2,
  },
  pizzaCook: {
    title: 'Pizza\nCook',
    type: EmployeeTypes.food,
    description: 'Produce 3 pizzas',
    count: 6,
    row: 8,
    position: 1,
  },
  pizzaChef: {
    title: 'Pizza\nChef',
    type: EmployeeTypes.food,
    description: 'Produce 8 pizzas',
    count: 3,
    row: 8,
    position: 2,
  },
};
