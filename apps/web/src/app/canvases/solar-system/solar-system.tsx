import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useRef } from 'react';
import { timeVar } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { useViewport } from '../common-utils/use-viewport';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import {
  CreateAnimatedPlanetSprite,
  CreateBasicPlanetSprite,
  SpriteSheetConfig,
} from './graphics/graphics-utils';
import { Sun } from './graphics/sun';
import {
  CreatePlanet,
  DrawPlanet,
  Planet,
  PlanetConfig,
  UpdatePlanetPosition,
} from './planets/planet';

export const SolarSystem = () => {
  const app = useApp();
  const size = useResize(false);

  const systemContainer = useRef(new Container());

  systemContainer.current.sortableChildren = true;

  const systemOrigin = 200;
  const systemRange = 50;

  app.ticker.add(() => {
    timeVar(timeVar() + 1);
  });

  useViewport(app, size, systemContainer, true);
  useFpsTracker(app, size);

  const basicSunSprite = CreateBasicPlanetSprite(
    app,
    systemContainer.current,
    Sun({ x: 0, y: 0 })
  );
  const sunConfig: PlanetConfig = {
    origin: { x: 400, y: systemOrigin },
    orbit: { x: 0, y: 0, speed: 1 },
  };
  const sun: Planet = CreatePlanet({
    name: 'sun',
    config: sunConfig,
    sprite: basicSunSprite,
  });

  const earthSpriteConfig: SpriteSheetConfig = {
    url: 'https://i.imgur.com/bLmw7RZ.png',
    cols: 5,
    rows: 18,
    lastRowItemCount: 1,
    animationSpeed: 0.25,
    spriteScale: 0.25,
  };
  const earthConfig: PlanetConfig = {
    origin: { x: 0, y: 0 },
    orbit: { x: 150, y: 30, speed: 5 },
  };
  const earthSprite = CreateAnimatedPlanetSprite(
    systemContainer.current,
    earthSpriteConfig
  );
  const earth: Planet = CreatePlanet({
    name: 'earth',
    config: earthConfig,
    sprite: earthSprite,
    parent: sun,
  });

  const marsSpriteConfig: SpriteSheetConfig = {
    url: 'https://i.imgur.com/OlbT0Sx.png',
    cols: 5,
    rows: 22,
    lastRowItemCount: 3,
    animationSpeed: 0.25,
    spriteScale: 0.125,
  };
  const marsSprite = CreateAnimatedPlanetSprite(
    systemContainer.current,
    marsSpriteConfig
  );
  const marsConfig: PlanetConfig = {
    origin: { x: 0, y: 0 },
    orbit: { x: 300, y: 40, speed: 2 },
  };
  const mars: Planet = CreatePlanet({
    name: 'mars',
    config: marsConfig,
    sprite: marsSprite,
    parent: sun,
  });

  const moonSpriteConfig: SpriteSheetConfig = {
    url: 'https://i.imgur.com/58Qt1Pj.png',
    cols: 5,
    rows: 24,
    lastRowItemCount: 5,
    animationSpeed: 0.25,
    spriteScale: 0.125,
  };
  const moonSprite = CreateAnimatedPlanetSprite(
    systemContainer.current,
    moonSpriteConfig
  );
  const moonConfig: PlanetConfig = {
    origin: { x: 0, y: 0 },
    orbit: { x: 50, y: 5, speed: 10 },
  };
  const moon: Planet = CreatePlanet({
    name: 'moon',
    config: moonConfig,
    sprite: moonSprite,
    parent: earth,
  });

  const planets = [sun, earth, mars, moon];

  app.ticker.add(() => {
    planets.forEach((planet) =>
      UpdatePlanetPosition(timeVar(), planet, systemOrigin, systemRange)
    );
    planets.forEach((planet) => DrawPlanet(planet));
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
