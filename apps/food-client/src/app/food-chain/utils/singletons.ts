import * as PIXI from 'pixi.js';
import { Anim } from '../animation';
import { Board } from '../board';
import { Card } from '../card';
import { Drawer } from '../drawer';
import { MarketingTile } from '../marketingTile';
import { Phase } from '../phase';

export const app = new PIXI.Application({
  transparent: true,
});

export const animations: Anim[] = [];

export const drawers: Drawer[] = [];

export const ceoCard: { card: Card } = { card: null };

export const cards: Card[] = [];

export const phases: Phase[] = [];

export const currentPhase: { phase: Phase } = { phase: null };

export const marketingTiles: MarketingTile[] = [];

export const board: Board = {
  chunksWide: 5,
  chunksHigh: 4,
  tiles: [],
  outerTiles: [],
  roads: [],
  houses: [],
  drinks: [],
  marketingTiles: [],
  diner: null,
  container: new PIXI.Container(),
};

export const keyEventMap = {
  Space: () => {
    console.log('Space bar pressed');
  },
};
