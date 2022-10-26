import { ColyseusShip } from '@idleverse/colyseus-shared';
import { useApp } from '@inlet/react-pixi';
import { Container, Renderer } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { Planet, PlanetConfig } from '../celestial-viewer/models';
import { createPlanet } from '../celestial-viewer/utils/drawing-utils';
import { createAnimatedPlanetSprite } from '../celestial-viewer/utils/graphics-utils';
import { sunSpriteConfig } from '../celestial-viewer/utils/static-sprite-configs';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport.hook';
import { drawPlayerShip } from './rendering/draw-player-ship';
import { useControls } from './use-controls';

import { useReactiveVar } from '@apollo/client';
import { colors } from '@idleverse/theme';
import { Viewport } from 'pixi-viewport';
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
import { StarField } from './rendering/starfield';
import { detectPositionalChanges, diffByUserId } from './utils/diff-by-user-id';

// necessary because Colyseus serialises their state in to classes (wtf, wHY?!)
const cloneClass = <T,>(obj: T): T =>
  Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);

export const ColyseusGame = () => {
  const app = useApp();
  const size = useResize();
  const dimensions = useReactiveVar(colyseusRoomDimensionsVar);

  const viewport = useViewport({
    app,
    size,
    center: false,
    worldSize: {
      width: dimensions.width,
      height: dimensions.height,
    },
    clampZoom: { minWidth: 500, maxWidth: 20000 },
  });

  const self = useReactiveVar(selfVar);
  const [rendered, setRendered] = useState(false);

  const room = useReactiveVar(colyseusRoomVar);
  const ships = useReactiveVar(colyseusShipsVar);
  const grid = useReactiveVar(colyseusGridVar);

  const shipsRef = useRef<ColyseusShip[]>(
    ships.map((ship) => cloneClass(ship))
  );

  const gridRef = useRef<Container>(
    drawGrid({
      width: dimensions.width,
      height: dimensions.height,
      columns: dimensions.columns,
      rows: dimensions.rows,
      gridColor: colors[colorsVar().secondary]['300'],
    })
  );

  const [following, setFollowing] = useState(false);

  const followShip = (viewport: Viewport) => {
    const selfShipSprite = viewport.getChildByName(`ship_${self.id}`, true);
    if (selfShipSprite && !following) {
      viewport.follow(selfShipSprite, {
        speed: 0, // speed to follow in pixels/frame (0=teleport to location)
        acceleration: null, // set acceleration to accelerate and decelerate at this rate; speed cannot be 0 to use acceleration
        radius: null, // radius (in world coordinates) of center circle where movement is allowed without moving the viewport
      });
      setFollowing(true);
    }
  };
  useFpsTracker(app, size);
  useControls(room);

  const addShipToContainer = (ship: Readonly<ColyseusShip>) => {
    const { shipSprite, avatarGraphic, avatarSprite } = drawPlayerShip(
      app.renderer as Renderer,
      ship.userId,
      colors[colorsVar().secondary]['300']
    );

    shipSprite.position.x = ship.positionX;
    shipSprite.position.y = ship.positionY;
    shipSprite.anchor.set(0.5, 0.5);
    shipSprite.name = `ship_${ship.userId}`;
    viewport.addChild(shipSprite);
    followShip(viewport);
    viewport.setZoom(2);
  };

  useEffect(() => {
    if (viewport) {
      shipsRef.current.forEach((ship) => addShipToContainer(ship));

      const systemOrigin = { x: 100, y: 0 };

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

      sun.sprite.anchor.set(0.5);
      sun.sprite.position.x = dimensions.width / 2;
      sun.sprite.position.y = dimensions.height / 2;
      viewport.addChild(sun.sprite);

      setRendered(true);
    }
  }, [viewport]);

  useEffect(() => {
    if (viewport) {
      followShip(viewport);
      viewport.setZoom(2);
    }
  }, [size, viewport]);

  useEffect(() => {
    if (viewport) {
      if (grid) {
        viewport.addChild(gridRef.current);
      } else {
        viewport.removeChild(gridRef.current);
      }
    }
  }, [grid, viewport]);

  useEffect(() => {
    const { additions, deletions } = diffByUserId(shipsRef.current, ships);
    const { shipsWithUpdatedPositions } = detectPositionalChanges(
      shipsRef.current,
      ships
    );

    if (additions || deletions || shipsWithUpdatedPositions) {
      shipsRef.current = ships.map((ship) => cloneClass(ship));
    }

    deletions?.forEach(({ userId }) => {
      const shipToRemove = viewport.getChildByName(`ship_${userId}`, true);
      viewport.removeChild(shipToRemove);
    });

    additions?.forEach((ship) => addShipToContainer(ship));

    shipsWithUpdatedPositions?.forEach(({ userId, positionX, positionY }) => {
      const shipToModify = viewport?.getChildByName(
        `ship_${userId}`,
        true
      ) as PIXI.Sprite;
      if (shipToModify) {
        shipToModify.position.x = positionX;
        shipToModify.position.y = positionY;
      }
    });
  }, [JSON.stringify(ships)]);

  return <StarField viewport={viewport} dimensions={dimensions} />;
};
