/* eslint-disable react-hooks/exhaustive-deps */
import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { timeVar } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { useViewport } from '../common-utils/use-viewport';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';

export const GravitySimulation = () => {
  const app = useApp();

  const size = useResize('solar-system');

  const gravitySimContainerRef = useRef(new Container());

  useFpsTracker(app, size);

  useViewport(app, size, gravitySimContainerRef, false);

  useEffect(() => {
    gravitySimContainerRef.current.x = size.width / 2;
    gravitySimContainerRef.current.y = size.height / 2;

    gravitySimContainerRef.current.sortableChildren = true;

    app.ticker.add(() => {
      timeVar(timeVar() + 1);
    });

    app.ticker.add(() => {
      // eslint-disable-next-line prefer-const
    });
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
