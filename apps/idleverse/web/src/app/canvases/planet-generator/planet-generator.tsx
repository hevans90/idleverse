import { useReactiveVar } from '@apollo/client';
import { Box, Theme, useTheme } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { DataTexture } from 'three';
import { planetGeneratorConfigVar } from '../../_state/reactive-variables';
import {
  themeColToHex,
  themeColToRGB,
} from '../_utils/theme-colour-conversions';
import { useResize } from '../_utils/use-resize.hook';
import { CameraController } from './camera-controller';
import { Pixelate } from './pixelate';
import { runTextureGenOnWorker } from './texture-generation/run-texture-gen-on-worker';
import { textureColorMap } from './texture-generation/texture-generators';
import { PlanetGeneratorControls } from './ui/controls';
import { World } from './world';

export const PlanetGenerator = () => {
  const { width, height } = useResize('planet-gen');

  const { colors } = useTheme<Theme>();

  const {
    pixelSize,
    atmosphere,
    rotate,
    atmosphericDistance,
    textureResolution,
  } = useReactiveVar(planetGeneratorConfigVar);

  const [dataTexture, setDataTexture] = useState<DataTexture>(undefined);

  useEffect(() => {
    const textureColors: textureColorMap = {
      water: themeColToRGB(colors.blue['500']),
      sand: themeColToRGB(colors.orange['300']),
      grass: themeColToRGB(colors.green['500']),
      forest: themeColToRGB(colors.green['700']),
    };

    runTextureGenOnWorker('perlin', textureResolution, textureColors).then(
      (texture) => setDataTexture(texture)
    );
  }, [textureResolution, colors]);

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
      <PlanetGeneratorControls />
    </>
  );
};
