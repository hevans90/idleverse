import { ColyseusShip } from '@idleverse/colyseus-shared';
import { useApp } from '@inlet/react-pixi';
import { Container, Renderer } from 'pixi.js';
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
import { drawPlayerShip } from './rendering/draw-player-ship';
import { useControls } from './use-controls';

import { useReactiveVar } from '@apollo/client';
import { colors } from '@idleverse/theme';
import * as PIXI from 'pixi.js';
import { colorsVar } from '../../_state/colors';
import {
  colyseusGridVar,
  colyseusRoomDimensionsVar,
  colyseusRoomVar,
  colyseusShipsVar,
} from '../../_state/colyseus';
import { selfVar } from '../../_state/reactive-variables';
import { drawGrid } from './rendering/draw-grid';
import { detectPositionalChanges, diffByUserId } from './utils/diff-by-user-id';

// necessary because Colyseus serialises their state in to classes (wtf, wHY?!)
const cloneClass = <T,>(obj: T): T =>
  Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);

export const ColyseusGame = () => {
  const app = useApp();
  const self = useReactiveVar(selfVar);

  const room = useReactiveVar(colyseusRoomVar);
  const dimensions = useReactiveVar(colyseusRoomDimensionsVar);
  const ships = useReactiveVar(colyseusShipsVar);
  const grid = useReactiveVar(colyseusGridVar);

  const shipsRef = useRef<ColyseusShip[]>(
    ships.map((ship) => cloneClass(ship))
  );

  const solarSystemContainerRef = useRef(new Container());
  const gridRef = useRef<Container>(
    drawGrid({
      width: dimensions.width,
      height: dimensions.height,
      columns: dimensions.columns,
      rows: dimensions.rows,
      gridColor: colors[colorsVar().secondary]['300'],
    })
  );

  const size = useResize('colyseus');

  const viewport = useViewport(
    app,
    size,
    solarSystemContainerRef,
    true,
    {
      width: 2000,
      height: 1000,
    },
    { minWidth: 1000, maxWidth: 4000 }
  );

  useFpsTracker(app, size);

  useControls(room);

  const addShipToContainer = (ship: Readonly<ColyseusShip>) => {
    const { shipSprite, avatarGraphic, avatarSprite } = drawPlayerShip(
      app.renderer as Renderer,
      ship.userId,
      colors[colorsVar().secondary]['300']
    );

    shipSprite.position.x = ship.positionX - dimensions.width / 2;
    shipSprite.position.y = ship.positionY - dimensions.height / 2;
    shipSprite.anchor.set(0.5, 0.5);
    shipSprite.name = `ship_${ship.userId}`;
    solarSystemContainerRef.current.addChild(shipSprite);
  };

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
    sun.sprite.position.x = 0;
    sun.sprite.position.y = 0;
    sun.sprite.anchor.set(0.5, 0.5);

    shipsRef.current.forEach((ship) => addShipToContainer(ship));
  }, []);

  useEffect(() => {
    if (grid) {
      solarSystemContainerRef.current.addChild(gridRef.current);
    } else {
      solarSystemContainerRef.current.removeChild(gridRef.current);
    }
  }, [grid]);

  useEffect(() => {
    const { additions, deletions } = diffByUserId(shipsRef.current, ships);
    const { shipsWithUpdatedPositions } = detectPositionalChanges(
      shipsRef.current,
      ships
    );

    console.log(
      `ref: ${shipsRef.current.map((x) => x.positionX)}`,
      `new: ${ships.map((x) => x.positionX)}`
    );

    if (additions || deletions || shipsWithUpdatedPositions) {
      shipsRef.current = ships.map((ship) => cloneClass(ship));
    }

    deletions?.forEach(({ userId }) => {
      const shipToRemove = solarSystemContainerRef.current.getChildByName(
        `ship_${userId}`,
        true
      );
      solarSystemContainerRef.current.removeChild(shipToRemove);
    });

    additions?.forEach((ship) => addShipToContainer(ship));

    shipsWithUpdatedPositions?.forEach(({ userId, positionX, positionY }) => {
      const shipToModify = solarSystemContainerRef.current.getChildByName(
        `ship_${userId}`,
        true
      ) as PIXI.Sprite;
      shipToModify.position.x = positionX - dimensions.width / 2;
      shipToModify.position.y = positionY - dimensions.height / 2;
    });
  }, [JSON.stringify(ships)]);

  useEffect(() => {
    const selfShipSprite = solarSystemContainerRef.current.getChildByName(
      `ship_${self.id}`,
      true
    );

    if (viewport && selfShipSprite) {
      viewport?.follow(selfShipSprite);
    }
  }, [viewport]);

  return <></>;
};
