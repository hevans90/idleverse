/* eslint-disable react-hooks/exhaustive-deps */
import { useApp } from '@inlet/react-pixi';
import { PixelateFilter } from '@pixi/filter-pixelate';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { solarSystemConfigVar, timeVar } from '../../_state/reactive-variables';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport';
import {
  earthSpriteConfig,
  marsSpriteConfig,
  moonSpriteConfig,
  sunSpriteConfig,
  topDownDesertSpriteConfig,
} from './graphics/config';
import { createAnimatedPlanetSprite } from './graphics/graphics-utils';
import {
  createPlanet,
  drawPlanet,
  Planet,
  PlanetConfig,
  updatePlanetPosition,
} from './planets/planet';

export const SolarSystem = () => {
  const app = useApp();

  const size = useResize('solar-system');

  const solarSystemContainerRef = useRef(new Container());

  useFpsTracker(app, size);

  useViewport(app, size, solarSystemContainerRef);

  useEffect(() => {
    solarSystemContainerRef.current.filters = [new PixelateFilter(1)];
    solarSystemContainerRef.current.x = size.width / 2;
    solarSystemContainerRef.current.y = size.height / 2;

    solarSystemContainerRef.current.sortableChildren = true;

    const systemOrigin = { x: 0, y: 0 };

    app.ticker.add(() => {
      timeVar(timeVar() + 1);
    });

    const sunSprite = createAnimatedPlanetSprite(
      solarSystemContainerRef.current,
      sunSpriteConfig
    );
    const sunConfig: PlanetConfig = {
      origin: { x: systemOrigin.x, y: systemOrigin.y },
      orbit: { x: 0, y: 0, speed: 1 },
    };
    const sun: Planet = createPlanet({
      name: 'sun',
      config: sunConfig,
      sprite: sunSprite,
    });

    const earthConfig: PlanetConfig = {
      origin: { x: 0, y: 0 },
      orbit: { x: 200, y: 200, speed: 1 },
    };
    const earthSprite = createAnimatedPlanetSprite(
      solarSystemContainerRef.current,
      earthSpriteConfig
    );
    const earth: Planet = createPlanet({
      name: 'earth',
      config: earthConfig,
      sprite: earthSprite,
      parent: sun,
    });

    const marsSprite = createAnimatedPlanetSprite(
      solarSystemContainerRef.current,
      marsSpriteConfig
    );
    const marsConfig: PlanetConfig = {
      origin: { x: 0, y: 0 },
      orbit: { x: 300, y: 300, speed: 0.53 },
    };
    const mars: Planet = createPlanet({
      name: 'mars',
      config: marsConfig,
      sprite: marsSprite,
      parent: sun,
    });

    const moonSprite = createAnimatedPlanetSprite(
      solarSystemContainerRef.current,
      moonSpriteConfig
    );
    const moonConfig: PlanetConfig = {
      origin: { x: 0, y: 0 },
      orbit: { x: 50, y: 50, speed: 12.36 },
    };
    const moon: Planet = createPlanet({
      name: 'Moon',
      config: moonConfig,
      sprite: moonSprite,
      parent: earth,
    });

    const desertSprite = createAnimatedPlanetSprite(
      solarSystemContainerRef.current,
      topDownDesertSpriteConfig
    );
    const desertConfig: PlanetConfig = {
      origin: { x: 0, y: 0 },
      orbit: { x: 400, y: 400, speed: 0.3 },
    };
    const desert: Planet = createPlanet({
      name: 'desrt',
      config: desertConfig,
      sprite: desertSprite,
      parent: sun,
    });

    const planets = [sun, earth, mars, moon, desert];

    app.ticker.add(() => {
      // eslint-disable-next-line prefer-const
      let { viewAngle, simulationSpeed } = solarSystemConfigVar();

      const viewDistance = size.height;

      viewAngle = (viewAngle * Math.PI) / 180;

      planets.forEach((planet) =>
        updatePlanetPosition(timeVar(), planet, simulationSpeed)
      );
      planets.forEach((planet) =>
        drawPlanet(planet, systemOrigin, viewDistance, viewAngle)
      );
    });
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
