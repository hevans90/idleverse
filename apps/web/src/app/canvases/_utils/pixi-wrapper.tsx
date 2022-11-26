import { useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { hexStringToNumber } from '@idleverse/theme';
import { Stage } from '@saitonakamura/react-pixi';
import { useEffect, useState } from 'react';
import { GameUI } from '../../game-ui/game-ui';
import { useUiBackground } from '../../hooks/use-ui-background';
import { galacticEmpireVar, myEmpireVar } from '../../_state/galactic-empire';
import { useDisableWheelZoom } from './use-disable-wheel-zoom.hook';
import { controls, useResize } from './use-resize.hook';

export const PixiWrapper = (props: {
  children?: JSX.Element;
  ui?: JSX.Element;
  resizeControls?: controls;
  showGameUI?: boolean;
}) => {
  const { disableZoomCallback } = useDisableWheelZoom();

  const { canvasBg } = useUiBackground();

  const size = useResize(props.resizeControls || 'none');

  const galacticEmpire = useReactiveVar(galacticEmpireVar);
  const myEmpire = useReactiveVar(myEmpireVar);

  const [showGameUI, setShowGameUI] = useState<boolean>(props.showGameUI);

  useEffect(() => {
    if (props.showGameUI === undefined) {
      setShowGameUI(true);
    }
  }, [props]);

  return (
    <Box position="relative" height="100%" overflow="hidden">
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
      {galacticEmpire?.id && myEmpire && showGameUI && (
        <GameUI empireId={galacticEmpire.id} />
      )}
    </Box>
  );
};
