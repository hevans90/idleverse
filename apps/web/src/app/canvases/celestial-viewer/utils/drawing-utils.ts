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

export const build2DPlanet = ({
  planetTexture,
  radius,
  app,
  name,
  id,
  selectionFunction,
  initialScale = { x: 5, y: 5 },
  sun,
  orbitalRadius,
  textureResolution,
}: {
  planetTexture: Texture<Resource>;
  radius: number;
  app: Application;
  name: string;
  id: string;
  selectionFunction: () => void;
  initialScale?: { x: number; y: number };
  sun?: Planet;
  orbitalRadius?: number;
  textureResolution: number;
}) => {
  const radiusFactor = 28;

  const textureZoomFactor = 120 / textureResolution;

  const planetGraphic = new Graphics()
    .beginTextureFill({
      texture: planetTexture,
      matrix: new Matrix(
        textureZoomFactor,
        0,
        0,
        textureZoomFactor,
        0,
        radius * radiusFactor
      ),
    })
    .drawCircle(0, 0, radius * radiusFactor)
    .endFill();

  const texture = app.renderer?.generateTexture(planetGraphic);
  const sprite = new Sprite(texture);

  // important to use the id here because we can change the name in the planet editor
  sprite.name = id;
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
      x: orbitalRadius ?? 500,
      y: orbitalRadius ?? 500,
      speed: 3 / orbitalRadius ?? 1,
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
  sprite?: AnimatedSprite | Sprite;
  parent?: Planet;
}): Planet => ({
  name,
  config,
  sprite,
  parent,
  position: config.origin,
  scale: 1,
  originalDimensions: {
    height: sprite?.height,
    width: sprite?.width,
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

export const updatePlanetPosition = (time: number, planet: Planet) => {
  const planetOffset = getPlanetPositionOffset(time, planet);
  const parentPosition = planet.parent
    ? planet.parent.position
    : { x: 0, y: 0 };

  planet.position = {
    x: planet.config.origin.x + planetOffset.x + parentPosition.x,
    y: planet.config.origin.y + planetOffset.y + parentPosition.y,
  };
};

export const getPlanetPositionOffset = (time: number, planet: Planet) => {
  return {
    x: planet.config.orbit.x * Math.sin(time * planet.config.orbit.speed),
    y: planet.config.orbit.y * -Math.cos(time * planet.config.orbit.speed),
    scale: 1,
  };
};
