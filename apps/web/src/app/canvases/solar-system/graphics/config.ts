import { SpriteSheetConfig } from './graphics-utils';

export const sunSpriteConfig: SpriteSheetConfig = {
  url: 'sun_sprite_sheet.png',
  cols: 5,
  rows: 12,
  lastRowItemCount: 5,
  animationSpeed: 0.25,
  spriteScale: 0.5,
};

export const earthSpriteConfig: SpriteSheetConfig = {
  url: 'earth_sprite_sheet.png',
  cols: 5,
  rows: 18,
  lastRowItemCount: 1,
  animationSpeed: 0.25,
  spriteScale: 0.25,
};

export const marsSpriteConfig: SpriteSheetConfig = {
  url: 'mars_sprite_sheet.png',
  cols: 5,
  rows: 22,
  lastRowItemCount: 3,
  animationSpeed: 0.25,
  spriteScale: 0.125,
};

export const moonSpriteConfig: SpriteSheetConfig = {
  url: 'moon_sprite_sheet.png',
  cols: 5,
  rows: 24,
  lastRowItemCount: 5,
  animationSpeed: 0.25,
  spriteScale: 0.125,
};
