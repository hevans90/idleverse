import * as PIXI from 'pixi.js';
import { EmployeeType, EmployeeTypes, lineColour, Player } from './types';

export type CardConfig = {
  title: string;
  type: EmployeeType;
  description: string;
  count: number;
  row: number;
  position: number;
};

export type Card = {
  title: string;
  type: EmployeeType;
  description: string;
  count: number;
  row: number;
  position: number;
  owner: Player;
  container?: PIXI.Container;
  countText?: PIXI.Text;
  onClick?: () => void;
};

export const createCardSprite = (cardConfig: CardConfig) => {
  const cardContainer = new PIXI.Container();

  const cardGraphic = new PIXI.Graphics();
  cardGraphic.beginFill(lineColour);
  cardGraphic.drawRoundedRect(0, 0, 200, 72, 12);
  cardGraphic.endFill();

  cardGraphic.beginFill(cardConfig.type.colour);
  cardGraphic.drawRoundedRect(0, 56, 200, 136, 12);
  cardGraphic.endFill();

  cardGraphic.beginFill(lineColour);
  cardGraphic.drawRect(0, 56, 200, 12);
  cardGraphic.endFill();

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
      fill: lineColour,
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
    description: '',
    count: 18,
    row: 1,
    position: 0,
  },
  juniorVP: {
    title: 'Junior\nVice President',
    type: EmployeeTypes.manager,
    description: '',
    count: 6,
    row: 1,
    position: 1,
  },
  VP: {
    title: 'Vice\nPresident',
    type: EmployeeTypes.manager,
    description: '',
    count: 6,
    row: 1,
    position: 2,
  },
  seniorVP: {
    title: 'Senior\nVice President',
    type: EmployeeTypes.manager,
    description: '',
    count: 6,
    row: 1,
    position: 3,
  },
  executiveVP: {
    title: 'Executive\nVice President',
    type: EmployeeTypes.manager,
    description: '',
    count: 3,
    row: 1,
    position: 4,
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