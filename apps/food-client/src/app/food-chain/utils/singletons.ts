import * as PIXI from 'pixi.js';
import { Layer } from '@pixi/layers';
import { Anim } from '../animation';
import { Board } from '../board';
import { Card } from '../card';
import { Drawer } from '../drawer';
import { MarketingTile } from '../marketingTile';
import { Phase } from '../phase';
import { Player } from '../player';

export const app = new PIXI.Application({
  transparent: true,
});

export const board: Board = {
  chunksWide: 6,
  chunksHigh: 3,
  tiles: [],
  outerTiles: [],
  roads: [],
  houses: [],
  drinks: [],
  marketingTiles: [],
  diners: [],
  container: new PIXI.Container(),
};

export const mainLayer = new Layer();

export const layers = {
  base: new Layer(),
  main: new Layer(),
  indicator: new Layer(),
  control: new Layer(),
};

export const animations: Anim[] = [];

export const drawers: Drawer[] = [];

export const players: Player[] = [];
export const currentPlayer: { player: Player } = { player: null };

export const ceoCard: { card: Card } = { card: null };

export const cards: Card[] = [];

export const phases: Phase[] = [];
export const currentPhase: { phase: Phase } = { phase: null };

export const marketingTiles: MarketingTile[] = [];

export const keyEventMap: { [key: string]: () => void } = {
  Space: () => {
    console.log('Space bar pressed');
  },
  KeyA: () => {
    console.log('A key pressed');
  },
  KeyD: () => {
    console.log('D key pressed');
  },
};

export const communalDrawers: { [key: string]: Drawer } = {};
