import { Container, useApp } from '@pixi/react';
import { Container as PixiContainer } from 'pixi.js';
import { useRef } from 'react';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport.hook';

export const SystemEditor = () => {
  const size = useResize();
  const app = useApp();

  const containerRef = useRef<PixiContainer>();

  useViewport({
    app,
    size,
    containerRef: containerRef,
    clampDrag: true,
    worldSize: { width: size.width * 2, height: size.height * 2 },
  });

  return <Container ref={containerRef}></Container>;
};
