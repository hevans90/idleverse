import { useReactiveVar } from '@apollo/client';
import { Box, Theme, useTheme } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { planetGeneratorConfigVar } from '../../_state/reactive-variables';
import { themeColToHex } from '../common-utils/theme-col-to-hex';
import { useResize } from '../common-utils/use-resize.hook';
import { CameraController } from './camera-controller';
import { Pixelate } from './pixelate';
import { PlanetGeneratorControls } from './ui/controls';
import { World } from './world';

export const ThreeJsPlayground = () => {
  const { width } = useResize();

  const { colors } = useTheme<Theme>();

  const { pixelSize } = useReactiveVar(planetGeneratorConfigVar);

  return (
    <Box position="relative" width={`${width}px`} height="100%">
      <Canvas>
        <Suspense fallback={null}>
          <World weather={true} />
          <CameraController />
          <Pixelate
            bgColor={themeColToHex(colors.gray['800'])}
            pixelSize={pixelSize}
          />
        </Suspense>
      </Canvas>
      <PlanetGeneratorControls />
    </Box>
  );
};
