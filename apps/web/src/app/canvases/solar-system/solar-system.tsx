/* eslint-disable react-hooks/exhaustive-deps */
import { useApp } from '@inlet/react-pixi';
import { PixelateFilter } from '@pixi/filter-pixelate';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { solarSystemConfigVar, timeVar } from '../../_state/reactive-variables';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport.hook';

import {
  createAnimatedPlanetSprite,
  createRadialEllipse,
} from '../celestial-viewer/utils/graphics-utils';

import { colors, hexStringToNumber } from '@idleverse/theme';
import { Planet, PlanetConfig } from '../celestial-viewer/models';
import {
  createPlanet,
  drawPlanet,
  updatePlanetPosition,
} from '../celestial-viewer/utils/drawing-utils';
import {
  sunSpriteConfig,
  topDownDesertSpriteConfig,
} from '../celestial-viewer/utils/static-sprite-configs';

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

    const sunSprite = createAnimatedPlanetSprite(sunSpriteConfig);
    const sunConfig: PlanetConfig = {
      id: '1',
      radius: 1,
      origin: { x: systemOrigin.x, y: systemOrigin.y },
      orbit: { x: 0, y: 0, speed: 1 },
    };
    const sun: Planet = createPlanet({
      name: 'sun',
      config: sunConfig,
      sprite: sunSprite,
    });

    const desertSprite = createAnimatedPlanetSprite(topDownDesertSpriteConfig);
    const desertConfig: PlanetConfig = {
      id: '1',
      radius: 1,
      origin: { x: 0, y: 0 },
      orbit: { x: 300, y: 400, speed: 10 },
    };
    const desert: Planet = createPlanet({
      name: 'desert',
      config: desertConfig,
      sprite: desertSprite,
      parent: sun,
    });

    const desertSprite2 = createAnimatedPlanetSprite(topDownDesertSpriteConfig);
    const desertConfig2: PlanetConfig = {
      id: '1',
      radius: 1,
      origin: { x: 0, y: 0 },
      orbit: { x: 200, y: 200, speed: 3 },
    };
    const desert2: Planet = createPlanet({
      name: 'desert2',
      config: desertConfig2,
      sprite: desertSprite2,
      parent: sun,
    });

    const planets = [sun, desert, desert2];

    planets.forEach(({ sprite }) =>
      solarSystemContainerRef.current.addChild(sprite)
    );

    planets
      // all planets that have a parent i.e. not the central star, or other freely floating objects
      .filter((planet) => planet?.parent)
      .forEach(
        ({
          parent: {
            config: { origin },
          },
          config: { orbit },
        }) => {
          const radialCircle = createRadialEllipse(
            origin.x,
            origin.y,
            orbit.x,
            orbit.y,
            hexStringToNumber(colors.gray['300'])
          );

          solarSystemContainerRef.current.addChild(radialCircle);
        }
      );

    app.ticker.add(() => {
      // eslint-disable-next-line prefer-const
      let { simulationSpeed } = solarSystemConfigVar();

      planets.forEach((planet) =>
        updatePlanetPosition(timeVar(), planet, simulationSpeed)
      );
      planets.forEach((planet) => drawPlanet(planet, systemOrigin));
    });
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
