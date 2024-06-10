import { Container } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Container as PixiContainer, Rectangle } from 'pixi.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StarRenderer } from '../../showreel/star-editor/star-renderer';
import { StarField } from '../_rendering/starfield';
import { PixiWrapper } from '../_utils/pixi-wrapper';
import { useResize } from '../_utils/use-resize.hook';
import { PixiViewport } from '../_utils/viewport';
import { SystemEditorInteractions } from './system-editor-interactions';

import { useReactiveVar } from '@apollo/client';
import { HStack, VStack, useBreakpointValue } from '@chakra-ui/react';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import { RingConfig, RingKey, rgb } from '@idleverse/models';
import {
  CelestialAudioName,
  SystemFocus,
  celestialViewerGenerationVar,
  celestialViewerSelectedPlanet,
  colorPalettesVar,
  dialogVar,
  planetGenerationColorDrawerVar,
  planetGenerationRingDrawerVar,
  planetGeneratorConfigVar,
  systemEditorConfigVar,
  systemEditorFocusVar,
} from '@idleverse/state';
import { hexToRGB, useUiBackground } from '@idleverse/theme';
import { AnimatedFrame } from '@idleverse/ui';
import { Dialog } from '../../game-ui/dialog';
import { Asteroids } from '../_rendering/asteroids';
import { randomPointInAnnulus } from '../_utils/random-point-in-annulus';
import { PlanetGenerator } from '../planet-generator/planet-generator';
import { PlanetContainer } from './planet.container';
import { SystemEditorFocusUI } from './ui/focus-ui';
import { SystemEditorOverview } from './ui/overview';
import { useCelestialAudio } from './use-celestial-audio.hook';

export const SystemEditorContainer = () => {
  const viewportRef = useRef<Viewport>(null);
  const containerRef = useRef<PixiContainer>();

  const { rawBgDarker } = useUiBackground();

  const dataURICanvasRef = useRef<HTMLCanvasElement>(null);

  const palettes = useReactiveVar(colorPalettesVar);
  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanet);

  const { open: dialogOpen } = useReactiveVar(dialogVar);

  const size = useResize(dialogOpen ? 'dialog' : 'none');
  const sizeWithoutDialog = useResize();

  const { mode, formingPoints } = useReactiveVar(celestialViewerGenerationVar);

  const [locallySelectedAudioName, setLocallySelectedAudioName] =
    useState<CelestialAudioName>('welcome');

  const { audioRef } = useCelestialAudio({
    locallySelectedName: locallySelectedAudioName,
    isOpen: true,
  });

  const worldSize = useMemo(() => ({ width: 8000, height: 8000 }), []);

  const center = useMemo(
    () => ({
      x: worldSize.width / 2,
      y: worldSize.height / 2,
    }),
    [worldSize]
  );

  const { palettePresetName, terrainBias } = useReactiveVar(
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
        texture_resolution: 128,
        name: 'terran',
        id: 'showreel-planet',
        radius: 1,
        terrain_bias: [0, 0.65, 0.73, 0.82],
        terrain_hex_palette: palettes?.[0],
      },
    },
    {
      planet_by_pk: {
        celestial: null,
        orbital_radius: randomGoldilocksRadii(),
        owner_id: '1',
        atmospheric_distance: 1,
        rings: [],
        texture_resolution: 256,
        name: 'desert',
        id: 'showreel-planet2',
        radius: 0.5,
        terrain_bias: [0, 0.5, 0.62, 0.9],
        terrain_hex_palette: palettes?.[1],
      },
    },
  ]);

  const focus = useReactiveVar(systemEditorFocusVar);

  const config = useReactiveVar(systemEditorConfigVar);

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  const isMobile = bp === 'small';
  const initialScale = isMobile ? 0.05 : 0.1;

  useEffect(() => {
    if (selectedPlanet) {
      const planet = planets.find(
        ({ planet_by_pk }) => planet_by_pk.id === selectedPlanet.id
      ).planet_by_pk;

      planetGeneratorConfigVar({
        ...planetGeneratorConfigVar(),
        atmosphericDistance: planet.atmospheric_distance,
        name: planet.name,
        orbitalRadius: planet.orbital_radius,
        seed: planet.id,
        textureResolution: planet.texture_resolution,
        radius: planet.radius,
      });

      planetGenerationColorDrawerVar({
        panelOpen: false,
        terrainBias: planet.terrain_bias as [number, number, number, number],
        palettePresetName: planet.terrain_hex_palette.name,
      });

      planetGenerationRingDrawerVar({
        panelOpen: false,
        rings: planet.rings.map(
          (ring) =>
            ({
              ...ring,
              id: ring.id ?? '',
              type: ring.type as RingKey,
              rotation: ring.rotation as [x: number, y: number, z: number],
              innerRadius: ring.inner_radius,
              outerRadius: ring.outer_radius,
              terrainBias: ring.terrain_bias as [
                number,
                number,
                number,
                number
              ],
              colors: ring.colors.map((color) => hexToRGB(color)) as [
                rgb,
                rgb,
                rgb,
                rgb
              ],
            } as RingConfig)
        ),
      });
    }
  }, [selectedPlanet, planets]);

  return (
    <>
      <PixiWrapper showGameUI={false} bg="darker">
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
            canvasHeight={size.height}
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
              size={size}
            />
          </Container>
        </PixiViewport>
      </PixiWrapper>
      <canvas style={{ visibility: 'hidden' }} ref={dataURICanvasRef} />
      <audio ref={audioRef} />

      <SystemEditorOverview
        onHelpClicked={(help) => {
          setLocallySelectedAudioName(help);
          audioRef.current.play().catch((e) => {
            //
          });
          dialogVar({ ...dialogVar(), open: true });
        }}
        onDirectFocusClicked={() => dialogVar({ ...dialogVar(), open: false })}
      />
      <HStack
        position="absolute"
        bottom={0}
        justifyContent="end"
        alignItems="end"
        gap={0}
      >
        {focus && (
          <VStack maxWidth={isMobile ? 'unset' : 300}>
            <AnimatedFrame
              show={!!selectedPlanet}
              bg={rawBgDarker}
              leftBottom={!isMobile ? false : true}
              containerProps={{
                height: [
                  sizeWithoutDialog.height / 4,
                  sizeWithoutDialog.height / 3,
                ],
                width: ['100vw', '100%'],
                position: ['fixed', 'relative'],
                top: ['20vh', 'unset'],
                left: [0, 'unset'],
                display: isMobile && dialogOpen ? 'none' : 'block',
              }}
            >
              <PlanetGenerator stars={false} fullUI={false} />
            </AnimatedFrame>

            <SystemEditorFocusUI
              planets={planets}
              display={isMobile && dialogOpen ? 'none' : 'block'}
            />
          </VStack>
        )}
        <Dialog
          position="static"
          onDialogEnded={() => {
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
          }}
        />
      </HStack>
    </>
  );
};
