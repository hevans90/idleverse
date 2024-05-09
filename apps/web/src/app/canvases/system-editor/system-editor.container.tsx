import { Container } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Container as PixiContainer, Rectangle } from 'pixi.js';
import { useCallback, useMemo, useRef, useState } from 'react';
import { StarRenderer } from '../../showreel/star-editor/star-renderer';
import { StarField } from '../_rendering/starfield';
import { PixiWrapper } from '../_utils/pixi-wrapper';
import { useResize } from '../_utils/use-resize.hook';
import { PixiViewport } from '../_utils/viewport';
import { SystemEditorInteractions } from './system-editor-interactions';

import { useReactiveVar } from '@apollo/client';
import { useBreakpointValue } from '@chakra-ui/react';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import {
  SystemFocus,
  planetGenerationColorDrawerVar,
  systemEditorConfigVar,
} from '@idleverse/state';
import { Asteroids } from '../_rendering/asteroids';
import { randomPointInAnnulus } from '../_utils/random-point-in-annulus';
import { PlanetContainer } from './planet.container';
import { SystemEditorFocusUI } from './ui/focus-ui';
import { SystemEditorOverview } from './ui/overview';

export const SystemEditorContainer = () => {
  const viewportRef = useRef<Viewport>(null);
  const containerRef = useRef<PixiContainer>();

  const dataURICanvasRef = useRef<HTMLCanvasElement>(null);

  const size = useResize();

  const worldSize = useMemo(() => ({ width: 8000, height: 8000 }), []);

  const center = useMemo(
    () => ({
      x: worldSize.width / 2,
      y: worldSize.height / 2,
    }),
    [worldSize]
  );

  const { currentHexPalette, terrainBias } = useReactiveVar(
    planetGenerationColorDrawerVar
  );

  const [celestialRadius, setCelestialRadius] = useState(0.25);

  const worldRadii = useMemo(() => {
    const map: { [key in SystemFocus]: { inner: number; outer: number } } = {
      celestial: { inner: 0, outer: celestialRadius * (worldSize.width / 3) },
      'goldilocks-zone': {
        inner: worldSize.width / 2 - worldSize.width / 6,
        outer: worldSize.width / 2,
      },
      'asteroid-belt': {
        inner: worldSize.width - worldSize.width / 4,
        outer: worldSize.width - worldSize.width / 8,
      },
    };
    return map;
  }, [celestialRadius, worldSize.width]);

  const randomGoldilocksRadii = useCallback(
    () =>
      randomPointInAnnulus({
        dimensions: {
          innerRadius: worldRadii['goldilocks-zone'].inner,
          outerRadius: worldRadii['goldilocks-zone'].outer,
        },
        center,
      }).radius,
    [worldRadii, center]
  );

  const [planets, setPlanets] = useState<PlanetByIdQuery[]>([
    {
      planet_by_pk: {
        celestial: null,
        orbital_radius: randomGoldilocksRadii(),
        owner_id: '1',
        atmospheric_distance: 1,
        rings: [],
        texture_resolution: 1024,
        name: 'dummy planet',
        id: 'showreel-planet',
        radius: 1,
        terrain_bias: terrainBias,
        terrain_hex_palette: {
          ...currentHexPalette,
          name: 'nice',
          id: '1',
        },
      },
    },
    {
      planet_by_pk: {
        celestial: null,
        orbital_radius: randomGoldilocksRadii(),
        owner_id: '1',
        atmospheric_distance: 1,
        rings: [],
        texture_resolution: 512,
        name: 'dummy planet 2',
        id: 'showreel-planet2',
        radius: 0.5,
        terrain_bias: terrainBias,
        terrain_hex_palette: {
          ...currentHexPalette,
          name: 'nice',
          id: '1',
        },
      },
    },
  ]);

  const config = useReactiveVar(systemEditorConfigVar);

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  const isMobile = bp === 'small';

  const initialScale = isMobile ? 0.05 : 0.1;

  return (
    <>
      <PixiWrapper
        showGameUI={false}
        ui={
          <>
            <SystemEditorOverview />
            <SystemEditorFocusUI planets={planets} />
          </>
        }
        bg="darker"
      >
        <PixiViewport
          size={size}
          ref={viewportRef}
          screenWidth={size.width}
          screenHeight={size.height}
          worldHeight={worldSize.height}
          worldWidth={worldSize.width}
          initialZoom={initialScale}
        >
          <StarField
            center={center}
            dimensions={worldSize}
            initialScale={initialScale}
            numberOfStars={5000}
            radius={worldSize.width * 4}
          />

          <Asteroids
            center={center}
            dimensions={{
              innerRadius: worldRadii['asteroid-belt'].inner,
              outerRadius: worldRadii['asteroid-belt'].outer,
            }}
          />

          <PlanetContainer
            canvasRef={dataURICanvasRef}
            viewportRef={viewportRef}
            center={center}
            planets={planets}
          />

          <SystemEditorInteractions
            viewportRef={viewportRef}
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
              starRadius={celestialRadius}
            />
          </Container>
        </PixiViewport>
      </PixiWrapper>
      <canvas style={{ visibility: 'hidden' }} ref={dataURICanvasRef} />
    </>
  );
};
