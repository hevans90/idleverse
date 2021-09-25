import { useSubscription } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { Stage } from '@inlet/react-pixi';
import { GalaxiesDocument, GalaxiesSubscription } from '../_graphql/api';
import { animate } from '../_state/reactive-variables';
import { GalaxyGenerator } from './galaxy-generator';
import { GameUIBottomBar } from './ui/bottom-bar';
import { GeneratorControls } from './ui/generator-controls';
import { GameUIRightBar } from './ui/right-bar';
import { GameUITopLeftBar } from './ui/top-left-bar';
import { useResize } from './utils/use-resize.hook';

export const GalaxyGenContainer = () => {
  const { data, loading } =
    useSubscription<GalaxiesSubscription>(GalaxiesDocument);

  const size = useResize();
  if (loading) {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        loading galaxy generator...
      </Box>
    );
  } else if (data) {
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
          <GalaxyGenerator />
        </Stage>
        <GameUITopLeftBar />
        <GameUIBottomBar />
        <GameUIRightBar />
        <GeneratorControls />
      </Box>
    );
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no universe.
      </Box>
    );
  }
};
