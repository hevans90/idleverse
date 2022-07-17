import * as PIXI from 'pixi.js';
import { GameConfig } from '../models/game-config';
import { IsometricGraphic } from '../models/isometric-graphic';
import { indexToIso } from '../utils/index-to-iso';

export const initTile = (i: number, j: number, config: GameConfig) => {
  const gr = new PIXI.Graphics() as IsometricGraphic;

  gr.c1 = indexToIso(i + 1 - config.tileGap, j + config.tileGap, config);
  gr.c2 = indexToIso(i + 1 - config.tileGap, j + 1 - config.tileGap, config);
  gr.c3 = indexToIso(i + config.tileGap, j + 1 - config.tileGap, config);
  gr.c4 = indexToIso(i + config.tileGap, j + config.tileGap, config);

  gr.hitArea = new PIXI.Polygon([
    new PIXI.Point(gr.c1[0], gr.c1[1]),
    new PIXI.Point(gr.c2[0], gr.c2[1]),
    new PIXI.Point(gr.c3[0], gr.c3[1]),
    new PIXI.Point(gr.c4[0], gr.c4[1]),
  ]);

  return gr;
};
