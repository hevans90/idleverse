import { Card } from './card';

export const baseColour = 0xfef4df;
export const lineColour = 0x1c1b15;

export type EmployeeType = {
  topColour: number;
  bottomColour: number;
  textColour?: number;
  borderColor?: number;
  topAlpha?: number;
  bottomAlpha?: number;
};

export const EmployeeTypes: { [key: string]: EmployeeType } = {
  marketeer: {
    topColour: lineColour,
    bottomColour: 0x9fc8d0,
    textColour: 0x1c1b15,
    borderColor: 0x1c1b15,
  },
  food: {
    topColour: lineColour,
    bottomColour: 0x96a94d,
    textColour: 0x1c1b15,
    borderColor: 0x1c1b15,
  },
  drinks: {
    topColour: lineColour,
    bottomColour: 0xaecd84,
    textColour: 0x1c1b15,
    borderColor: 0x1c1b15,
  },
  pricingManager: {
    topColour: lineColour,
    bottomColour: 0xefa890,
    textColour: 0x1c1b15,
    borderColor: 0x1c1b15,
  },
  trainer: {
    topColour: lineColour,
    bottomColour: 0xc8c1be,
    textColour: 0x1c1b15,
    borderColor: 0x1c1b15,
  },
  humanResources: {
    topColour: lineColour,
    bottomColour: 0xc8c1be,
    textColour: 0x1c1b15,
    borderColor: 0x1c1b15,
  },
  manager: {
    topColour: lineColour,
    bottomColour: 0x1c1b15,
    textColour: 0xffffff,
    borderColor: 0x1c1b15,
  },
  branchManager: {
    topColour: lineColour,
    bottomColour: 0xb8312c,
    textColour: 0x1c1b15,
    borderColor: 0x1c1b15,
  },
  finance: {
    topColour: lineColour,
    bottomColour: 0xbb9ac9,
    textColour: 0x1c1b15,
    borderColor: 0x1c1b15,
  },
  empty: {
    topColour: 0xe9eff7,
    bottomColour: 0xe9eff7,
    borderColor: 0xcce3ff,
    textColour: 0x1c1b15,
  },
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
