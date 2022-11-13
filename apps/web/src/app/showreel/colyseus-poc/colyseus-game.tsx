import { ColyseusShip } from '@idleverse/colyseus-shared';
import { useApp } from '@inlet/react-pixi';
import { Renderer } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { Planet, PlanetConfig } from '../../canvases/celestial-viewer/models';
import { createPlanet } from '../../canvases/celestial-viewer/utils/drawing-utils';
import { createAnimatedPlanetSprite } from '../../canvases/celestial-viewer/utils/graphics-utils';
import { sunSpriteConfig } from '../../canvases/celestial-viewer/utils/static-sprite-configs';
import { useFpsTracker } from '../../canvases/galaxy-generator/utils/fps-counter';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useViewport } from '../../canvases/_utils/use-viewport.hook';
import { drawPlayerShip } from './rendering/draw-player-ship';
import { useControls } from './use-controls';

import { useReactiveVar } from '@apollo/client';
import { generateHypotenuse } from '@idleverse/pixi-utils';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import { colorsVar } from '../../_state/colors';
import {
  colyseusGridVar,
  colyseusRoomDimensionsVar,
  colyseusRoomVar,
  colyseusShipsVar,
  colyseusTrackingDistanceVar,
  colyseusTrackingEnabledVar,
  colyseusTrackingTargetVar,
} from '../../_state/colyseus';
import { selfVar } from '../../_state/reactive-variables';
import { drawGrid } from './rendering/draw-grid';
import { useStarField } from './rendering/use-starfield';
import {
  detectPositionalChanges,
  detectRotationalChanges,
} from './utils/detect-positional-changes';
import { diffByUserId } from './utils/diff-by-user-id';

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

  const trackingEnabled = useReactiveVar(colyseusTrackingEnabledVar);
  const trackingTarget = useReactiveVar(colyseusTrackingTargetVar);
  const room = useReactiveVar(colyseusRoomVar);
  const ships = useReactiveVar(colyseusShipsVar);
  const grid = useReactiveVar(colyseusGridVar);
  const starfield = useStarField({ dimensions });

  const shipsRef = useRef<ColyseusShip[]>(
    ships.map((ship) => cloneClass(ship))
  );

  const [following, setFollowing] = useState(false);

  const selfShip = () => viewport.getChildByName(`ship_${self.id}`, true);

  const trackerContainer = () =>
    viewport?.getChildByName(`${trackingTarget?.name}_tracker`);

  const followShip = (viewport: Viewport) => {
    const myShip = selfShip();
    if (myShip && !following) {
      viewport.follow(myShip, {
        speed: 0, // speed to follow in pixels/frame (0=teleport to location)
        acceleration: null, // set acceleration to accelerate and decelerate at this rate; speed cannot be 0 to use acceleration
        radius: null, // radius (in world coordinates) of center circle where movement is allowed without moving the viewport
      });
      setFollowing(true);
    }
  };

  const trackTarget = ({ x, y }: { x: number; y: number }) => {
    const tracker = trackerContainer();
    if (tracker) {
      viewport.removeChild(tracker);
      tracker?.destroy(true);
    }

    const { container: trackingContainer, hyp } = generateHypotenuse(
      { x: trackingTarget?.x, y: trackingTarget?.y },
      { x, y },
      `${trackingTarget?.name}_tracker`,
      hexStringToNumber(colors[colorsVar().secondary]['700']),
      false
    );

    colyseusTrackingDistanceVar(hyp);

    viewport.addChild(trackingContainer);
  };

  useFpsTracker(app, size);
  useControls(room);

  const addShipToContainer = (ship: Readonly<ColyseusShip>) => {
    const { shipSprite, avatarGraphic, avatarSprite } = drawPlayerShip(
      app.renderer as Renderer,
      ship.userId,
      colors[colorsVar().secondary]['300']
    );

    shipSprite.rotation = ship.rotation;

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

      const sunPosition = { x: dimensions.width / 2, y: dimensions.height / 2 };
      const sunName = 'sun';

      sun.sprite.name = sunName;
      sun.sprite.anchor.set(0.5);
      sun.sprite.position.x = sunPosition.x;
      sun.sprite.position.y = sunPosition.y;
      viewport.addChild(sun.sprite);

      colyseusTrackingTargetVar({
        ...sunPosition,
        name: sunName,
      });

      viewport.addChild(starfield);
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
        const grid = drawGrid({
          width: dimensions.width,
          height: dimensions.height,
          columns: dimensions.columns,
          rows: dimensions.rows,
          gridColor: colors[colorsVar().secondary]['300'],
        });
        viewport.addChild(grid);
      } else {
        const gridObj = viewport.getChildByName('grid');
        if (gridObj) {
          viewport.removeChild(gridObj);
          gridObj.destroy(true);
        }
      }
    }
  }, [grid, viewport]);

  useEffect(() => {
    if (viewport) {
      const { additions, deletions } = diffByUserId(shipsRef.current, ships);
      const { shipsWithUpdatedPositions } = detectPositionalChanges(
        shipsRef.current,
        ships
      );

      const { shipsWithUpdatedRotations } = detectRotationalChanges(
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

          if (
            trackingEnabled &&
            trackingTarget &&
            shipToModify.name === selfShip()?.name
          ) {
            trackTarget({ x: positionX, y: positionY });
          }
        }
      });
      shipsWithUpdatedRotations?.forEach(({ userId, rotation }) => {
        const shipToModify = viewport?.getChildByName(
          `ship_${userId}`,
          true
        ) as PIXI.Sprite;
        if (shipToModify) {
          shipToModify.rotation = rotation;
        }
      });
    }
  }, [JSON.stringify(ships)]);

  useEffect(() => {
    if (viewport) {
      if (trackingEnabled) {
        const self = selfShip();
        trackTarget({ x: self?.position.x, y: self?.position.y });
      } else {
        const tracker = trackerContainer();
        viewport.removeChild(tracker);
        tracker?.destroy(true);
      }
    }
  }, [trackingTarget, trackingEnabled]);

  return <></>;
};
