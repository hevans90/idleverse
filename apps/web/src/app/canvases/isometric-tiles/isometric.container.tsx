import { Box, Theme, useTheme } from '@chakra-ui/react';
import { hexStringToNumber } from '@idleverse/theme';
import { Stage } from '@inlet/react-pixi';
import { useResize } from '../_utils/use-resize.hook';
import { IsometricTiles } from './isometric-tiles';

export const IsometricContainer = () => {
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
      >
        <IsometricTiles />
      </Stage>
      {/* UI with absolute positioning */}
    </Box>
  );
};
