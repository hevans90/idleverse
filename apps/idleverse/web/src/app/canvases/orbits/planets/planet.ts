import { AnimatedSprite, Sprite } from 'pixi.js';

export type PlanetConfig = {
  mass: number;
  theta: number;
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

export const drawPlanet = (planet: Planet) => {
  planet.sprite.zIndex = planet.position.y;
  planet.sprite.height = planet.originalDimensions.height * planet.scale;
  planet.sprite.width = planet.originalDimensions.width * planet.scale;
  planet.sprite.x = planet.position.x - planet.sprite.height / 2;
  planet.sprite.y = planet.position.y - planet.sprite.width / 2;
};

export const updatePlanetPosition = (
  time: number,
  planet: Planet,
  simulationSpeed: number
) => {
  const relativePosition = getPlanetPositionRelativeToParent(
    time,
    planet,
    simulationSpeed
  );
  const parentPosition = planet.parent
    ? planet.parent.position
    : { x: 0, y: 0 };
  planet.position = {
    x: parentPosition.x + planet.config.origin.x + relativePosition.x,
    y: parentPosition.y + planet.config.origin.y + relativePosition.y,
  };
};

// Calculates planets position relative to its parent's position
export const getPlanetPositionRelativeToParent = (
  time: number,
  planet: Planet,
  simulationSpeed: number
) => ({
  x:
    planet.config.orbit.x *
    Math.sin(
      time * planet.config.orbit.speed * 0.002 * simulationSpeed +
        planet.config.theta
    ),
  y:
    planet.config.orbit.y *
    Math.cos(
      time * planet.config.orbit.speed * 0.002 * simulationSpeed +
        planet.config.theta
    ),
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
  sprite: AnimatedSprite;
  parent?: Planet;
}) => ({
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
