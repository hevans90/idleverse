import { AnimatedSprite, Sprite } from 'pixi.js';

export type PlanetConfig = {
  origin: { x: number; y: number };
  orbit: { x: number; y: number; speed: number };
};

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

export const DrawPlanet = (planet: Planet) => {
  planet.sprite.height = planet.originalDimensions.height * planet.scale;
  planet.sprite.width = planet.originalDimensions.width * planet.scale;
  planet.sprite.x = planet.position.x - planet.sprite.height / 2;
  planet.sprite.y = planet.position.y - planet.sprite.width / 2;
};

export const UpdatePlanetPosition = (
  time: number,
  planet: Planet,
  systemOrigin: number,
  systemRange: number
) => {
  const planetPosition = GetPlanetPosition(time, planet);
  planet.position = planetPosition;
  planet.sprite.zIndex = planetPosition.y;
  planet.scale =
    1 +
    Math.tan(((planetPosition.y - systemOrigin) / systemRange) * (Math.PI / 4));
};

export const GetPlanetPosition = (time: number, planet: Planet) => {
  const planetOffset = GetPlanetPositionOffset(time, planet);
  const parentPosition = planet.parent
    ? planet.parent.position
    : { x: 0, y: 0 };
  return {
    x: planet.config.origin.x + planetOffset.x + parentPosition.x,
    y: planet.config.origin.y + planetOffset.y + parentPosition.y,
  };
};

export const GetPlanetPositionOffset = (time: number, planet: Planet) => ({
  x: planet.config.orbit.x * Math.sin(time * planet.config.orbit.speed * 0.002),
  y: planet.config.orbit.y * Math.cos(time * planet.config.orbit.speed * 0.002),
  scale: 1,
});

export const CreatePlanet = ({ name, config, sprite, parent = null }) => {
  return {
    name: name,
    config: config,
    sprite: sprite,
    parent: parent,
    position: config.origin,
    scale: 1,
    originalDimensions: {
      height: sprite.height,
      width: sprite.width,
    },
  };
};
