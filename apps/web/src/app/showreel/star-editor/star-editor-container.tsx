import { useReactiveVar } from '@apollo/client';
import { celestialSettingsVar } from '@idleverse/state';
import { Container } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Container as PixiContainer, Rectangle } from 'pixi.js';
import { useRef } from 'react';
import { StarField } from '../../canvases/_rendering/starfield';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { PixiViewport } from '../../canvases/_utils/viewport';
import { StarRenderer } from './star-renderer';
import { StarSettings } from './ui/star-settings';

export const StarEditorContainer = () => {
  const size = useResize();

  const containerRef = useRef<PixiContainer>();

  const viewportRef = useRef<Viewport>(null);

  const worldSize = { width: 1600, height: 900 };

  const starConfig = useReactiveVar(celestialSettingsVar);

  return (
    <PixiWrapper showGameUI={false} ui={<StarSettings />}>
      <PixiViewport
        size={size}
        ref={viewportRef}
        screenWidth={size.width}
        screenHeight={size.height}
        worldHeight={worldSize.height}
        worldWidth={worldSize.width}
        initialZoom={4}
      >
        <StarField
          center={{ x: 0, y: 0 }}
          dimensions={worldSize}
          initialScale={4}
        />

        <Container
          ref={containerRef}
          filterArea={new Rectangle(0, 0, size.width, size.height)}
          zIndex={2}
        >
          <StarRenderer
            config={starConfig}
            containerRef={containerRef}
            viewportRef={viewportRef}
            size={size}
          />
        </Container>
      </PixiViewport>
    </PixiWrapper>
  );
};
