import { Container } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Container as PixiContainer, Rectangle } from 'pixi.js';
import { useRef } from 'react';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { PixiViewport } from '../../canvases/_utils/viewport';
import { StarField } from '../colyseus-poc/rendering/starfield';
import { StarEditor } from './star-editor';
import { CelestialSettings } from './ui/celestial-settings';

export const StarEditorContainer = () => {
  const size = useResize();

  const containerRef = useRef<PixiContainer>();

  const viewportRef = useRef<Viewport>(null);

  const worldSize = { width: 1600, height: 900 };

  return (
    <PixiWrapper showGameUI={false} ui={<CelestialSettings />}>
      <PixiViewport
        size={size}
        ref={viewportRef}
        screenWidth={size.width}
        screenHeight={size.height}
        worldHeight={worldSize.height}
        worldWidth={worldSize.width}
        initialZoom={4}
      >
        <StarField dimensions={worldSize} />

        <Container
          ref={containerRef}
          filterArea={new Rectangle(0, 0, size.width, size.height)}
          zIndex={2}
        >
          <StarEditor containerRef={containerRef} viewportRef={viewportRef} />
        </Container>
      </PixiViewport>
    </PixiWrapper>
  );
};
