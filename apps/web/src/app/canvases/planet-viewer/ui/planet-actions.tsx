import { Box, chakra, useToken } from '@chakra-ui/react';

import { Animator } from '@arwes/react-animator';
import { Dots, GridLines, MovingLines } from '@arwes/react-bgs';
import { FrameSVGCorners } from '@arwes/react-frames';
import { type ReactElement } from 'react';
import { useUiBackground } from '../../../hooks/use-ui-background';

type PlanetActionsProps = {
  active: boolean;
};

const FrameSVGWrapperBox = chakra(Box, {
  baseStyle: {},
});

export const PlanetActions = (props: PlanetActionsProps): ReactElement => {
  const { bg, border, bgLight, bgDark } = useUiBackground();

  const bgLightHex = useToken('colors', bgLight);

  const { active } = props;
  return (
    <Box
      minW="xl"
      bg={bg}
      flex="1"
      borderRight="1px"
      borderRightColor={border}
      borderRightWidth="1px"
    >
      <Animator duration={{ interval: 2 }} active={active}>
        <Box h="100%" w="100%" pos="relative">
          <GridLines lineColor={bgLightHex} distance={48} />
          <Dots color={bgLightHex} distance={48} />
          <MovingLines lineColor={bgLightHex} distance={48} sets={20} />
          <Box p="12">
            <Box mb="12" />

            <FrameSVGWrapperBox
              pos="relative"
              w="full"
              h="sm"
              sx={{
                '[data-name="bg"]': {
                  color: bgDark,
                  opacity: 0.5,
                },
                '[data-name="line"]': {
                  color: bgLight,
                },
              }}
            >
              <FrameSVGCorners />
            </FrameSVGWrapperBox>
          </Box>
        </Box>
      </Animator>
    </Box>
  );
};
// ;
