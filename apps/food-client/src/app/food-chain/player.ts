import { Card } from './card';

export type Player = {
  cards: Card[];
  food: { [key: number]: number };
  hiresAvailable: number;
};
