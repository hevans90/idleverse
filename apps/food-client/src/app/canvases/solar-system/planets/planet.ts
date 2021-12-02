import { AnimatedSprite, Sprite } from 'pixi.js';

type Vector2D = { x: number; y: number };

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

export const DrawPlanet = (
  planet: Planet,
  systemOrigin: Vector2D,
  viewDistance: number,
  viewAngle: number
) => {
  planet.sprite.zIndex = planet.position.y;
  planet.scale = horizontalScaleFactor(
    planet.position,
    systemOrigin,
    viewAngle,
    viewDistance
  );
  planet.sprite.height = planet.originalDimensions.height * planet.scale;
  planet.sprite.width = planet.originalDimensions.width * planet.scale;
  const drawPosition = transformPosition(
    planet.position,
    systemOrigin,
    viewDistance,
    viewAngle
  );
  planet.sprite.x = drawPosition.x - planet.sprite.height / 2;
  planet.sprite.y = drawPosition.y - planet.sprite.width / 2;
};

export const UpdatePlanetPosition = (
  time: number,
  planet: Planet,
  simulationSpeed: number
) => {
  const planetOffset = GetPlanetPositionOffset(time, planet, simulationSpeed);
  const parentPosition = planet.parent
    ? planet.parent.position
    : { x: 0, y: 0 };
  planet.position = {
    x: planet.config.origin.x + planetOffset.x + parentPosition.x,
    y: planet.config.origin.y + planetOffset.y + parentPosition.y,
  };
};

export const horizontalScaleFactor = (
  position: Vector2D,
  systemOrigin: Vector2D,
  viewAngle: number,
  viewDistance: number
) => {
  const y = systemOrigin.y - position.y;
  return 1000 / (viewDistance + Math.sin(viewAngle) * y);
};

export const verticalScaleFactor = (
  position: Vector2D,
  systemOrigin: Vector2D,
  viewAngle: number,
  viewDistance: number
) => {
  const x = systemOrigin.x - position.x;
  const y = systemOrigin.y - position.y;
  return (
    (1000 / (viewDistance + Math.sin(viewAngle) * x)) * Math.cos(viewAngle)
  );
};

export const transformPosition = (
  position: { x: number; y: number },
  systemOrigin: Vector2D,
  viewDistance: number,
  viewAngle: number
) => {
  return {
    x:
      systemOrigin.x +
      (position.x - systemOrigin.x) *
        horizontalScaleFactor(position, systemOrigin, viewAngle, viewDistance),
    y:
      systemOrigin.y +
      (position.y - systemOrigin.y) *
        verticalScaleFactor(position, systemOrigin, viewAngle, viewDistance),
  };
};

export const GetPlanetPositionOffset = (
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
