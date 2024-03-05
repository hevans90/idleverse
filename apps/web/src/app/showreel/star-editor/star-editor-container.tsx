import { AppProvider, Container } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import {
  Application,
  Container as PixiContainer,
  Graphics as PixiGraphics,
  Rectangle,
} from 'pixi.js';
import { useCallback, useRef } from 'react';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { PixiViewport } from '../../canvases/_utils/viewport';
import { StarField } from '../colyseus-poc/rendering/starfield';
import { StarEditor } from './star-editor';
import { CelestialSettings } from './ui/celestial-settings';

const app = new Application();

export const StarEditorContainer = () => {
  const size = useResize();

  const containerRef = useRef<PixiContainer>();

  const viewportRef = useRef<Viewport>(null);

  const draw = useCallback((g: PixiGraphics) => {
    g.clear();

    g.beginFill(0xcdcdcd, 1);
    g.drawRect(size.width / 4, size.height / 4, 200, 50);

    g.endFill();
  }, []);

  return (
    <AppProvider value={app}>
      <PixiWrapper showGameUI={false} ui={<CelestialSettings />}>
        <PixiViewport
          size={size}
          ref={viewportRef}
          gridDebug={true}
          screenWidth={size.width}
          screenHeight={size.height}
          worldHeight={900}
          worldWidth={1600}
        >
          <StarField dimensions={size} />
          {/* <Graphics draw={draw} zIndex={3} /> */}
          <Container
            position={{ x: size.width / 2, y: size.height / 2 }}
            ref={containerRef}
            filterArea={new Rectangle(0, 0, size.width, size.height)}
            zIndex={2}
          >
            <StarEditor containerRef={containerRef} viewportRef={viewportRef} />
          </Container>
        </PixiViewport>
      </PixiWrapper>
    </AppProvider>
  );
};
