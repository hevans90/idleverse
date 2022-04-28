/* eslint-disable react-hooks/exhaustive-deps */
import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { solarSystemConfigVar } from '../../_state/reactive-variables';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport';
import {
  earthSpriteConfig,
  marsSpriteConfig,
  moonSpriteConfig,
  sunSpriteConfig
} from './graphics/config';
import { createAnimatedPlanetSprite } from './graphics/graphics-utils';
import {
  createPlanet,
  drawPlanet,
  Planet,
  PlanetConfig,
  updatePlanetPosition
} from './planets/planet';

export const Orbits = () => {
  const app = useApp();

  const size = useResize('solar-system');

  const solarSystemContainerRef = useRef(new Container());

  useFpsTracker(app, size);

  useViewport(app, size, solarSystemContainerRef);

  useEffect(() => {
    solarSystemContainerRef.current.x = size.width / 2;
    solarSystemContainerRef.current.y = size.height / 2;

    solarSystemContainerRef.current.sortableChildren = true;

    const systemOrigin = { x: 0, y: 0 };

    // useTick(delta => {
    //   // do something here
    // })

    const sunSprite = createAnimatedPlanetSprite(
      solarSystemContainerRef.current,
      sunSpriteConfig
    );
    const sunConfig: PlanetConfig = {
      mass: 2 * 10 ** 6,
      theta: Math.PI/2,
      origin: { x: systemOrigin.x, y: systemOrigin.y },
      orbit: { x: 0, y: 0, speed: 1 },
    };
    const sun: Planet = createPlanet({
      name: 'sun',
      config: sunConfig,
      sprite: sunSprite,
    });

    const earthConfig: PlanetConfig = {
      mass: 600,
      theta: Math.PI/2,
      origin: { x: 0, y: 0 },
      orbit: { x: 150, y: 150, speed: 1 },
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
      mass: 60,
      theta: Math.PI,
      origin: { x: 0, y: 0 },
      orbit: { x: 200, y: 200, speed: 0.53 },
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
      mass: 7,
      theta: Math.PI/2,
      origin: { x: 0, y: 0 },
      orbit: { x: 50, y: 50, speed: 12.36 },
    };
    const moon: Planet = createPlanet({
      name: 'Moon',
      config: moonConfig,
      sprite: moonSprite,
      parent: earth,
    });

    const planets = [sun, earth, mars, moon];

    planets.forEach((planet) =>
      updatePlanetPosition(0, planet, 1)
    );

    app.ticker.add(() => {
      // eslint-disable-next-line prefer-const
      let { viewAngle, simulationSpeed } = solarSystemConfigVar();

      planets.forEach((planet) => drawPlanet(planet));
    });
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
