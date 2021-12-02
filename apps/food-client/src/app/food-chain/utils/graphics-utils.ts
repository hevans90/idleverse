import * as PIXI from 'pixi.js';
import { translateObject } from '../animation';
import { BoardObject } from '../board';
import { createCarSprite, ts, ts1_2 } from './constants';
import { board, mainLayer } from './singletons';
import { Vector2 } from './utils';

export type SpriteSheetConfig = {
  url: string;
  cols: number;
  rows: number;
  rotation: number;
  lastRowItemCount: number;
  animationSpeed: number;
};

export const createAnimatedTexture = (conf: SpriteSheetConfig) => {
  const sheet = PIXI.BaseTexture.from(conf.url);
  const frames: PIXI.Texture[] = [];
  const rowSpacing = sheet.width / conf.cols;
  const colSpacing = sheet.height / conf.rows;

  for (let j = 0; j < conf.rows; j++) {
    for (let i = 0; i < conf.cols; i++) {
      if (!(j === conf.rows - 1 && i > conf.lastRowItemCount - 1)) {
        const texture = new PIXI.Texture(
          sheet,
          new PIXI.Rectangle(
            rowSpacing * i,
            colSpacing * j,
            rowSpacing,
            colSpacing
          )
        );
        //texture.rotate = conf.rotation;
        frames.push(texture);
      }
    }
  }
  return frames;
};

export const createSprite = (texture: PIXI.Texture, size: number) => {
  const sprite = new PIXI.Sprite(texture);
  const xScale = size / sprite.height;
  const yScale = size / sprite.width;
  const scale = xScale < yScale ? yScale : xScale;
  sprite.scale.x = sprite.scale.y = scale;
  return sprite;
};

export const createAnimatedSprite = (
  conf: SpriteSheetConfig,
  frames: PIXI.Texture[]
) => {
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

export const addCarToBoard = () => {
  const container = new PIXI.Container();
  const sprite = createCarSprite();
  board.container.addChild(sprite);
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  const scaleFactor = ts / sprite.height;
  sprite.scale.x = scaleFactor;
  sprite.scale.y = scaleFactor;
  container.addChild(sprite);
  board.container.addChild(container);
  container.parentLayer = mainLayer;
  return { container: container, sprite: sprite };
};

export const setSpriteZOrder = (
  container: PIXI.DisplayObject,
  item1: BoardObject,
  item2: BoardObject
) => {
  container.zOrder =
    item1.container.zOrder > item2.container.zOrder
      ? item1.container.zOrder + 1
      : item2.container.zOrder + 1;
};

export const travelPath = async (
  path: BoardObject[],
  container: PIXI.Container,
  sprite: PIXI.Sprite,
  stepDuration: number
) => {
  for (let i = 0; i < path.length - 1; i++) {
    const item1 = path[i];
    const item2 = path[i + 1];
    if (item1 !== item2)
      sprite.rotation = Math.atan2(
        item2.container.position.y - item1.container.position.y,
        item2.container.position.x - item1.container.position.x
      );
    setSpriteZOrder(container, item1, item2);
    await translateObject(
      container,
      {
        x: item1.container.position.x + ts1_2,
        y: item1.container.position.y + ts1_2,
      },
      {
        x: item2.container.position.x + ts1_2,
        y: item2.container.position.y + ts1_2,
      },
      stepDuration
    );
  }
};
