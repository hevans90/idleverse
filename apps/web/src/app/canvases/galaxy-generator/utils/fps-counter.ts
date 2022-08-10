import { useReactiveVar } from '@apollo/client';
import { Application, Text, TickerCallback } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { fpsVar } from '../../../_state/global-settings';
import { indicatorFactory } from './indicator-factory';

export const useFpsTracker = (
  app: Application,
  size: { width: number; height: number }
) => {
  const fps = useReactiveVar(fpsVar);

  const fpsUpdateTickerRef = useRef<TickerCallback<unknown>>(() => {
    (app.stage.getChildByName('fpsCounter') as Text).text = `FPS: ${Math.ceil(
      app.ticker.FPS
    )}`;

    (
      app.stage.getChildByName('frameTime') as Text
    ).text = `Frame time: ${Math.ceil(app.ticker.deltaMS)}`;
  });

  const fpsText = useRef<Text>(
    indicatorFactory('FPS: ', 50, 100, 'fpsCounter')
  );
  const frameTimeText = useRef<Text>(
    indicatorFactory('Frametime: ', 50, 150, 'frameTime')
  );

  useEffect(() => {
    if (fps) {
      app.stage.addChild(fpsText.current, frameTimeText.current);
      app.ticker.add(fpsUpdateTickerRef.current);
    }

    return () => {
      try {
        app.stage.removeChild(fpsText.current);
        app.stage.removeChild(frameTimeText.current);
        app.ticker.remove(fpsUpdateTickerRef.current);
      } catch (e) {
        console.warn(e);
      }
    };
  }, [fps]);
};
