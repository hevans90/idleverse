import { useApp } from '@inlet/react-pixi';
import { Room } from 'colyseus.js';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { Planet, PlanetConfig } from '../celestial-viewer/models';
import {
  centerPlanetDraw,
  createPlanet,
} from '../celestial-viewer/utils/drawing-utils';
import { createAnimatedPlanetSprite } from '../celestial-viewer/utils/graphics-utils';
import { sunSpriteConfig } from '../celestial-viewer/utils/static-sprite-configs';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport.hook';
import { useControls } from './use-controls';
export const ColyseusGame = ({ room }: { room: Room }) => {
  const app = useApp();

  const solarSystemContainerRef = useRef(new Container());

  const size = useResize('colyseus');

  useFpsTracker(app, size);
  useViewport(app, size, solarSystemContainerRef);

  useControls(room);

  useEffect(() => {
    solarSystemContainerRef.current.x = size.width / 2;
    solarSystemContainerRef.current.y = size.height / 2;
    const systemOrigin = { x: 0, y: 0 };

    const sunSprite = createAnimatedPlanetSprite(sunSpriteConfig);
    const sunConfig: PlanetConfig = {
      id: 'dummy-celestial-id',
      radius: 0,
      origin: { x: systemOrigin.x, y: systemOrigin.y },
      orbit: { x: 0, y: 0, speed: 0 },
    };
    const sun: Planet = createPlanet({
      name: 'dummy-celestial-name',
      config: sunConfig,
      sprite: sunSprite,
    });

    centerPlanetDraw(sun, true);

    solarSystemContainerRef.current.addChild(sun.sprite);
  }, []);

  return <></>;
};
