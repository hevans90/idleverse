import * as PIXI from 'pixi.js';
import { carTexture } from './graphics';
import {
  createAnimatedSprite,
  createAnimatedTexture,
  createSprite,
  SpriteSheetConfig,
} from './graphics-utils';

export const ts = 60;
export const ts1_3 = ts / 8;
export const ts1_2 = ts / 2;
export const ts2_3 = (7 * ts) / 8;
export const rls = 2;
export const tileConfigRegex = /(\w)(\d*)(?:-(\d+))?/;
export const debug = { enabled: false };

export const rotationConstants = {
  0: { i: 1, j: 1 },
  1: { i: -1, j: 1 },
  2: { i: -1, j: -1 },
  3: { i: 1, j: -1 },
};

const postmanSpriteConfig: SpriteSheetConfig = {
  url: 'https://i.imgur.com/FEGPres.png',
  rows: 1,
  cols: 4,
  lastRowItemCount: 4,
  rotation: 0,
  animationSpeed: 0.2,
};

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

export const createCarSprite = () =>
  createSprite(PIXI.Loader.shared.resources['car'].texture, ts);

export const createAnimatedCarSprite = () =>
  createAnimatedSprite(carSpriteConfig, carFrames);

export const defaultZ = {
  house: 20,
  road: 20,
  diner: 20,
  drink: 20,
  marketingTile: 20,
};
