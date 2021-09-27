import { useApp } from '@inlet/react-pixi';
import { Viewport } from 'pixi-viewport';
import { Text } from 'pixi.js';
import { useEffect } from 'react';
import { time } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import {
  SpriteSheetConfig,
  CreateBasicPlanetSprite,
  CreateAnimatedPlanetSprite,
} from './graphics/graphics-utils';
import { Sun } from './graphics/sun';
import {
  PlanetConfig,
  Planet,
  CreatePlanet,
  UpdatePlanetPosition,
  DrawPlanet,
} from './planets/planet';

export const SolarSystem = () => {
  const app = useApp();
  const size = useResize(true);
  app.stage.sortableChildren = true;

  const systemOrigin = 200;
  const systemRange = 50;

  app.ticker.add(() => {
    time(time() + 1);
  });

  const sunSpriteConfig: SpriteSheetConfig = {
    url: 'https://i.imgur.com/odQk3ZA.jpg',
    cols: 5,
    rows: 12,
    lastRowItemCount: 5,
    animationSpeed: 0.25,
    spriteScale: 0.25,
  };
  const basicSunSprite = CreateBasicPlanetSprite(app, Sun({ x: 0, y: 0 }));
  // const sunSprite = CreateAnimatedPlanet(sunSpriteConfig);
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
  const earthSprite = CreateAnimatedPlanetSprite(app, earthSpriteConfig);
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
  const marsSprite = CreateAnimatedPlanetSprite(app, marsSpriteConfig);
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
  const moonSprite = CreateAnimatedPlanetSprite(app, moonSpriteConfig);
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
      UpdatePlanetPosition(time(), planet, systemOrigin, systemRange)
    );
    planets.forEach((planet) => DrawPlanet(planet));
  });

  useEffect(() => {
    // create viewport
    const viewport = new Viewport({
      screenWidth: size.width,
      screenHeight: size.height,
      worldWidth: size.width,
      worldHeight: size.height,

      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      interaction: app.renderer.plugins.interaction,
    });

    // add the viewport to the stage
    app.stage.addChild(viewport);
    viewport.name = 'viewport';

    // activate plugins
    viewport.drag().pinch().wheel().decelerate();

    viewport.clampZoom({ minWidth: 300, maxWidth: 2000 });
    viewport.clamp({ direction: 'all' });

    const fpsCounter = new Text(`FPS: `, {
      fontFamily: 'zx spectrum',
      fontSize: 24,
      fill: 0xffffff,
    });
    fpsCounter.x = 50;
    fpsCounter.y = 100;
    fpsCounter.name = 'fpsCounter';
    app.stage.addChild(fpsCounter);

    app.ticker.add(() => {
      (app.stage.getChildByName('fpsCounter') as Text).text = `FPS: ${Math.ceil(
        app.ticker.FPS
      )}`;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when the screen is resized, this effect will reset the viewport's screen dimensions & then re-center
  useEffect(() => {
    const viewport: Viewport = app.stage.getChildByName(
      'viewport'
    ) as unknown as Viewport;

    viewport.screenHeight = size.height;
    viewport.screenWidth = size.width;

    viewport.fitWorld(true);
  }, [app.stage, size]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
