import { AnimatedSprite, Sprite } from 'pixi.js';
import { Vector2D } from '../../../_state/models';

export type PlanetConfig = {
  id: string;
  radius: number; // km
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

export const drawPlanet = (
  planet: Planet,
  systemOrigin: Vector2D,
  isOriginCelestial = false
) => {
  planet.sprite.height = planet.originalDimensions.height * planet.scale;
  planet.sprite.width = planet.originalDimensions.width * planet.scale;

  const drawPosition = transformPosition(planet.position, systemOrigin);
  planet.sprite.x = isOriginCelestial
    ? drawPosition.x - planet.sprite.height / 2
    : drawPosition.x;
  planet.sprite.y = isOriginCelestial
    ? drawPosition.y - planet.sprite.width / 2
    : drawPosition.y;
};

export const updatePlanetPosition = (
  time: number,
  planet: Planet,
  simulationSpeed: number
) => {
  const planetOffset = getPlanetPositionOffset(time, planet, simulationSpeed);
  const parentPosition = planet.parent
    ? planet.parent.position
    : { x: 0, y: 0 };
  planet.position = {
    x: planet.config.origin.x + planetOffset.x + parentPosition.x,
    y: planet.config.origin.y + planetOffset.y + parentPosition.y,
  };
};

export const transformPosition = (
  position: { x: number; y: number },
  systemOrigin: Vector2D
) => {
  return {
    x: systemOrigin.x + (position.x - systemOrigin.x),
    y: systemOrigin.y + (position.y - systemOrigin.y),
  };
};

export const getPlanetPositionOffset = (
  time: number,
  planet: Planet,
  simulationSpeed: number
) => ({
  x:
    planet.config.orbit.x *
    Math.sin(time * planet.config.orbit.speed * 0.002 * simulationSpeed),
  y:
    planet.config.orbit.y *
    Math.cos(time * planet.config.orbit.speed * 0.002 * simulationSpeed),
  scale: 1,
});

export const createPlanet = ({
  name,
  config,
  sprite,
  parent = null,
}: {
  name: string;
  config: PlanetConfig;
  sprite: AnimatedSprite | Sprite;
  parent?: Planet;
}): Planet => ({
  name,
  config,
  sprite,
  parent,
  position: config.origin,
  scale: 1,
  originalDimensions: {
    height: sprite.height,
    width: sprite.width,
  },
});
