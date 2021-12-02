import { Box } from '@chakra-ui/react';
import { Application } from '@pixi/app';
import { Text } from '@pixi/text';
import { useEffect } from 'react';
import { solarSystemConfig, time } from '../../_state/reactive-variables';
import {
  SpriteSheetConfig,
  CreateAnimatedPlanetSprite,
} from './graphics/graphics-utils';
import {
  PlanetConfig,
  Planet,
  CreatePlanet,
  UpdatePlanetPosition,
  DrawPlanet,
} from './planets/planet';

export const SolarSystem = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    const app = new Application({
      transparent: true,
      resizeTo: gameElement,
    });
    app.stage.sortableChildren = true;

    let systemOrigin = { x: 400, y: 400 };
    let viewDistance = 500;
    let viewAngle = (Math.PI * 5) / 12;
    let simulationSpeed = 2;

    app.ticker.add(() => {
      time(time() + 1);
    });

    const sunSpriteConfig: SpriteSheetConfig = {
      url: 'https://i.imgur.com/ZVd1Ikf.png',
      cols: 5,
      rows: 12,
      lastRowItemCount: 5,
      animationSpeed: 0.25,
      spriteScale: 0.5,
    };
    const sunSpriteConfig2: SpriteSheetConfig = {
      url: 'https://i.imgur.com/4ogladY.png',
      cols: 5,
      rows: 31,
      lastRowItemCount: 1,
      animationSpeed: 0.25,
      spriteScale: 1,
    };
    // const basicSunSprite = CreateBasicPlanetSprite(app, Sun({ x: 0, y: 0 }));
    const sunSprite = CreateAnimatedPlanetSprite(app, sunSpriteConfig);
    //const sunSprite2 = CreateAnimatedPlanetSprite(app, sunSpriteConfig2);
    const sunConfig: PlanetConfig = {
      origin: { x: 400, y: 400 },
      orbit: { x: 0, y: 0, speed: 1 },
    };
    const sun: Planet = CreatePlanet({
      name: 'sun',
      config: sunConfig,
      sprite: sunSprite,
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
      orbit: { x: 150, y: 150, speed: 1 },
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
      orbit: { x: 300, y: 300, speed: 0.53 },
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
      orbit: { x: 50, y: 50, speed: 12.36 },
    };
    const moon: Planet = CreatePlanet({
      name: 'Moon',
      config: moonConfig,
      sprite: moonSprite,
      parent: earth,
    });

    const planets = [sun, earth, mars, moon];

    app.ticker.add(() => {
      viewAngle = (solarSystemConfig().viewAngle * Math.PI) / 180;
      viewDistance = solarSystemConfig().viewDistance;
      simulationSpeed = solarSystemConfig().simulationSpeed;

      app.screen.height = gameElement.clientHeight;
      app.screen.width = gameElement.clientWidth;
      systemOrigin = { x: app.screen.width / 2, y: app.screen.height / 3 };
      sun.config.origin = systemOrigin;
      planets.forEach((planet) =>
        UpdatePlanetPosition(time(), planet, simulationSpeed)
      );
      planets.forEach((planet) =>
        DrawPlanet(planet, systemOrigin, viewDistance, viewAngle)
      );
    });

    document.getElementById('game').appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <Box id="game" mx="2vw" w="96vw" my="2vh" h="96vh"></Box>;
};
