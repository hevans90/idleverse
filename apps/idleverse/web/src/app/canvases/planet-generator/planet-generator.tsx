import { useReactiveVar } from '@apollo/client';
import { Box, Theme, useTheme } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { DataTexture } from 'three';
import {
  planetGenerationColorDrawerVar,
  planetGenerationRingDrawerVar,
  planetGenerationTerrainDrawerVar,
  planetGeneratorConfigVar,
} from '../../_state/planet-generation';
import {
  themeColToHex,
  themeColToRGB,
} from '../_utils/theme-colour-conversions';
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

  const [worldDataTexture, setWorldDataTexture] =
    useState<DataTexture>(undefined);

  const [ringDataTexture, setRingDataTexture] =
    useState<DataTexture>(undefined);

  useEffect(() => {
    runTextureGenOnWorker(
      'perlin',
      textureResolution,
      [water, sand, grass, forest],
      terrainBias,
      10,
      seed
    ).then((texture) => setWorldDataTexture(texture));
  }, [textureResolution, water, sand, grass, forest, terrainBias, seed]);

  useEffect(() => {
    runTextureGenOnWorker(
      'perlin',
      1024,
      [
        themeColToRGB(colors.orange['900']),
        themeColToRGB(colors.gray['600']),
        themeColToRGB(colors.orange['800']),
        themeColToRGB(colors.gray['900']),
      ],
      [0.6, 0.65, 0.7, 0.8],
      10,
      seed
    ).then((texture) => setRingDataTexture(texture));
  }, []);

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
              ringTexture={ringDataTexture}
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
