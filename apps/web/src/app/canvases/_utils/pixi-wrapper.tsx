import { useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { hexStringToNumber, useUiBackground } from '@idleverse/theme';
import { Stage } from '@pixi/react';
import { ReactNode, useEffect, useState } from 'react';

import { galacticEmpireVar, myEmpireVar } from '@idleverse/state';
import { GameUI } from '../../game-ui/game-ui';
import { useDisableWheelZoom } from './use-disable-wheel-zoom.hook';
import { controls, useResize } from './use-resize.hook';

export const PixiWrapper = (props: {
  children?: ReactNode;
  ui?: JSX.Element;
  resizeControls?: controls;
  showGameUI?: boolean;
  bg?: 'dark' | 'darker';
}) => {
  const { disableZoomCallback } = useDisableWheelZoom();

  const { rawBgDarker, rawBgDark } = useUiBackground();

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
            backgroundColor: hexStringToNumber(
              props?.bg === 'darker' ? rawBgDarker : rawBgDark
            ),
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
