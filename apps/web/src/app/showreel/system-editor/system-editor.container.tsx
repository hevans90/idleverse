import { Container } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Container as PixiContainer, Rectangle } from 'pixi.js';
import { useMemo, useRef, useState } from 'react';
import { StarField } from '../../canvases/_rendering/starfield';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { PixiViewport } from '../../canvases/_utils/viewport';
import { StarRenderer } from '../star-editor/star-renderer';
import { SystemEditor } from './system-editor';

import { useReactiveVar } from '@apollo/client';
import { SystemFocus, systemEditorConfigVar } from '@idleverse/state';
import { Asteroids } from '../../canvases/_rendering/asteroids';
import { SystemEditorFocusUI } from './ui/focus-ui';
import { SystemEditorOverview } from './ui/overview';

export const SystemEditorContainer = () => {
  const viewportRef = useRef<Viewport>(null);
  const containerRef = useRef<PixiContainer>();

  const size = useResize();

  const worldSize = { width: 3200, height: 1800 };

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
      'asteroid-belt': worldSize.width - worldSize.width / 10,
    };
    return map;
  }, [celestualRadius, worldSize.width]);

  console.log(worldRadii);

  return (
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
        initialZoom={0.15}
      >
        <StarField dimensions={worldSize} />

        <Asteroids
          center={center}
          dimensions={{
            innerRadius: worldRadii['asteroid-belt'] - 1000,
            outerRadius: worldRadii['asteroid-belt'] + 100,
          }}
        />

        <SystemEditor
          viewportRef={viewportRef}
          worldSize={worldSize}
          worldRadii={worldRadii}
          center={center}
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
  );
};
