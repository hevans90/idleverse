import { OutlineFilter } from '@pixi/filter-outline';
import * as PIXI from 'pixi.js';
import { GameConfig } from '../models/game-config';
import { IsometricGraphic } from '../models/isometric-graphic';
import { IsometricStack } from '../models/isometric-stack';
import { getTileGraphic } from '../utils/get-tile-graphic';
import { indexToIso } from '../utils/index-to-iso';

export const setGraphicTileColor = (
  tileGraphic: IsometricGraphic,
  color: string,
  alpha = 1
) => {
  tileGraphic.clear();

  tileGraphic.color = color;
  tileGraphic.beginFill(tileGraphic.color as any, alpha);

  tileGraphic.moveTo(tileGraphic.c1[0], tileGraphic.c1[1]);
  tileGraphic.lineTo(tileGraphic.c2[0], tileGraphic.c2[1]);
  tileGraphic.lineTo(tileGraphic.c3[0], tileGraphic.c3[1]);
  tileGraphic.lineTo(tileGraphic.c4[0], tileGraphic.c4[1]);

  tileGraphic.endFill();
};

export const setTileOutline = (
  tileGraphic: IsometricGraphic,
  color: string
) => {
  tileGraphic.filters = [new OutlineFilter(4, color as any) as any];
};

export const removeTileOutline = (tileGraphic: IsometricGraphic) => {
  if (tileGraphic) {
    tileGraphic.filters = [];
  } else {
    console.warn('Tried to remove outline of a tile that does not exist.');
  }
};

export const setTile = (
  i: number,
  j: number,
  layer: PIXI.Container,
  config: GameConfig,
  stack: IsometricStack,
  color: string,
  selectedColor: string,
  alpha = 1
) => {
  let tileGraphic: IsometricGraphic;
  const { tileGap } = config;

  try {
    tileGraphic = getTileGraphic(i, j, layer, config);
    tileGraphic.c1 = indexToIso(i + 1 - tileGap, j + tileGap, config);
    tileGraphic.c2 = indexToIso(i + 1 - tileGap, j + 1 - tileGap, config);
    tileGraphic.c3 = indexToIso(i + tileGap, j + 1 - tileGap, config);
    tileGraphic.c4 = indexToIso(i + tileGap, j + tileGap, config);

    setGraphicTileColor(tileGraphic, color, alpha);
    if (stack && stack.selected) {
      if (stack.selected.i === i && stack.selected.j === j) {
        setGraphicTileColor(tileGraphic, selectedColor);
      }
    }
  } catch (e) {
    console.warn(e);
  }
};
