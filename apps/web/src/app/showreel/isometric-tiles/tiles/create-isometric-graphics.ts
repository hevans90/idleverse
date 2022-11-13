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

  gr.alpha = 0.2;

  return gr;
};

export const initMapUnderlay = (config: GameConfig) => {
  const gr = new PIXI.Graphics() as IsometricGraphic;

  const diameter = config.mapRadius * 2 + 1;

  gr.c1 = indexToIso(diameter, 0, config);
  gr.c2 = indexToIso(diameter, diameter, config);
  gr.c3 = indexToIso(0, diameter, config);
  gr.c4 = indexToIso(0, 0, config);

  gr.hitArea = new PIXI.Polygon([
    new PIXI.Point(gr.c1[0], gr.c1[1]),
    new PIXI.Point(gr.c2[0], gr.c2[1]),
    new PIXI.Point(gr.c3[0], gr.c3[1]),
    new PIXI.Point(gr.c4[0], gr.c4[1]),
  ]);

  gr.clear();
  gr.beginFill(0);
  gr.moveTo(gr.c1[0], gr.c1[1]);
  gr.lineTo(gr.c2[0], gr.c2[1]);
  gr.lineTo(gr.c3[0], gr.c3[1]);
  gr.lineTo(gr.c4[0], gr.c4[1]);
  gr.endFill();

  // gr.filters = [new OutlineFilter(4, outline as any)];

  return gr;
};
