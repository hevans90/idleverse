import { Box } from '@chakra-ui/react';
import { Stage } from '@inlet/react-pixi';
import { animate } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { GameUITopLeftBar } from '../common-utils/top-left-bar';
import { SolarSystem } from './solar-system';

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
        onUnmount={() => animate(false)}
      >
        <SolarSystem />
      </Stage>
      <GameUITopLeftBar />
    </Box>
  );
};
