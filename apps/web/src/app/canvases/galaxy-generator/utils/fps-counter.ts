import { useReactiveVar } from '@apollo/client';
import { indicatorFactory } from '@idleverse/pixi-utils';
import { Application, Text, TickerCallback } from 'pixi.js';
import { useEffect, useRef } from 'react';

import { fpsVar } from '../../../_state/global-settings';

const fpsText = indicatorFactory('FPS: ', 50, 100, 'fpsCounter');
const frameTimeText = indicatorFactory('Frametime: ', 50, 150, 'frameTime');

export const useFpsTracker = (app: Application) => {
  const fps = useReactiveVar(fpsVar);

  const fpsUpdateTickerRef = useRef<TickerCallback<unknown>>(() => {
    (app.stage.getChildByName('fpsCounter') as Text).text = `FPS: ${Math.ceil(
      app.ticker.FPS
    )}`;

    (
      app.stage.getChildByName('frameTime') as Text
    ).text = `Frame time: ${Math.ceil(app.ticker.deltaMS)}`;
  });

  useEffect(() => {
    if (fps && app?.stage) {
      app.stage.addChild(fpsText, frameTimeText);
      app.ticker.add(fpsUpdateTickerRef.current);
    }

    return () => {
      try {
        app.stage?.removeChild(fpsText);
        app.stage?.removeChild(frameTimeText);
        app.ticker?.remove(fpsUpdateTickerRef.current);
      } catch (e) {
        console.warn(e);
      }
    };
  }, [fps, app]);
};
