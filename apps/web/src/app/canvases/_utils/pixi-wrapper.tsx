import { useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { hexStringToNumber } from '@idleverse/theme';
import { Stage } from '@inlet/react-pixi';
import { Dialog } from '../../game-ui/dialog';
import { InGameMenu } from '../../game-ui/in-game-menu';
import { useUiBackground } from '../../hooks/use-ui-background';
import { DialogVar } from '../../_state/dialog';
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

  const { entries } = useReactiveVar(DialogVar);

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
      <InGameMenu />
      <Dialog
        entries={entries}
        position="absolute"
        bottom={0}
        left={0}
      ></Dialog>
    </Box>
  );
};