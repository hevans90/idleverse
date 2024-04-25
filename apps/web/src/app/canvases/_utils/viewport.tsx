/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PixiComponent, useApp } from '@pixi/react';
import { Viewport, type IViewportOptions } from 'pixi-viewport';
import { Application } from 'pixi.js';
import { ReactNode, forwardRef } from 'react';
import { findChildrenByName } from './recursive-container-search';

export const updateScaledObjects = (viewport: Viewport) => {
  const preservedScaleObjects = findChildrenByName({
    container: viewport,
    nameSubstring: 'PRESERVE_SCALE',
  });
  preservedScaleObjects.forEach((object) => {
    object.scale.y = 1 / viewport.scale.y;
    object.scale.x = 1 / viewport.scale.x;
  });
};

// we share the ticker and interaction from app
const PixiViewportComponent = PixiComponent('Viewport', {
  create(
    props: {
      app: Application;
      size: { width: number; height: number };
      children: ReactNode;
      initialZoom?: number;
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
        .drag()
        .decelerate()
        .pinch()
        .wheel({ trackpadPinch: true, wheelZoom: true })
        .clampZoom({
          maxHeight: props.worldHeight * 8,
          minHeight: props.worldWidth / 16,
        });
    }

    if (props.initialZoom) {
      viewport.setZoom(props.initialZoom, true);
    }

    viewport.on('zoomed', () => {
      updateScaledObjects(viewport);
    });

    viewport.sortableChildren = true;

    return viewport;
  },
  applyProps(viewport, _oldProps, _newProps) {
    const { children: oldChildren, ...oldProps } = _oldProps;
    const { children: newChildren, ...newProps } = _newProps;

    Object.keys(newProps).forEach((p) => {
      // @ts-ignore
      if (oldProps[p] !== newProps[p]) {
        // @ts-ignore
        viewport[p] = newProps[p];
      }
    });

    viewport.moveCenter(newProps.worldWidth / 2, newProps.worldHeight / 2);
  },
  didMount() {
    //
  },
  config: {
    destroy: false,
  },
});

// create a component that can be consumed
// that automatically pass down the app
export const PixiViewport = forwardRef<
  Viewport,
  Partial<IViewportOptions> & {
    children: ReactNode;
    size: { width: number; height: number };
    initialZoom?: number;
  }
>((props, ref) => (
  <PixiViewportComponent ref={ref} app={useApp()} {...props} />
));

PixiViewport.displayName = 'PixiViewport';
