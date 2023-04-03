import { ColyseusShip } from '@idleverse/colyseus-shared';
import { useApp } from '@pixi/react';
import { Renderer } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useViewport } from '../../canvases/_utils/use-viewport.hook';
import { Planet, PlanetConfig } from '../../canvases/celestial-viewer/models';
import { createPlanet } from '../../canvases/celestial-viewer/utils/drawing-utils';
import { createAnimatedPlanetSprite } from '../../canvases/celestial-viewer/utils/graphics-utils';
import { sunSpriteConfig } from '../../canvases/celestial-viewer/utils/static-sprite-configs';
import { useFpsTracker } from '../../canvases/galaxy-generator/utils/fps-counter';
import { drawPlayerShip } from './rendering/draw-player-ship';
import { useControls } from './use-controls';

import { useReactiveVar } from '@apollo/client';
import { generateHypotenuse } from '@idleverse/pixi-utils';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import { colorsVar } from '../../_state/colors';
import {
  colyseusCelestialsVar,
  colyseusGameSettingsVar,
  colyseusRoomDimensionsVar,
  colyseusRoomVar,
  colyseusShipsVar,
  colyseusTrackingDistanceVar,
  colyseusTrackingEnabledVar,
  colyseusTrackingTargetVar,
} from '../../_state/colyseus';
import { selfVar } from '../../_state/reactive-variables';
import { drawBoundingBoxes } from './rendering/draw-bounding-boxes';
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

const AVATAR_RADIUS = 15;
const AVATAR_LINE_LENGTH = 30;

const shipNamer = (id: string) => `ship_${id}`;
const shipAvatarNamer = (id: string) => `ship_avatar_${id}`;
const shipBoundingBoxNamer = (id) => `ship_bounding-box_${id}`;

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
  const celestials = useReactiveVar(colyseusCelestialsVar);

  const settings = useReactiveVar(colyseusGameSettingsVar);

  const starfield = useStarField({ dimensions });

  const shipsRef = useRef<ColyseusShip[]>(
    ships.map((ship) => cloneClass(ship))
  );

  const shipAvatarsRef = useRef<{ [key: string]: PIXI.Container }>({});
  const shipBoundingBoxesRef = useRef<{ [key: string]: PIXI.Graphics }>({});

  const [following, setFollowing] = useState(false);

  const selfShip = () => viewport.getChildByName(shipNamer(self.id), true);

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
      hexStringToNumber(colors[colorsVar().secondary]['300']),
      false
    );

    colyseusTrackingDistanceVar(hyp);

    viewport.addChild(trackingContainer);
  };

  useFpsTracker(app);
  useControls(room);

  const addShipToContainer = (ship: Readonly<ColyseusShip>) => {
    const {
      shipSprite,
      avatarConnectingLineSprite,
      avatarSprite,
      boundingBoxGraphic,
    } = drawPlayerShip({
      renderer: app.renderer as Renderer,
      shipDimensions: { width: ship.width, height: ship.height },
      userId: ship.userId,
      boundingBoxColor: hexStringToNumber(colors[colorsVar().secondary]['200']),
      avatarBgColor: hexStringToNumber(colors[colorsVar().secondary]['600']),
      avatarRadius: AVATAR_RADIUS,
      avatarConnectingLineHeight: AVATAR_LINE_LENGTH,
    });

    const shipName = shipNamer(ship.userId);
    const shipAvatarName = shipAvatarNamer(ship.userId);
    const shipBoundingBoxName = shipBoundingBoxNamer(ship.userId);

    shipSprite.rotation = ship.rotation;
    shipSprite.position.x = ship.positionX;
    shipSprite.position.y = ship.positionY;
    shipSprite.anchor.set(0.5, 0.5);
    shipSprite.name = shipName;
    shipSprite.zIndex = 2;

    const avatarContainer = new PIXI.Container();
    avatarContainer.addChild(avatarSprite, avatarConnectingLineSprite);
    avatarContainer.position.x = ship.positionX - AVATAR_RADIUS;
    avatarContainer.position.y =
      ship.positionY - AVATAR_RADIUS * 2 - AVATAR_LINE_LENGTH / 2;
    avatarContainer.name = shipAvatarName;
    avatarContainer.zIndex = 1;

    boundingBoxGraphic.name = shipBoundingBoxName;
    boundingBoxGraphic.position.x = ship.positionX - ship.width / 2;
    boundingBoxGraphic.position.y = ship.positionY - ship.height / 2;
    boundingBoxGraphic.zIndex = 1;

    // add avatar/bounding box to ref objects
    shipAvatarsRef.current[shipAvatarName] = avatarContainer;
    shipBoundingBoxesRef.current[shipBoundingBoxName] = boundingBoxGraphic;

    viewport.addChild(shipSprite);

    if (settings.avatars) {
      viewport.addChild(avatarContainer);
    }

    if (settings.boundingBoxes) {
      viewport.addChild(boundingBoxGraphic);
    }

    followShip(viewport);

    // only zoom for current user's ship
    if (ship.userId === self.id) {
      viewport.setZoom(2);
    }
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
      if (settings.grid) {
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
  }, [settings.grid, viewport]);

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
        const shipToRemove = viewport.getChildByName(shipNamer(userId), true);

        if (settings.avatars) {
          const avatarToRemove = viewport.getChildByName(
            shipAvatarNamer(userId),
            true
          );
          viewport.removeChild(avatarToRemove);
        }
        if (settings.boundingBoxes) {
          const boundingBoxToRemove = viewport.getChildByName(
            shipBoundingBoxNamer(userId),
            true
          );
          viewport.removeChild(boundingBoxToRemove);
        }

        viewport.removeChild(shipToRemove);
      });

      additions?.forEach((ship) => addShipToContainer(ship));

      shipsWithUpdatedPositions?.forEach(
        ({ userId, positionX, positionY, width, height }) => {
          const shipToModify = viewport?.getChildByName(
            shipNamer(userId),
            true
          ) as PIXI.Sprite;
          if (shipToModify) {
            shipToModify.position.x = positionX;
            shipToModify.position.y = positionY;

            // check for an avatar container for the ship
            const avatarContainerToModify = viewport?.getChildByName(
              shipAvatarNamer(userId),
              true
            ) as PIXI.Container;

            if (avatarContainerToModify) {
              // apply necessary positional updates to avatar
              avatarContainerToModify.position.x = positionX - AVATAR_RADIUS;
              avatarContainerToModify.position.y =
                positionY - AVATAR_RADIUS * 2 - AVATAR_LINE_LENGTH / 2;
            }

            // check for a bounding box for the ship
            const boundingBoxGraphicToModify = viewport?.getChildByName(
              shipBoundingBoxNamer(userId),
              true
            ) as PIXI.Graphics;

            if (boundingBoxGraphicToModify) {
              // apply necessary positional updates to avatar
              boundingBoxGraphicToModify.position.x = positionX - width / 2;
              boundingBoxGraphicToModify.position.y = positionY - height / 2;
            }

            if (
              trackingEnabled &&
              trackingTarget &&
              shipToModify.name === selfShip()?.name
            ) {
              trackTarget({ x: positionX, y: positionY });
            }
          }
        }
      );
      shipsWithUpdatedRotations?.forEach(({ userId, rotation }) => {
        const shipToModify = viewport?.getChildByName(
          shipNamer(userId),
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

  useEffect(() => {
    if (viewport) {
      if (settings.boundingBoxes) {
        const boundingBoxContainer = drawBoundingBoxes({
          celestials,
          boxColor: colors[colorsVar().secondary]['300'],
        });
        viewport.addChild(boundingBoxContainer);

        // ship bounding boxes are stored in our ref
        const shipBoundingBoxes = Object.values(shipBoundingBoxesRef.current);

        shipBoundingBoxes.forEach((boxGraphic) => {
          const alreadyAdded = viewport.getChildByName(boxGraphic.name);
          if (!alreadyAdded) {
            viewport.addChild(boxGraphic);
          }
        });
      } else {
        const boundingBoxObj = viewport.getChildByName('boundingBoxes');
        if (boundingBoxObj) {
          viewport.removeChild(boundingBoxObj);
          boundingBoxObj.destroy(true);
        }

        // remove our ship bounding boxes one by one
        Object.keys(shipBoundingBoxesRef.current).forEach(
          (boundingBoxGraphicName) => {
            const boundingBoxGraphic = viewport.getChildByName(
              boundingBoxGraphicName
            );
            if (boundingBoxGraphic) {
              viewport.removeChild(boundingBoxGraphic);
            }
          }
        );
      }
    }
  }, [viewport, settings.boundingBoxes]);

  useEffect(() => {
    if (viewport) {
      if (settings.avatars) {
        const avatars = Object.values(shipAvatarsRef.current);
        if (avatars.length) {
          avatars.forEach((avatar) => {
            const alreadyAdded = viewport.getChildByName(avatar.name);
            if (!alreadyAdded) {
              viewport.addChild(avatar);
            }
          });
        }
      } else {
        Object.keys(shipAvatarsRef.current).forEach((avatarContainerName) => {
          const avatarContainer = viewport.getChildByName(avatarContainerName);
          if (avatarContainer) {
            viewport.removeChild(avatarContainer);
          }
        });
      }
    }
  }, [viewport, settings.avatars]);

  return <></>;
};
