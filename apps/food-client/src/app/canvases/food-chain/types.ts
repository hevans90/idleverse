import { Card } from './card';

export const baseColour = 0xfef4df;
export const lineColour = 0x1c1b15;

export type EmployeeType = {
  colour: number;
};

export const EmployeeTypes: { [key: string]: EmployeeType } = {
  marketeer: { colour: 0x9fc8d0 },
  food: { colour: 0x96a94d },
  drinks: { colour: 0xaecd84 },
  pricingManager: { colour: 0xefa890 },
  trainer: { colour: 0xc8c1be },
  humanResources: { colour: 0xc8c1be },
  manager: { colour: 0x1c1b15 },
  branchManager: { colour: 0xb8312c },
  finance: { colour: 0xbb9ac9 },
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
