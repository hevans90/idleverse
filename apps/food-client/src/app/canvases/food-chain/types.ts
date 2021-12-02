import { Card } from './card';

export const baseColour = 0xfef4df;
export const lineColour = 0x1c1b15;

export type EmployeeType = {
  bgColour: number;
  textColour: number;
};

export const EmployeeTypes: { [key: string]: EmployeeType } = {
  marketeer: { bgColour: 0x9fc8d0, textColour: 0x1c1b15 },
  food: { bgColour: 0x96a94d, textColour: 0x1c1b15 },
  drinks: { bgColour: 0xaecd84, textColour: 0x1c1b15  },
  pricingManager: { bgColour: 0xefa890, textColour: 0x1c1b15  },
  trainer: { bgColour: 0xc8c1be, textColour: 0x1c1b15  },
  humanResources: { bgColour: 0xc8c1be, textColour: 0x1c1b15  },
  manager: { bgColour: 0x1c1b15, textColour: 0xffffff  },
  branchManager: { bgColour: 0xb8312c, textColour: 0x1c1b15  },
  finance: { bgColour: 0xbb9ac9, textColour: 0x1c1b15  },
};

export type BoardObject = {
  name?: string;
  i: number;
  j: number;
  w: number;
  h: number;
};

export type Road = BoardObject & {
  connections?: number[];
};

export type House = BoardObject & {
  orient: number;
  num: number;
};

export type Drink = BoardObject;

export type BoardItems = {
  roads: Road[];
  houses: House[];
  drinks: Drink[];
};

export type Diner = BoardObject & {
  time?: number;
  duration?: number;
  previousPosition?: number;
  nextPosition?: number;
  update?: () => void;
};

export type Player = {
  cards: Card[];
  hiresAvailable: number;
};

export type Animation = {
  time: number;
  update?: () => void;
};
