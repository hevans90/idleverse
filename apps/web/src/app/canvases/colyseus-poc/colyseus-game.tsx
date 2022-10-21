import { RoomState } from '@idleverse/colyseus-shared';
import { useApp } from '@inlet/react-pixi';
import { Room } from 'colyseus.js';
import { Container, Renderer, Sprite } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
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
import { centerSprite, drawPlayerShip } from './rendering/draw-player-ship';
import { useControls } from './use-controls';

import { colors } from '@idleverse/theme';
import { colorsVar } from '../../_state/colors';
import { drawGrid } from './rendering/draw-grid';

export const ColyseusGame = ({
  room,
  ships,
  dimensions: { width, height, columns, rows },
}: {
  room: Room;
  ships: RoomState['ships'];
  dimensions: { width: number; height: number; columns: number; rows: number };
}) => {
  const app = useApp();

  const [shipSprites, setShipSprites] = useState<Sprite[]>([]);
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

    const gridContainer = drawGrid({
      width,
      height,
      columns,
      rows,
      gridColor: colors[colorsVar().secondary]['300'],
    });

    solarSystemContainerRef.current.addChild(gridContainer);
  }, []);

  useEffect(() => {
    shipSprites.forEach((sprite) =>
      solarSystemContainerRef.current.removeChild(sprite)
    );

    const sprites: Sprite[] = [];

    ships.forEach((serverShip) => {
      const { shipSprite, avatarGraphic, avatarSprite } = drawPlayerShip(
        app.renderer as Renderer,
        serverShip.userId,
        colors[colorsVar().secondary]['300']
      );

      centerSprite(
        { width, height },
        { x: serverShip.positionX, y: serverShip.positionY },
        shipSprite
      );
      solarSystemContainerRef.current.addChild(shipSprite);
      sprites.push(shipSprite);
    });

    setShipSprites(sprites);
  }, [JSON.stringify(ships)]);

  return <></>;
};
