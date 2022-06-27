import { AnimatedSprite, Sprite } from 'pixi.js';

export type Planet = {
  name: string;
  config: PlanetConfig;
  sprite: AnimatedSprite | Sprite;
  parent?: Planet;
  position?: { x: number; y: number };
  scale?: number;
  originalDimensions?: {
    height: number;
    width: number;
  };
};

export type PlanetConfig = {
  id: string;
  radius: number; // km
  origin: { x: number; y: number };
  orbit: { x: number; y: number; speed: number };
};
