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
  orient: string;
  num: string;
};

export type Drink = BoardObject;

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
