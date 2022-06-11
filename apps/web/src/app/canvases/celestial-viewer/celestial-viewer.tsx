/* eslint-disable react-hooks/exhaustive-deps */
import { CelestialByIdQuery } from '@idleverse/galaxy-gql';
import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useRef } from 'react';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport';

type CelestialViewerProps = {
  celestial: CelestialByIdQuery['celestial_by_pk'];
};

export const CelstialViewer = ({ celestial }: CelestialViewerProps) => {
  const app = useApp();

  const celestialContainerRef = useRef(new Container());

  const size = useResize();

  useViewport(app, size, celestialContainerRef);

  useFpsTracker(app, size);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
