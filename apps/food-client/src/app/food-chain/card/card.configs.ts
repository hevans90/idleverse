import { FoodKind, foodKinds } from '../food';
import { MarketingTileKind, marketingTileKinds } from '../marketingTile';
import { EmployeeType, EmployeeTypes } from '../types';

export type CardConfig = {
  kind?: keyof typeof cardConfigs;
  title: string;
  type: EmployeeType;
  description: string;
  promotesFrom?: string;
  count?: number;
  row?: number;
  position?: number;
  range?: number;
  maxHires?: number;
  maxTrains?: number;
  maxDuration?: number;
  marketingKinds?: MarketingTileKind[];
  managementSlots?: number;
  foodKinds?: FoodKind[];
  foodQuantity?: number;
};

export const emptyCardKind = 'emptyCard';

export const ceoCardConfig: CardConfig = {
  title: 'CEO',
  type: EmployeeTypes.manager,
  description: 'This is you!',
  managementSlots: 3,
  maxHires: 1,
};

export const emptyCardConfig: CardConfig = {
  kind: emptyCardKind,
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
    promotesFrom: 'managementTrainee',
  },
  localManager: {
    title: 'Local\nManager',
    type: EmployeeTypes.branchManager,
    description: 'Place new restaurant,\n"COMING SOON".\nDrive-in available',
    count: 6,
    row: 0,
    position: 2,
    promotesFrom: 'juniorVP',
  },
  regionalManager: {
    title: 'Regional\nManager',
    type: EmployeeTypes.branchManager,
    description:
      'Place or move\nrestaurant, opens\nimmediately.\nDrive-in available',
    count: 3,
    row: 0,
    position: 3,
    promotesFrom: 'VP',
  },
  cfo: {
    title: 'CFO',
    type: EmployeeTypes.finance,
    description: 'Add +50% to cash\nearned this round',
    count: 3,
    row: 0,
    position: 4,
    promotesFrom: 'seniorVP',
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
    promotesFrom: 'managementTrainee',
  },
  VP: {
    title: 'Vice\nPresident',
    type: EmployeeTypes.manager,
    description: 'Can manage 4 employees',
    count: 6,
    row: 1,
    position: 2,
    managementSlots: 4,
    promotesFrom: 'juniorVP',
  },
  seniorVP: {
    title: 'Senior\nVice President',
    type: EmployeeTypes.manager,
    description: 'Can manage 5 employees',
    count: 6,
    row: 1,
    position: 3,
    managementSlots: 5,
    promotesFrom: 'VP',
  },
  executiveVP: {
    title: 'Executive\nVice President',
    type: EmployeeTypes.manager,
    description: 'Can manage 10 employees',
    count: 3,
    row: 1,
    position: 4,
    managementSlots: 10,
    promotesFrom: 'seniorVP',
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
    promotesFrom: 'managementTrainee',
  },
  discountManager: {
    title: 'Discount\nManager',
    type: EmployeeTypes.pricingManager,
    description: 'Price -$3',
    count: 6,
    row: 2,
    position: 2,
    promotesFrom: 'juniorVP',
  },
  recruitingGirl: {
    title: 'Recruiting\nGirl',
    type: EmployeeTypes.humanResources,
    description: 'Hire 1 Person',
    count: 12,
    row: 3,
    position: 0,
    maxHires: 1,
  },
  recruitingManager: {
    title: 'Recruiting\nManager',
    type: EmployeeTypes.humanResources,
    description: '2x Hire 1 person\nor $5 less salary',
    count: 6,
    row: 3,
    position: 2,
    promotesFrom: 'juniorVP',
    maxHires: 2,
  },
  hrDirector: {
    title: 'HR\nDirector',
    type: EmployeeTypes.humanResources,
    description: '4x Hire 1 person\nor $5 less salary',
    count: 3,
    row: 3,
    position: 4,
    promotesFrom: 'seniorVP',
    maxHires: 4,
  },
  trainer: {
    title: 'Trainer',
    type: EmployeeTypes.humanResources,
    description: 'Train 1 person',
    count: 12,
    row: 4,
    position: 0,
    maxTrains: 1,
  },
  coach: {
    title: 'Coach',
    type: EmployeeTypes.humanResources,
    description: '2 training slots.\nMay train the same person two steps',
    count: 6,
    row: 4,
    position: 2,
    promotesFrom: 'juniorVP',
    maxTrains: 2,
  },
  guru: {
    title: 'Guru',
    type: EmployeeTypes.humanResources,
    description:
      '3 training slots.\nMay train the same person up to three steps',
    count: 3,
    row: 4,
    position: 3,
    promotesFrom: 'VP',
    maxTrains: 3,
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
    range: 10,
    promotesFrom: 'errandBoy',
  },
  truckDriver: {
    title: 'Truck\nDriver',
    type: EmployeeTypes.drinks,
    description: 'Get 3 drinks from\neach source on route',
    count: 6,
    row: 5,
    position: 2,
    range: 15,
    promotesFrom: 'cartOperator',
  },
  zeppelinPilot: {
    title: 'Zeppelin\nPilot',
    type: EmployeeTypes.drinks,
    description: 'Get 2 drinks from\neach source on route,\nignore roads',
    count: 3,
    row: 5,
    position: 3,
    promotesFrom: 'truckDriver',
  },
  marketingTrainee: {
    title: 'Marketing\nTrainee',
    type: EmployeeTypes.marketeer,
    description: 'Place billboard\nmax duration 2',
    count: 12,
    row: 6,
    position: 0,
    maxDuration: 2,
    marketingKinds: [marketingTileKinds.billboard],
  },
  campaignManager: {
    title: 'Campaign\nManager',
    type: EmployeeTypes.marketeer,
    description: 'Place mailbox or\nlower, max duration 3',
    count: 6,
    row: 6,
    position: 1,
    promotesFrom: 'marketingTrainee',
    maxDuration: 3,
    marketingKinds: [marketingTileKinds.billboard, marketingTileKinds.mailbox],
  },
  brandManager: {
    title: 'Brand\nManager',
    type: EmployeeTypes.marketeer,
    description: 'Place airplane or\nlower, max duration 4',
    count: 6,
    row: 6,
    position: 2,
    promotesFrom: 'campaignManager',
    maxDuration: 4,
    marketingKinds: [
      marketingTileKinds.billboard,
      marketingTileKinds.mailbox,
      marketingTileKinds.airplane,
    ],
  },
  brandDirector: {
    title: 'Brand\nDirector',
    type: EmployeeTypes.marketeer,
    description: 'Place radio or\nlower, max duration 5',
    count: 3,
    row: 6,
    position: 3,
    promotesFrom: 'brandManager',
    maxDuration: 5,
    marketingKinds: [
      marketingTileKinds.billboard,
      marketingTileKinds.mailbox,
      marketingTileKinds.airplane,
      marketingTileKinds.radio,
    ],
  },
  kitchenTrainee: {
    title: 'Kitchen\nTrainee',
    type: EmployeeTypes.food,
    description: 'Produce 1 burger\nor 1 pizza',
    count: 12,
    row: 7.5,
    position: 0,
    foodKinds: [foodKinds.burger, foodKinds.pizza],
    foodQuantity: 1,
  },
  burgerCook: {
    title: 'Burger\nCook',
    type: EmployeeTypes.food,
    description: 'Produce 3 burgers',
    count: 6,
    row: 7,
    position: 1,
    promotesFrom: 'kitchenTrainee',
    foodKinds: [foodKinds.burger],
    foodQuantity: 3,
  },
  burgerChef: {
    title: 'Burger\nChef',
    type: EmployeeTypes.food,
    description: 'Produce 8 burgers',
    count: 3,
    row: 7,
    position: 2,
    promotesFrom: 'burgerCook',
    foodKinds: [foodKinds.burger],
    foodQuantity: 8,
  },
  pizzaCook: {
    title: 'Pizza\nCook',
    type: EmployeeTypes.food,
    description: 'Produce 3 pizzas',
    count: 6,
    row: 8,
    position: 1,
    promotesFrom: 'kitchenTrainee',
    foodKinds: [foodKinds.pizza],
    foodQuantity: 3,
  },
  pizzaChef: {
    title: 'Pizza\nChef',
    type: EmployeeTypes.food,
    description: 'Produce 8 pizzas',
    count: 3,
    row: 8,
    position: 2,
    promotesFrom: 'pizzaCook',
    foodKinds: [foodKinds.pizza],
    foodQuantity: 8,
  },
};

Object.entries(cardConfigs).forEach((config) => {
  config[1].kind = config[0];
});
