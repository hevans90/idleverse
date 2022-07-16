import { useReactiveVar } from '@apollo/client';
import { Viewport } from 'pixi-viewport';
import { Application, Container, Graphics, Text } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { debugVar } from '../../_state/persisted-reactive-variables';
import { indicatorFactory } from '../galaxy-generator/utils/indicator-factory';

/**
 * when the screen is resized, this effect will reset the viewport's screen dimensions & then re-center
 */
export const useViewport = (
  app: Application,
  size: { width: number; height: number },
  containerRef?: React.MutableRefObject<Container>,
  center = true
) => {
  const outline = useRef<Graphics>(null);

  const debug = useReactiveVar(debugVar);

  const viewportRef = useRef<Viewport>(null);

  const sizeIndicator = useRef<Text>(
    indicatorFactory('viewport:', 50, size.height - 200, 'sizeIndicator')
  );

  useEffect(() => {
    viewportRef.current = new Viewport({
      screenWidth: size.width,
      screenHeight: size.height,
      worldWidth: size.width,
      worldHeight: size.height,

      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      interaction: app.renderer.plugins.interaction,
    });

    viewportRef.current.drag().pinch().wheel().decelerate();
    viewportRef.current.clampZoom({ minWidth: 500, maxWidth: 5000 });
    viewportRef.current.clamp({ direction: 'all' });

    viewportRef.current.screenHeight = size.height;
    viewportRef.current.screenWidth = size.width;

    app.stage.addChild(viewportRef.current);
    if (containerRef) {
      if (center) {
        containerRef.current.x = size.width / 2;
        containerRef.current.y = size.height / 2;
      }

      viewportRef.current.addChild(containerRef.current);
    }
    viewportRef.current.fitWorld(true);

    if (debug) {
      outline.current = new Graphics();
      outline.current
        .lineStyle(5, 0xff0000)
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
    return () => {
      try {
        // this will also remove any children (debug outline etc)
        app.stage.removeChild(viewportRef.current);

        app.stage.removeChild(sizeIndicator.current);
      } catch (e) {
        // this can throw if react-pixi destroys the stage, from routing etc.
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.stage, containerRef, size, debug]);
};
