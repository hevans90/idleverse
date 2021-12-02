export const baseColour = 0xfef4df;
export const lineColour = 0x1c1b15;

export const EmployeeTypes = {
  marketeer: { color: 0x9fc8d0 },
  food: { color: 0x96a94d },
  drinks: { color: 0xaecd84 },
  pricingManager: { color: 0xefa890 },
  trainer: { color: 0xc8c1be },
  humanResources: { color: 0xc8c1be },
  manager: { color: 0x1c1b15 },
  branchManager: { color: 0xb8312c },
  finance: { color: 0xbb9ac9 },
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

export type Drawer = {
  body: {
    w: number;
    h: number;
  };
  tab;
};

export type Animation = {
  time: number;
  update?: () => void;
};
