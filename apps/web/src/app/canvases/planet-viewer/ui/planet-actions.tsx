import { Box, chakra, theme } from '@chakra-ui/react';

import { Animator } from '@arwes/react-animator';
import { Dots, GridLines, MovingLines } from '@arwes/react-bgs';
import { FrameSVGCorners } from '@arwes/react-frames';
import { type ReactElement } from 'react';

type PlanetActionsProps = {
  active: boolean;
};

const frameSVGCornersStyles = `
path[data-name="bg"]: {
  fill: 'green' !important,
},
path[data-name="line"]: {
  stroke: 'pink' !important,
}`;

const FrameSVGWrapperBox = chakra(Box, {
  baseStyle: {
    '[data-name="bg"]': {
      color: 'blackAlpha.500',
    },
    '[data-name="line"]': {
      color: 'pink',
    },
  },
});

export const PlanetActions = (props: PlanetActionsProps): ReactElement => {
  const whiteAlpha = theme.colors.whiteAlpha;

  const { active } = props;
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: frameSVGCornersStyles,
        }}
      />
      <Box
        minW="xl"
        bg="blackAlpha.500"
        flex="1"
        borderRight="1px"
        borderRightColor={whiteAlpha['500']}
        borderRightWidth="1px"
      >
        <Animator duration={{ interval: 2 }} active={active}>
          <Box h="100%" w="100%" pos="relative">
            <GridLines lineColor={whiteAlpha['200']} distance={48} />
            <Dots color={whiteAlpha['200']} distance={48} />
            <MovingLines
              lineColor={whiteAlpha['100']}
              distance={48}
              sets={20}
            />
            <Box p="12">
              <Box mb="12" />

              <FrameSVGWrapperBox pos="relative" w="full" h="sm" sx={{}}>
                <FrameSVGCorners />
              </FrameSVGWrapperBox>
            </Box>
          </Box>
        </Animator>
      </Box>
    </>
  );
};
// ;
