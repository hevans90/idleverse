import { useReactiveVar } from '@apollo/client';
import {
  Box,
  HTMLChakraProps,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import { systemEditorFocusVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { AnimatedFrame } from '@idleverse/ui';

import { runPlanetDiffLogic } from '../../_utils/2d-rendering-updates';
import { AsteroidBeltFocusUI } from './asteroid-focus';
import { CelestialFocusUI } from './celestial-focus';
import { GoldilocksFocusUI } from './goldilocks-focus';

type FocusUIProps = HTMLChakraProps<'div'>;

export const SystemEditorFocusUI = ({ ...divProps }: FocusUIProps) => {
  const focus = useReactiveVar(systemEditorFocusVar);

  const { rawBgDark } = useUiBackground();

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  const isMobile = bp === 'small';

  const savePlanetHandler = ({
    planet,
    mode,
  }: {
    planet: PlanetByIdQuery['planet_by_pk'];
    mode: 'new' | 'edit';
  }) => {
    runPlanetDiffLogic({
      planet,
      mode,
    });
  };

  return focus ? (
    <Box
      position={['fixed', 'static']}
      bottom={['unset', 0]}
      top={[0, 'unset']}
      left={0}
      right={'unset'}
      width={['100vw', '100%']}
      maxWidth={['unset', 300]}
      minW={['unset', 300]}
      {...divProps}
    >
      <AnimatedFrame
        show={true}
        leftBottom={false}
        leftTop={false}
        rightBottom={false}
        rightTop={isMobile ? false : true}
        bg={rawBgDark}
      >
        <VStack gap={2}>
          {focus === 'celestial' ? <CelestialFocusUI /> : null}
          {focus === 'goldilocks-zone' ? (
            <GoldilocksFocusUI
              onPlanetSave={({ planet, mode }) =>
                savePlanetHandler({ planet, mode })
              }
            />
          ) : null}
          {focus === 'asteroid-belt' ? <AsteroidBeltFocusUI /> : null}
        </VStack>
      </AnimatedFrame>
    </Box>
  ) : null;
};
