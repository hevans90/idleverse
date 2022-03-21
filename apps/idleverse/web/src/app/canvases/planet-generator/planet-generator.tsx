import { useReactiveVar } from '@apollo/client';
import { Box, Theme, useTheme } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { DataTexture } from 'three';
import {
  planetGenerationColorDrawerVar,
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
import { PlanetGeneratorSliders } from './ui/sliders';
import { PlanetGeneratorTerrainDrawer } from './ui/terrain-drawer';
import { World } from './world';

export const PlanetGenerator = () => {
  const { width, height } = useResize('planet-gen');

  const { colors } = useTheme<Theme>();

  const {
    seed,
    pixelSize,
    atmosphere,
    rotate,
    atmosphericDistance,
    textureResolution,
  } = useReactiveVar(planetGeneratorConfigVar);

  const { currentPalette } = useReactiveVar(planetGenerationColorDrawerVar);
  const { terrainBias } = useReactiveVar(planetGenerationTerrainDrawerVar);

  const [dataTexture, setDataTexture] = useState<DataTexture>(undefined);

  useEffect(() => {
    runTextureGenOnWorker(
      'perlin',
      textureResolution,
      currentPalette,
      terrainBias,
      10,
      seed
    ).then((texture) => setDataTexture(texture));
  }, [textureResolution, currentPalette, terrainBias, seed]);

  return (
    <>
      <Box position="relative" width={`${width}px`} height={`${height}px`}>
        <Canvas>
          <Suspense fallback={null}>
            <World
              worldTexture={dataTexture}
              atmosphere={atmosphere}
              rotate={rotate}
              atmosphericDistance={atmosphericDistance}
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
      <PlanetGeneratorColorDrawer />
      <PlanetGeneratorTerrainDrawer />
      <PlanetGeneratorSliders />
    </>
  );
};
