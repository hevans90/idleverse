import { Box, Theme, useTheme } from '@chakra-ui/react';
import { Stage } from '@inlet/react-pixi';
import { animateVar } from '../../_state/reactive-variables';
import { themeColToHex } from '../_utils/theme-col-to-hex';
import { useResize } from '../_utils/use-resize.hook';
import { GameUIBottomBar } from '../galaxy-generator/ui/bottom-bar';
import { GravitySimulation } from './gravity-simulation';
import {
  galaxySimControlsHeight,
  GravitySimulationControls,
} from './ui/gravity-simulation-controls';

export const GravitySimulationContainer = () => {
  const size = useResize();

  const { colors } = useTheme<Theme>();

  return (
    <Box position="relative">
      <Stage
        {...size}
        options={{
          backgroundColor: themeColToHex(colors.gray['800']),
          antialias: true,
        }}
        onUnmount={() => animateVar(false)}
      >
        <GravitySimulation />
      </Stage>
      <GravitySimulationControls />
      <GameUIBottomBar bottom={galaxySimControlsHeight} />
    </Box>
  );
};
