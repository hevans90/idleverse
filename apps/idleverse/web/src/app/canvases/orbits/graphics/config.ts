import { SpriteSheetConfig } from './graphics-utils';

export const sunSpriteConfig: SpriteSheetConfig = {
  name: 'sun',
  url: 'spritesheets/sun_sprite_sheet.png',
  cols: 5,
  rows: 12,
  lastRowItemCount: 5,
  animationSpeed: 0.25,
  spriteScale: 0.5,
};

export const earthSpriteConfig: SpriteSheetConfig = {
  name: 'earth',
  url: 'spritesheets/earth_sprite_sheet.png',
  cols: 5,
  rows: 18,
  lastRowItemCount: 1,
  animationSpeed: 0.25,
  spriteScale: 0.25,
};

export const marsSpriteConfig: SpriteSheetConfig = {
  name: 'mars',
  url: 'spritesheets/mars_sprite_sheet.png',
  cols: 5,
  rows: 22,
  lastRowItemCount: 3,
  animationSpeed: 0.25,
  spriteScale: 0.125,
};

export const moonSpriteConfig: SpriteSheetConfig = {
  name: 'moon',
  url: 'spritesheets/moon_sprite_sheet.png',
  cols: 5,
  rows: 24,
  lastRowItemCount: 5,
  animationSpeed: 0.25,
  spriteScale: 0.125,
};

export const spriteConfigs = [
  sunSpriteConfig,
  earthSpriteConfig,
  marsSpriteConfig,
  moonSpriteConfig,
];
