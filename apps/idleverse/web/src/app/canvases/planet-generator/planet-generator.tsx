import { useReactiveVar } from '@apollo/client';
import { Box, Theme, useTheme } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { wrap } from 'comlink';
import { Suspense, useState, useEffect } from 'react';
import { DataTexture } from 'three';
import { planetGeneratorConfigVar } from '../../_state/reactive-variables';
import { themeColToHex } from '../common-utils/theme-col-to-hex';
import { useResize } from '../common-utils/use-resize.hook';
import { CameraController } from './camera-controller';
import { Pixelate } from './pixelate';
import { runTextureGenOnWorker } from './texture-generation/run-texture-gen-on-worker';
import { PlanetGeneratorControls } from './ui/controls';
import { World } from './world';

export const PlanetGenerator = () => {
  const { width, height } = useResize('planet-gen');

  const { colors } = useTheme<Theme>();

  const { pixelSize, weather, rotate, atmosphericDistance } = useReactiveVar(
    planetGeneratorConfigVar
  );

  const [dataTexture, setDataTexture] = useState<DataTexture>(undefined);

  useEffect(() => {
    runTextureGenOnWorker('perlin').then((texture) => setDataTexture(texture));
  }, []);

  return (
    <>
      <Box position="relative" width={`${width}px`} height={`${height}px`}>
        <Canvas>
          <Suspense fallback={null}>
            <World
              worldTexture={dataTexture}
              weather={weather}
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
