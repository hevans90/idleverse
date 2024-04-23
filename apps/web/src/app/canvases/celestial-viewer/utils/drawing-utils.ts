import {
  AnimatedSprite,
  Application,
  Graphics,
  Matrix,
  Resource,
  Sprite,
  Texture,
} from 'pixi.js';

import { Planet, PlanetConfig } from '../models';

export const buildPlanet = ({
  planetTexture,
  radius,
  app,
  name,
  id,
  selectionFunction,
  initialScale = { x: 0.3, y: 0.3 },
  sun,
}: {
  planetTexture: Texture<Resource>;
  radius: number;
  app: Application;
  name: string;
  id: string;
  selectionFunction: () => void;
  initialScale?: { x: number; y: number };
  sun?: Planet;
}) => {
  const radiusFactor = 28;

  const planetGraphic = new Graphics()
    .beginTextureFill({
      texture: planetTexture,
      matrix: new Matrix(1, 0, 0, 1, 0, radius * radiusFactor),
    })
    .drawCircle(0, 0, radius * radiusFactor)
    .endFill();

  const texture = app.renderer?.generateTexture(planetGraphic);
  const sprite = new Sprite(texture);

  sprite.name = name;
  sprite.eventMode = 'static';
  sprite.cursor = 'pointer';
  sprite.zIndex = 1;
  sprite.scale = initialScale;
  sprite.anchor.set(0.5, 0.5);

  sprite.on('mousedown', () => selectionFunction());

  const config: PlanetConfig = {
    id,
    radius,
    origin: { x: 0, y: 0 },
    orbit: {
      x: Math.random() > 0.2 ? 200 * radius : 100 * radius,
      y: Math.random() > 0.2 ? 200 * radius : 100 * radius,
      speed: 1 / radius,
    },
  };
  const planet: Planet = createPlanet({
    name,
    config,
    sprite,
    parent: sun,
  });
  return planet;
};

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

export const centerPlanetDraw = (planet: Planet, isOriginCelestial = false) => {
  planet.sprite.height = planet.originalDimensions.height * planet.scale;
  planet.sprite.width = planet.originalDimensions.width * planet.scale;

  planet.sprite.x = isOriginCelestial
    ? planet.position.x - planet.sprite.height / 2
    : planet.position.x;
  planet.sprite.y = isOriginCelestial
    ? planet.position.y - planet.sprite.width / 2
    : planet.position.y;
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
