import { useReactiveVar } from '@apollo/client';
import { Box, Theme, useTheme } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { DataTexture } from 'three';
import { RingConfig } from '../../_state/models';
import {
  planetGenerationColorDrawerVar,
  planetGenerationRingDrawerVar,
  planetGenerationTerrainDrawerVar,
  planetGeneratorConfigVar,
} from '../../_state/planet-generation';
import { themeColToHex } from '../_utils/theme-colour-conversions';
import { useResize } from '../_utils/use-resize.hook';
import { CameraController } from './camera-controller';
import { Pixelate } from './pixelate';
import { runTextureGenOnWorker } from './texture-generation/run-texture-gen-on-worker';
import { PlanetGeneratorBooleans } from './ui/booleans';
import { PlanetGeneratorColorDrawer } from './ui/color-drawer';
import { PlanetGeneratorRingDrawer } from './ui/ring-drawer';
import {
  planetGenerationControlsHeight,
  PlanetGeneratorSliders,
} from './ui/sliders';
import { PlanetGeneratorTerrainDrawer } from './ui/terrain-drawer';
import { World } from './world';
import { deepCompareRings } from './_utils/deep-compare-rings';

export const PlanetGenerator = () => {
  const { width, height } = useResize('planet-gen');

  const { colors } = useTheme<Theme>();

  const {
    ui,
    seed,
    pixelSize,
    atmosphere,
    rotate,
    atmosphericDistance,
    textureResolution,
  } = useReactiveVar(planetGeneratorConfigVar);

  const {
    currentPalette: { water, sand, grass, forest },
  } = useReactiveVar(planetGenerationColorDrawerVar);

  const { terrainBias } = useReactiveVar(planetGenerationTerrainDrawerVar);
  const { rings } = useReactiveVar(planetGenerationRingDrawerVar);

  const prevRingsRef = useRef<RingConfig[]>([]);

  const [worldDataTexture, setWorldDataTexture] =
    useState<DataTexture>(undefined);

  const [ringDataTextures, setRingDataTextures] =
    useState<{ [ringId: string]: DataTexture }>(undefined);

  useEffect(() => {
    runTextureGenOnWorker(
      'perlin',
      textureResolution,
      [water, sand, grass, forest],
      terrainBias,
      seed
    ).then((texture) => setWorldDataTexture(texture));
  }, [textureResolution, water, sand, grass, forest, terrainBias, seed]);

  useEffect(() => {
    console.log('prev', prevRingsRef.current);
    console.log('curr', rings);

    const { updates, additions, deletions } = deepCompareRings(
      [...prevRingsRef.current],
      [...rings]
    );

    console.log(deepCompareRings(prevRingsRef.current, rings));

    const updatesToRegen = updates
      .filter(({ regenTexture }) => regenTexture === true)
      .map(({ config }) => config);

    [...updatesToRegen, ...additions].forEach(
      ({ type, id, resolution, colors: ringColors, terrainBias }) => {
        console.log('new run', id);
        runTextureGenOnWorker(
          type === 'rocky'
            ? 'perlin'
            : type === 'solid'
            ? 'regular'
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
        position="relative"
        width={`${width}px`}
        height={
          ui ? `${height}px` : `${height + planetGenerationControlsHeight}`
        }
      >
        <Canvas>
          <Suspense fallback={null}>
            <World
              worldTexture={worldDataTexture}
              ringTextures={ringDataTextures}
              atmosphere={atmosphere}
              rotate={rotate}
              atmosphericDistance={atmosphericDistance}
              rings={rings}
            />
            <CameraController />
            <Pixelate
              bgColor={themeColToHex(colors.gray['800'])}
              pixelSize={pixelSize}
            />
          </Suspense>
        </Canvas>
      </Box>

      <PlanetGeneratorBooleans />

      {ui && (
        <>
          <PlanetGeneratorColorDrawer />

          <PlanetGeneratorTerrainDrawer />
          <PlanetGeneratorRingDrawer />
          <PlanetGeneratorSliders />
        </>
      )}
    </>
  );
};
