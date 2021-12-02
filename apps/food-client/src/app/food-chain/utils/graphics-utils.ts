import * as PIXI from 'pixi.js';
import { GlowFilter } from '@pixi/filter-glow';
import { scaleObject, translateObject } from '../animation';
import { BaseObject, BoardObject, getAdjacentDrinks } from '../board';
import { ts, ts1_2 } from './constants';
import { board, mainLayer } from './singletons';
import { Vector2 } from './utils';
import { Card } from '../card/card';
import { playProduceAnimation } from '../card/card.animations';
import { Diner } from '../diner';

export type SpriteSheetConfig = {
  url: string;
  cols: number;
  rows: number;
  rotation: number;
  lastRowItemCount: number;
  animationSpeed: number;
};

export const addGlow = (container: PIXI.Container) => {
  container.filters = [new GlowFilter({ distance: 30, outerStrength: 2 })];
};

export const darken = (container: PIXI.Container) => {
  const colorMatrix = new PIXI.filters.ColorMatrixFilter();
  container.filters = [colorMatrix];
  colorMatrix.brightness(0.5, false);
};

export const greyOut = (card: Card) => {
  card.sprite.alpha = 0.25;
  const bwFilter = new PIXI.filters.ColorMatrixFilter();
  bwFilter.blackAndWhite(false);
  card.container.filters = [bwFilter];
};

export const drawArrow = (card1: Card, card2: Card) => {
  //containers
  const c1 = card1.container;
  const c2 = card2.container;
  //midpoints
  const mx = c1.x + c1.width + ((c2.x - (c1.x + c1.width)) * 3) / 4;
  const my1 = c1.y + c1.height / 2;
  const my2 = c2.y + c2.height / 2;
  //graphic
  const arrow = new PIXI.Graphics();
  arrow.lineStyle(4, 0x0, 1);
  drawLine(arrow, { x: c1.x + c1.width, y: my1 }, { x: mx, y: my1 });
  drawLine(arrow, { x: mx, y: my1 }, { x: mx, y: my2 });
  drawLine(arrow, { x: mx, y: my2 }, { x: c2.x, y: my2 });
  return arrow;
};

export const createSprite = (spriteName: string, size: number) => {
  const sprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources[spriteName].texture
  );
  const xScale = size / sprite.height;
  const yScale = size / sprite.width;
  const scale = xScale > yScale ? yScale : xScale;
  sprite.scale.x = sprite.scale.y = scale;
  return sprite;
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

export const createAnimatedSprite = (
  conf: SpriteSheetConfig,
  frames: PIXI.Texture[]
) => {
  const sprite = new PIXI.AnimatedSprite(frames);
  sprite.animationSpeed = conf.animationSpeed;
  return sprite;
};

const postmanSpriteConfig: SpriteSheetConfig = {
  url: 'https://i.imgur.com/FEGPres.png',
  rows: 1,
  cols: 4,
  lastRowItemCount: 4,
  rotation: 0,
  animationSpeed: 0.2,
};

export const createAnimatedCarSprite = () =>
  createAnimatedSprite(carSpriteConfig, carFrames);

export const postmanFrames = createAnimatedTexture(postmanSpriteConfig);
export const createPostmanSprite = () =>
  createAnimatedSprite(postmanSpriteConfig, postmanFrames);

const carSpriteConfig: SpriteSheetConfig = {
  url: 'https://i.imgur.com/XUbpirS.png',
  rows: 1,
  cols: 2,
  lastRowItemCount: 2,
  rotation: Math.PI / 2,
  animationSpeed: 0.2,
};

const carFrames = createAnimatedTexture(carSpriteConfig);

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

export const addSpriteToBoard = (spriteName: string, size: number) => {
  const sprite = createSprite(spriteName, size);
  board.container.addChild(sprite);
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  const container = new PIXI.Container();
  container.addChild(sprite);
  container.parentLayer = mainLayer;
  board.container.addChild(container);

  return { container: container, sprite: sprite };
};

export const setSpriteZOrder = (
  container: PIXI.DisplayObject,
  item1: BoardObject,
  item2: BoardObject = null
) => {
  if (!item2) container.zOrder = item1.container.zOrder + 1;
  else
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
    setSpriteZOrder(container, item1);
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

export const driveDrinksPath = async (diner: Diner, driver: Card) => {
  console.log('Driving drinks path');
  const player = diner.owner;
  const collectedDrinks = [];
  if (diner.drinksPath.length > 1) {
    const truck = addSpriteToBoard('truck', ts * 2);
    const firstRoad = diner.drinksPath[0];
    truck.container.x = firstRoad.container.x + ts1_2;
    truck.container.y = firstRoad.container.y + ts1_2;
    setSpriteZOrder(truck.container, firstRoad, firstRoad);
    await scaleObject(truck.sprite, 0, truck.sprite.scale.x, 50);
    for (let i = 0; i < diner.drinksPath.length - 1; i++) {
      if (i < driver.range) {
        const item1 = diner.drinksPath[i];
        const item2 = diner.drinksPath[i + 1];
        if (item1 !== item2)
          truck.sprite.rotation = Math.atan2(
            item2.container.position.y - item1.container.position.y,
            item2.container.position.x - item1.container.position.x
          );
        await translateObject(
          truck.container,
          {
            x: item1.container.position.x + ts1_2,
            y: item1.container.position.y + ts1_2,
          },
          {
            x: item2.container.position.x + ts1_2,
            y: item2.container.position.y + ts1_2,
          },
          20
        );
        const drinks = getAdjacentDrinks(item2);
        for (let j = 0; j < drinks.length; j++) {
          const drink = drinks[j];
          if (!collectedDrinks.includes(drink)) {
            collectedDrinks.push(drink);
            await playProduceAnimation(player, drink.container, drink.kind);
            await playProduceAnimation(player, drink.container, drink.kind);
            await playProduceAnimation(player, drink.container, drink.kind);
          }
        }
      }
    }
    await scaleObject(truck.sprite, truck.sprite.scale.x, 0, 50);
    board.container.removeChild(truck.container, truck.sprite);
  }
};

export const deactivate = (object: BaseObject) => {
  object.container.interactive = false;
  object.container.buttonMode = false;
  object.container.removeAllListeners();
};
