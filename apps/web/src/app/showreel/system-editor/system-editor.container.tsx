import { Container } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Container as PixiContainer, Rectangle } from 'pixi.js';
import { useRef, useState } from 'react';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { PixiViewport } from '../../canvases/_utils/viewport';
import { StarField } from '../colyseus-poc/rendering/starfield';
import { StarEditor } from '../star-editor/star-editor';
import { SystemEditor } from './system-editor';

export const SystemEditorContainer = () => {
  const viewportRef = useRef<Viewport>(null);
  const containerRef = useRef<PixiContainer>();

  const size = useResize();

  const worldSize = { width: 3200, height: 1800 };

  const [starRadius, setStarRadius] = useState(1);

  return (
    <PixiWrapper showGameUI={false} ui={<></>}>
      <PixiViewport
        size={size}
        ref={viewportRef}
        screenWidth={size.width}
        screenHeight={size.height}
        worldHeight={worldSize.height}
        worldWidth={worldSize.width}
        initialZoom={0.5}
      >
        <StarField dimensions={worldSize} />

        <SystemEditor
          viewportRef={viewportRef}
          worldSize={worldSize}
          starRadius={starRadius}
        />
        <Container
          ref={containerRef}
          filterArea={new Rectangle(0, 0, size.width, size.height)}
          zIndex={1}
        >
          <StarEditor
            containerRef={containerRef}
            viewportRef={viewportRef}
            starRadius={starRadius}
          />
        </Container>
      </PixiViewport>
    </PixiWrapper>
  );
};
