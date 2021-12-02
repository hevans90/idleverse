import { Box } from '@chakra-ui/react';
import { SolarSystem } from './canvases/solar-system/solar-system';
import { SolarSystemControls } from './canvases/solar-system/ui/controls';

export const local = window.location.origin.includes('localhost');

export const App = () => {
  return (
    <Box>
      <SolarSystem />
      <SolarSystemControls />
    </Box>
  );
};
