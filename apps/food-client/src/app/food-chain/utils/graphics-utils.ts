import * as PIXI from 'pixi.js';
import { Vector2 } from './utils';

export type SpriteSheetConfig = {
  url: string;
  cols: number;
  rows: number;
  lastRowItemCount: number;
  animationSpeed: number;
};

export const CreateAnimatedSprite = (conf: SpriteSheetConfig) => {
  const sheet = PIXI.BaseTexture.from(conf.url);
  const frames = [];
  const rowSpacing = sheet.width / conf.cols;
  const colSpacing = sheet.height / conf.rows;

  for (let j = 0; j < conf.rows; j++) {
    for (let i = 0; i < conf.cols; i++) {
      if (!(j === conf.rows - 1 && i > conf.lastRowItemCount - 1)) {
        frames.push(
          new PIXI.Texture(
            sheet,
            new PIXI.Rectangle(
              rowSpacing * i,
              colSpacing * j,
              rowSpacing,
              colSpacing
            )
          )
        );
      }
    }
  }
  const sprite = new PIXI.AnimatedSprite(frames);
  sprite.animationSpeed = conf.animationSpeed;
  return sprite;
};

export const drawLine = (
  graphic: PIXI.Graphics,
  start: Vector2,
  end: Vector2
) => {
  graphic.moveTo(start.x, start.y);
  graphic.lineTo(end.x, end.y);
};

export const drawDottedLine = (
  graphic: PIXI.Graphics,
  start: Vector2,
  end: Vector2,
  sections: number
) => {
  const step = sections * 2 + (sections - 1) * 2 + 2;
  const xStep = (end.x - start.x) / step;
  const yStep = (end.y - start.y) / step;
  graphic.moveTo(start.x + xStep, start.y + yStep);
  for (let i = 0; i < step; i += 1) {
    if (i % 4 > 1) graphic.lineTo(start.x + xStep * i, start.y + yStep * i);
    else graphic.moveTo(start.x + xStep * i, start.y + yStep * i);
  }
};
