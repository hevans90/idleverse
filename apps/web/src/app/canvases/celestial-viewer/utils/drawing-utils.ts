import {
  AnimatedSprite,
  Application,
  Graphics,
  Matrix,
  Resource,
  Sprite,
  Texture,
} from 'pixi.js';
import { Vector2D } from '../../../_state/models';

import { Planet, PlanetConfig } from '../models';

export const buildPlanet = (
  planetTexture: Texture<Resource>,
  radius: number,
  app: Application,
  name: string,
  id: string,
  sun: Planet,
  selectionFunction: () => void
) => {
  const radiusFactor = 28;

  const planetGraphic = new Graphics()
    .beginTextureFill({
      texture: planetTexture,
      matrix: new Matrix(1, 0, 0, 1, 0, radius * radiusFactor),
    })
    .drawCircle(0, 0, radius * radiusFactor)
    .endFill();

  const texture = app.renderer.generateTexture(planetGraphic);
  const sprite = new Sprite(texture);

  sprite.name = name;
  sprite.interactive = true;
  sprite.cursor = 'pointer';
  sprite.zIndex = 1;
  sprite.scale = { x: 0.3, y: 0.3 };
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
