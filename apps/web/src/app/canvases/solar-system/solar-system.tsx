/* eslint-disable react-hooks/exhaustive-deps */
import { useReactiveVar } from '@apollo/client';
import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { solarSystemConfigVar, timeVar } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { useViewport } from '../common-utils/use-viewport';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import {
  earthSpriteConfig,
  marsSpriteConfig,
  moonSpriteConfig,
  sunSpriteConfig,
} from './graphics/config';
import { CreateAnimatedPlanetSprite } from './graphics/graphics-utils';
import {
  CreatePlanet,
  DrawPlanet,
  Planet,
  PlanetConfig,
  UpdatePlanetPosition,
} from './planets/planet';

export const SolarSystem = () => {
  const app = useApp();

  const size = useResize('solar-system');

  const solarSystemContainerRef = useRef(new Container());

  useFpsTracker(app, size);

  useViewport(app, size, solarSystemContainerRef, true);

  let { simulationSpeed, viewAngle, viewDistance } =
    useReactiveVar(solarSystemConfigVar);

  useEffect(() => {
    viewAngle = (viewAngle * Math.PI) / 180;
  }, [viewAngle]);

  useEffect(() => {
    solarSystemContainerRef.current.x = size.width / 2;
    solarSystemContainerRef.current.y = size.height / 2;

    viewAngle = (viewAngle * Math.PI) / 180;
    solarSystemContainerRef.current.sortableChildren = true;

    const systemOrigin = { x: 0, y: 0 };

    app.ticker.add(() => {
      timeVar(timeVar() + 1);
    });

    const sunSprite = CreateAnimatedPlanetSprite(
      solarSystemContainerRef.current,
      sunSpriteConfig
    );
    const sunConfig: PlanetConfig = {
      origin: { x: 400, y: 400 },
      orbit: { x: 0, y: 0, speed: 1 },
    };
    const sun: Planet = CreatePlanet({
      name: 'sun',
      config: sunConfig,
      sprite: sunSprite,
    });

    const earthConfig: PlanetConfig = {
      origin: { x: 0, y: 0 },
      orbit: { x: 250, y: 150, speed: 1 },
    };
    const earthSprite = CreateAnimatedPlanetSprite(
      solarSystemContainerRef.current,
      earthSpriteConfig
    );
    const earth: Planet = CreatePlanet({
      name: 'earth',
      config: earthConfig,
      sprite: earthSprite,
      parent: sun,
    });

    const marsSprite = CreateAnimatedPlanetSprite(
      solarSystemContainerRef.current,
      marsSpriteConfig
    );
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

    const moonSprite = CreateAnimatedPlanetSprite(
      solarSystemContainerRef.current,
      moonSpriteConfig
    );
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

    // planets.forEach((planet) =>
    //   UpdatePlanetPosition(timeVar(), planet, simulationSpeed)
    // );
    // planets.forEach((planet) =>
    //   DrawPlanet(planet, systemOrigin, viewDistance, viewAngle)
    // );
    sun.config.origin = systemOrigin;

    app.ticker.add(() => {
      viewAngle = (solarSystemConfigVar().viewAngle * Math.PI) / 180;
      viewDistance = solarSystemConfigVar().viewDistance;
      simulationSpeed = solarSystemConfigVar().simulationSpeed;

      planets.forEach((planet) =>
        UpdatePlanetPosition(timeVar(), planet, simulationSpeed)
      );
      planets.forEach((planet) =>
        DrawPlanet(planet, systemOrigin, viewDistance, viewAngle)
      );
    });
    // setTimeout(() => {}, 100);

    // return () => {
    //   timeVar(0);
    // };
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
