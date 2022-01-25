/* eslint-disable react-hooks/exhaustive-deps */
import { CelestialByIdQuery } from '@idleverse/galaxy-gql';
import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useResize } from '../common-utils/use-resize.hook';
import { useViewport } from '../common-utils/use-viewport';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';

type CelestialViewerProps = {
  celestial: CelestialByIdQuery['celestial_by_pk'];
};

export const CelstialViewer = ({ celestial }: CelestialViewerProps) => {
  const app = useApp();

  const celestialContainerRef = useRef(new Container());

  const size = useResize();

  useViewport(app, size, celestialContainerRef, false);

  useFpsTracker(app, size);

  useEffect(() => {
    console.log(celestial);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
