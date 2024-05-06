import { useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { hexStringToNumber, useUiBackground } from '@idleverse/theme';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Suspense, useEffect, useRef, useState } from 'react';
import { DataTexture } from 'three';
import { Loading } from '../../components/loading';

import { RingConfig } from '@idleverse/models';
import {
  planetGenerationColorDrawerVar,
  planetGenerationRingDrawerVar,
  planetGeneratorConfigVar,
} from '@idleverse/state';
import { useResize } from '../_utils/use-resize.hook';
import { deepCompareRings } from './_utils/deep-compare-rings';
import { CameraController } from './camera-controller';
import { Pixelate } from './pixelate';
import { Stars } from './stars';
import { runTextureGenOnWorker } from './texture-generation/run-texture-gen-on-worker';
import { PlanetGeneratorBooleans } from './ui/booleans';
import { PlanetGeneratorColorDrawer } from './ui/color-drawer';
import { NameSeedMobile } from './ui/name-seed-mobile';
import { PlanetGeneratorRingDrawer } from './ui/ring-drawer';
import {
  PlanetGeneratorSliders,
  planetGenerationControlsHeight,
} from './ui/sliders';

import { World } from './world';

export const PlanetGenerator = ({
  customSize,
}: {
  customSize?: { width: number; height: number };
}) => {
  const { rawBgDarker } = useUiBackground();

  const { width, height } = useResize('planet-gen');

  const containerRef = useRef<HTMLDivElement>();

  const {
    ui,
    seed,
    pixelSize,
    atmosphere,
    rotate,
    atmosphericDistance,
    textureResolution,
    radius,
  } = useReactiveVar(planetGeneratorConfigVar);

  const {
    currentPalette: { water, sand, grass, forest },
    terrainBias,
  } = useReactiveVar(planetGenerationColorDrawerVar);

  const { rings } = useReactiveVar(planetGenerationRingDrawerVar);

  const prevRingsRef = useRef<RingConfig[]>([]);

  const [worldDataTexture, setWorldDataTexture] =
    useState<DataTexture>(undefined);

  const [ringDataTextures, setRingDataTextures] = useState<{
    [ringId: string]: DataTexture;
  }>(undefined);

  useEffect(() => {
    console.log(
      `%cTEXTURE gen running for PLANET (perlin)`,
      'background: #222; color: #F96444'
    );
    runTextureGenOnWorker(
      'perlin',
      textureResolution,
      [water, sand, grass, forest],
      terrainBias,
      seed
    ).then((texture) => setWorldDataTexture(texture));
  }, [textureResolution, water, sand, grass, forest, terrainBias, seed]);

  useEffect(() => {
    const { updates, additions, deletions } = deepCompareRings(
      [...prevRingsRef.current],
      [...rings]
    );

    // processing deletions first makes more sense
    deletions.forEach((id) => delete ringDataTextures[id]);

    const updatesToRegen = updates
      .filter(({ regenTexture }) => regenTexture === true)
      .map(({ config }) => config);

    [...updatesToRegen, ...additions].forEach(
      ({ type, id, resolution, colors: ringColors, terrainBias }) => {
        runTextureGenOnWorker(
          type === 'rocky'
            ? 'perlin'
            : type === 'banded'
            ? 'banded'
            : 'simplex',
          resolution,
          ringColors,
          terrainBias,
          id
        ).then((texture) =>
          setRingDataTextures((prev) => ({ ...prev, [id]: texture }))
        );
      }
    );

    prevRingsRef.current = [...rings];
  }, [JSON.stringify(rings)]);

  return (
    <>
      <Box
        ref={containerRef}
        position="relative"
        width={`${customSize?.width || width}px`}
        height={
          ui
            ? `${customSize?.height || height}px`
            : `${
                (customSize?.height || height) + planetGenerationControlsHeight
              }`
        }
      >
        <Suspense
          fallback={
            <Loading width="100%" height="100%" text="Rendering planet" />
          }
        >
          <Canvas>
            <Stars rotationSpeed={0.1} />
            <World
              planetRadius={radius}
              worldTexture={worldDataTexture}
              ringTextures={ringDataTextures}
              atmosphere={atmosphere}
              rotate={rotate}
              atmosphericDistance={atmosphericDistance}
              rings={rings}
            />
            <CameraController />
            <Pixelate
              bgColor={hexStringToNumber(rawBgDarker)}
              pixelSize={pixelSize}
            />
            <OrbitControls
              minPolarAngle={Math.PI / 16}
              maxPolarAngle={Math.PI - Math.PI / 16}
              minDistance={3}
              maxDistance={200}
            />
          </Canvas>
        </Suspense>
      </Box>

      <PlanetGeneratorBooleans />

      {ui && (
        <>
          <PlanetGeneratorColorDrawer />
          <NameSeedMobile />

          <PlanetGeneratorRingDrawer />
          <PlanetGeneratorSliders />
        </>
      )}
    </>
  );
};
