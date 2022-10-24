import { useReactiveVar } from '@apollo/client';
import { IClampZoomOptions, Viewport } from 'pixi-viewport';
import { Application, Container, Graphics, Text } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { debugVar } from '../../_state/global-settings';
import { indicatorFactory } from '../galaxy-generator/utils/indicator-factory';

/**
 * when the screen is resized, this effect will reset the viewport's screen dimensions & then re-center
 */
export const useViewport = ({
  app,
  size,
  containerRef,
  center = true,
  worldSize,
  clampZoom,
  clampDrag,
}: {
  app: Application;
  size: { width: number; height: number };
  containerRef?: React.MutableRefObject<Container>;
  center?: boolean;
  worldSize?: { width: number; height: number };
  clampZoom?: IClampZoomOptions;
  clampDrag?: boolean;
}) => {
  const outline = useRef<Graphics>(null);

  const debug = useReactiveVar(debugVar);

  const worldWidth = worldSize ? worldSize.width : size.width;
  const worldHeight = worldSize ? worldSize.height : size.height;

  const viewportRef = useRef<Viewport>(
    new Viewport({
      screenWidth: size.width,
      screenHeight: size.height,
      worldWidth,
      worldHeight,

      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      interaction: app.renderer.plugins.interaction,
      disableOnContextMenu: true,
      ticker: app.ticker,
    })
  );

  const sizeIndicator = useRef<Text>(
    indicatorFactory('viewport:', 50, size.height - 200, 'sizeIndicator')
  );

  useEffect(() => {
    viewportRef.current.screenHeight = size.height;
    viewportRef.current.screenWidth = size.width;
    viewportRef.current.worldWidth = worldSize ? worldSize.width : size.width;
    viewportRef.current.worldHeight = worldSize
      ? worldSize.height
      : size.height;
    viewportRef.current.fitWorld();
    viewportRef.current.moveCenter(worldWidth / 2, worldHeight / 2);
  }, [size]);

  useEffect(() => {
    viewportRef.current.name = 'viewport';
    viewportRef.current.drag().decelerate().pinch().wheel();

    if (clampDrag) {
      viewportRef.current.clamp({ direction: 'all' });
    }
    viewportRef.current.clampZoom(
      clampZoom || { minWidth: 500, maxWidth: 5000 }
    );

    if (containerRef) {
      if (center) {
        containerRef.current.x = size.width / 2;
        containerRef.current.y = size.height / 2;
      }

      containerRef.current.position.x = worldWidth / 2;
      containerRef.current.position.y = worldHeight / 2;
      viewportRef.current.addChild(containerRef.current);
    }

    if (debug) {
      outline.current = new Graphics();
      outline.current
        .lineStyle(3, 0xff0000)
        .drawRect(
          0,
          0,
          viewportRef.current.worldWidth,
          viewportRef.current.worldHeight
        );
      viewportRef.current.addChild(outline.current);

      sizeIndicator.current.text = `width: ${size.width}\n\nheight: ${size.height}`;

      app.stage.addChild(sizeIndicator.current);
    }

    viewportRef.current.fitWorld();
    viewportRef.current.moveCenter(worldWidth / 2, worldHeight / 2);

    if (!app.stage.getChildByName('viewport')) {
      app.stage.addChild(viewportRef.current);
    }

    return () => {
      try {
        // this will also remove any children (debug outline etc)
        viewportRef.current.removeChild(outline.current);
        app.stage.removeChild(viewportRef.current);
        app.stage.removeChild(sizeIndicator.current);
      } catch (e) {
        // this can throw if react-pixi destroys the stage, from routing etc.
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.stage, containerRef, size, debug]);

  return viewportRef.current;
};
