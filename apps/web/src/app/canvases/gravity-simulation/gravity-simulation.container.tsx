import { Box } from '@chakra-ui/react';
import { Stage } from '@inlet/react-pixi';
import { animateVar } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { GravitySimulation } from './gravity-simulation';
import { GravitySimulationControls } from './ui/gravity-simulation-controls';

export const GravitySimulationContainer = () => {
  const size = useResize();

  return (
    <Box position="relative">
      <Stage
        {...size}
        options={{
          backgroundColor: 0x2d3239,
          antialias: true,
        }}
        onUnmount={() => animateVar(false)}
      >
        <GravitySimulation />
      </Stage>
      <GravitySimulationControls />
    </Box>
  );
};
