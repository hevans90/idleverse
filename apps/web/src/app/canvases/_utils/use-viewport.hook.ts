import { useReactiveVar } from '@apollo/client';
import { indicatorFactory } from '@idleverse/pixi-utils';
import { colorsVar, debugVar } from '@idleverse/state';
import { colors } from '@idleverse/theme';
import { IClampZoomOptions, Viewport } from 'pixi-viewport';
import { Application, Container, Graphics, Text } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { drawGrid } from './draw-grid';

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
  const grid = useRef<Container>(null);

  const debug = useReactiveVar(debugVar);

  const worldWidth = worldSize ? worldSize.width : size.width;
  const worldHeight = worldSize ? worldSize.height : size.height;

  const viewportRef = useRef<Viewport>();

  const sizeIndicator = useRef<Text>();

  useEffect(() => {
    if (!viewportRef.current && app?.renderer) {
      viewportRef.current = new Viewport({
        screenWidth: size.width,
        screenHeight: size.height,
        worldWidth,
        worldHeight,
        disableOnContextMenu: true,
        ticker: app.ticker,
        events: app.renderer.events,
      });
      viewportRef.current.sortableChildren = true;
    }

    if (!sizeIndicator.current) {
      sizeIndicator.current = indicatorFactory(
        'viewport:',
        50,
        size.height - 200,
        'sizeIndicator'
      );
    }
  }, [app]);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.screenHeight = size.height;
      viewportRef.current.screenWidth = size.width;
      viewportRef.current.worldWidth = worldSize ? worldSize.width : size.width;
      viewportRef.current.worldHeight = worldSize
        ? worldSize.height
        : size.height;
      viewportRef.current.fitWorld();
      viewportRef.current.moveCenter(worldWidth / 2, worldHeight / 2);
    }
  }, [size]);

  useEffect(() => {
    if (viewportRef?.current) {
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

        grid.current = drawGrid({
          width: worldWidth ?? size.width,
          height: size.height,
          columns: 16,
          rows: 9,
          gridColor: colors[colorsVar().secondary]['300'],
        });
        viewportRef.current.addChild(grid.current);
      }

      viewportRef.current.fitWorld();
      viewportRef.current.moveCenter(worldWidth / 2, worldHeight / 2);

      if (!app.stage.getChildByName('viewport')) {
        app.stage.addChild(viewportRef.current);
      }
    }

    return () => {
      try {
        // this will also remove any children (debug outline etc)
        viewportRef.current.removeChild(outline.current);
        viewportRef.current.removeChild(grid.current);
        app.stage?.removeChild(viewportRef.current);
        app.stage?.removeChild(sizeIndicator.current);
      } catch (e) {
        console.warn(e);
        // this can throw if react-pixi destroys the stage, from routing etc.
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.stage, containerRef, size, debug]);

  return viewportRef.current;
};
