/* eslint-disable react-hooks/exhaustive-deps */
import { useReactiveVar } from '@apollo/client';
import { useApp } from '@inlet/react-pixi';
import { useEffect } from 'react';
import { solarSystemConfigVar, timeVar } from '../../_state/reactive-variables';
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

  let { simulationSpeed, viewAngle, viewDistance } =
    useReactiveVar(solarSystemConfigVar);

  useEffect(() => {
    viewAngle = (viewAngle * Math.PI) / 180;
  }, [viewAngle]);

  useEffect(() => {
    viewAngle = (viewAngle * Math.PI) / 180;
    app.stage.sortableChildren = true;

    let systemOrigin = { x: 400, y: 400 };

    app.ticker.add(() => {
      timeVar(timeVar() + 1);
    });

    const sunSprite = CreateAnimatedPlanetSprite(app, sunSpriteConfig);
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
      orbit: { x: 150, y: 150, speed: 1 },
    };
    const earthSprite = CreateAnimatedPlanetSprite(app, earthSpriteConfig);
    const earth: Planet = CreatePlanet({
      name: 'earth',
      config: earthConfig,
      sprite: earthSprite,
      parent: sun,
    });

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
      viewAngle = (solarSystemConfigVar().viewAngle * Math.PI) / 180;
      viewDistance = solarSystemConfigVar().viewDistance;
      simulationSpeed = solarSystemConfigVar().simulationSpeed;

      systemOrigin = { x: app.screen.width / 2, y: app.screen.height / 3 };
      sun.config.origin = systemOrigin;
      planets.forEach((planet) =>
        UpdatePlanetPosition(timeVar(), planet, simulationSpeed)
      );
      planets.forEach((planet) =>
        DrawPlanet(planet, systemOrigin, viewDistance, viewAngle)
      );
    });
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
