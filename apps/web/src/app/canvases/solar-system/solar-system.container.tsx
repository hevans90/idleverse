import { Box } from '@chakra-ui/react';
import { Stage } from '@inlet/react-pixi';
import { animateVar } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { SolarSystem } from './solar-system';
import { SolarSystemControls } from './ui/controls';

export const SolarSystemContainer = () => {
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
        <SolarSystem />
      </Stage>
      <SolarSystemControls />
    </Box>
  );
};
