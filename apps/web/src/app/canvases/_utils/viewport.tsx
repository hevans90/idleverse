/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PixiComponent, useApp } from '@pixi/react';
import { Viewport, type IViewportOptions } from 'pixi-viewport';
import { Application, Graphics } from 'pixi.js';
import { forwardRef } from 'react';

// we share the ticker and interaction from app
const PixiViewportComponent = PixiComponent('Viewport', {
  create(
    props: {
      app: Application;
      size: { width: number; height: number };
      children: number;
      gridDebug?: boolean;
    } & Partial<IViewportOptions>
  ) {
    const { app, ...viewportProps } = props;

    const viewport = new Viewport({
      ticker: props.app.ticker,
      events: props.app.renderer.events,
      ...viewportProps,
    });

    if (props.worldHeight && props.worldWidth) {
      viewport
        .fitWidth(props.worldWidth, false, false)
        .fitHeight(props.worldHeight, false, false)
        .drag()
        .decelerate()
        .pinch()
        .wheel({ trackpadPinch: true, wheelZoom: true });
      // .clampZoom({
      //   maxHeight: props.size.height * 2,
      //   minHeight: props.size.height / 2,
      // });
    }

    viewport.sortableChildren = true;

    if (props.gridDebug) {
      // const grid = drawGrid({
      //   width: props.worldWidth,
      //   height: props.worldHeight,
      //   columns: props.worldWidth / 200,
      //   rows: props.worldHeight / 200,
      //   gridColor: colors[colorsVar().secondary]['300'],
      // });
      // grid.name = 'debug-grid';
      // viewport.addChild(grid);

      const outline = new Graphics();
      outline
        .lineStyle(3, 0xff0000)
        .drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);
      viewport.addChild(outline);
    }

    return viewport;
  },
  applyProps(viewport, _oldProps, _newProps) {
    const { children: oldChildren, ...oldProps } = _oldProps;
    const { children: newChildren, ...newProps } = _newProps;

    const existingGrid = viewport.getChildByName('debug-grid');
    if (!newProps.gridDebug) {
      if (existingGrid) viewport.removeChild(existingGrid);
    }
    if (newProps.gridDebug) {
      if (existingGrid) {
        viewport.removeChild(existingGrid);
      }
    }

    viewport
      .fitWidth(newProps.worldWidth, false, false)
      .fitHeight(newProps.worldHeight, true, false);

    Object.keys(newProps).forEach((p) => {
      // @ts-ignore
      if (oldProps[p] !== newProps[p]) {
        // @ts-ignore
        viewport[p] = newProps[p];
      }
    });
  },
  didMount() {
    //
  },
});

// create a component that can be consumed
// that automatically pass down the app
export const PixiViewport = forwardRef<
  Viewport,
  Partial<IViewportOptions> & {
    children: any;
    size: { width: number; height: number };
    gridDebug?: boolean;
    initialPosition?: { x: number; y: number };
  }
>((props, ref) => (
  <PixiViewportComponent ref={ref} app={useApp()} {...props} />
));

PixiViewport.displayName = 'PixiViewport';
