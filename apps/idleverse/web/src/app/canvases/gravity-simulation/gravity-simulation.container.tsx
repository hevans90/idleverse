import { Box, Theme, useTheme } from '@chakra-ui/react';
import { Stage } from '@inlet/react-pixi';
import { animateVar } from '../../_state/reactive-variables';
import { GameUIBottomBar } from '../galaxy-generator/ui/bottom-bar';
import { hexStringToNumber } from '../_utils/theme-colour-conversions';
import { useResize } from '../_utils/use-resize.hook';
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
          backgroundColor: hexStringToNumber(colors.gray['800']),
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
