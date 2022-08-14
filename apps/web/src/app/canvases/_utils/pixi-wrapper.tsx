import { Box } from '@chakra-ui/react';
import { hexStringToNumber } from '@idleverse/theme';
import { Stage } from '@inlet/react-pixi';
import { GameUI } from '../../game-ui/game-ui';
import { useUiBackground } from '../../hooks/use-ui-background';
import { useDisableWheelZoom } from './use-disable-wheel-zoom.hook';
import { controls, useResize } from './use-resize.hook';

export const PixiWrapper = (props: {
  children?: JSX.Element;
  ui?: JSX.Element;
  resizeControls?: controls;
}) => {
  const { disableZoomCallback } = useDisableWheelZoom();

  const { canvasBg } = useUiBackground();

  const size = useResize(props.resizeControls || 'none');

  return (
    <Box position="relative">
      <Box ref={disableZoomCallback}>
        <Stage
          {...size}
          options={{
            backgroundColor: hexStringToNumber(canvasBg),
            antialias: true,
          }}
        >
          {props?.children}
        </Stage>
      </Box>
      {props?.ui}
      <GameUI />
    </Box>
  );
};
