import { Box } from '@chakra-ui/react';
import { Stage } from '@inlet/react-pixi';
import { useEffect, useState } from 'react';
import { loadPlanets } from '../../asset-loading/load-planets';
import { Loading } from '../../components/loading';
import { animateVar } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { SolarSystem } from './solar-system';
import { SolarSystemControls } from './ui/controls';

export const SolarSystemContainer = () => {
  const size = useResize();

  const [celestialSpritesLoading, setCelestialSpritesLoading] = useState(true);

  useEffect(() => {
    loadPlanets().then(() => setCelestialSpritesLoading(false));
  }, []);

  if (celestialSpritesLoading)
    return (
      <Loading width="100%" height="100%" text="Loading sprites"></Loading>
    );

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