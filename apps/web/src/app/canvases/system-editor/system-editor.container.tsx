import { Container } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Container as PixiContainer, Rectangle } from 'pixi.js';
import { useMemo, useRef, useState } from 'react';
import { StarRenderer } from '../../showreel/star-editor/star-renderer';
import { StarField } from '../_rendering/starfield';
import { PixiWrapper } from '../_utils/pixi-wrapper';
import { useResize } from '../_utils/use-resize.hook';
import { PixiViewport } from '../_utils/viewport';
import { SystemEditor } from './system-editor';

import { useReactiveVar } from '@apollo/client';
import { useBreakpointValue } from '@chakra-ui/react';
import { SystemFocus, systemEditorConfigVar } from '@idleverse/state';
import { Asteroids } from '../_rendering/asteroids';
import { PlanetContainer } from './planet.container';
import { SystemEditorFocusUI } from './ui/focus-ui';
import { SystemEditorOverview } from './ui/overview';

export const SystemEditorContainer = () => {
  const viewportRef = useRef<Viewport>(null);
  const containerRef = useRef<PixiContainer>();

  const dataURICanvasRef = useRef<HTMLCanvasElement>(null);

  const size = useResize();

  const worldSize = useMemo(() => ({ width: 3200, height: 1800 }), []);

  const center = useMemo(
    () => ({
      x: worldSize.width / 2,
      y: worldSize.height / 2,
    }),
    [worldSize]
  );

  const [celestualRadius, setCelestialRadius] = useState(1);

  const config = useReactiveVar(systemEditorConfigVar);

  const worldRadii = useMemo(() => {
    const map: { [key in SystemFocus]: number } = {
      celestial: celestualRadius * 500,
      'goldilocks-zone': worldSize.width / 2,
      'asteroid-belt': worldSize.width - worldSize.width / 8,
    };
    return map;
  }, [celestualRadius, worldSize.width]);

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  const isMobile = bp === 'small';

  return (
    <>
      <PixiWrapper
        showGameUI={false}
        ui={
          <>
            <SystemEditorOverview />
            <SystemEditorFocusUI />
          </>
        }
      >
        <PixiViewport
          size={size}
          ref={viewportRef}
          screenWidth={size.width}
          screenHeight={size.height}
          worldHeight={worldSize.height}
          worldWidth={worldSize.width}
          initialZoom={isMobile ? 0.05 : 0.1}
        >
          <StarField dimensions={worldSize} />

          <Asteroids
            center={center}
            dimensions={{
              innerRadius: worldRadii['asteroid-belt'] - 1000,
              outerRadius: worldRadii['asteroid-belt'] + 100,
            }}
          />

          <PlanetContainer
            canvasRef={dataURICanvasRef}
            viewportRef={viewportRef}
            center={center}
          />

          <SystemEditor
            viewportRef={viewportRef}
            worldSize={worldSize}
            worldRadii={worldRadii}
            center={center}
            isMobile={isMobile}
          />
          <Container
            ref={containerRef}
            filterArea={new Rectangle(0, 0, size.width, size.height)}
            zIndex={1}
          >
            <StarRenderer
              config={config.celestial.config}
              containerRef={containerRef}
              viewportRef={viewportRef}
              starRadius={celestualRadius}
            />
          </Container>
        </PixiViewport>
      </PixiWrapper>
      <canvas style={{ visibility: 'hidden' }} ref={dataURICanvasRef} />
    </>
  );
};
