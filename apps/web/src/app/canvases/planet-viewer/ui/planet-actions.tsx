import {
  Box,
  Grid,
  GridItem,
  Heading,
  chakra,
  useToken,
} from '@chakra-ui/react';

import { useReactiveVar } from '@apollo/client';
import { Animator } from '@arwes/react-animator';
import { Dots } from '@arwes/react-bgs';
import { FrameSVGCorners, FrameSVGNefrex } from '@arwes/react-frames';
import { colorsVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { type ReactElement } from 'react';
import { responsiveFontProps } from '../../../_responsive-utils/font-props';

const FrameSVGWrapperBox = chakra(Box, {
  baseStyle: {},
});

type BuildItem = {
  name: string;
  icon: string;
};

const BuildItems = ({ items }: { items: BuildItem[] }) => {
  const { borderSecondary, bgDark, bg } = useUiBackground();
  const { secondary } = useReactiveVar(colorsVar);
  return (
    <Grid width="full" gap="6" gridTemplate={'repeat(2, 1fr) / repeat(6, 1fr)'}>
      {items.map((item, index) => {
        return (
          <GridItem
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="center"
            {...responsiveFontProps}
            position="relative"
            className="wrapper"
          >
            <FrameSVGWrapperBox
              _hover={{
                color: `${secondary}.300`,
                cursor: 'pointer',
              }}
              pointerEvents="all"
              sx={{
                '[data-name="bg"]': {
                  color: bgDark,
                  pointerEvents: 'all',
                },
                '.wrapper:hover & [data-name="bg"]': {
                  color: bg,
                },
                '[data-name="line"]': {
                  color: borderSecondary,
                },
              }}
            >
              <FrameSVGNefrex
                smallLineLength={100}
                largeLineLength={100}
                className="child"
              />
              <Box position="relative" padding={3}>
                {item.name}
              </Box>
            </FrameSVGWrapperBox>
          </GridItem>
        );
      })}
    </Grid>
  );
};
const testBuildItems: BuildItem[] = [
  {
    name: 'house',
    icon: 'house',
  },
  {
    name: 'farm',
    icon: 'farm',
  },
  {
    name: 'mine',
    icon: 'mine',
  },
];

export const PlanetActions = ({
  active,
}: {
  active: boolean;
}): ReactElement => {
  const { border, bgDark, bgDarker, bg, borderSecondary } = useUiBackground();

  const bgDarkHex = useToken('colors', bg);

  return (
    <Box bg={bgDark} borderTopColor={border} borderTopWidth={1}>
      <Animator duration={{ enter: 1, exit: 2 }} active={active}>
        <Box pos="relative">
          <Dots color={bgDarkHex} distance={24} />
          <Box p="6">
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              <FrameSVGWrapperBox
                pos="relative"
                w="full"
                p="6"
                sx={{
                  '[data-name="bg"]': {
                    color: bgDarker,
                  },
                  '[data-name="line"]': {
                    color: borderSecondary,
                  },
                }}
              >
                <FrameSVGCorners strokeWidth={2} />
                <Box position="relative">
                  <Heading size="md" mb="6">
                    Settlement
                  </Heading>

                  <BuildItems items={testBuildItems} />
                </Box>
              </FrameSVGWrapperBox>
            </Grid>
          </Box>
        </Box>
      </Animator>
    </Box>
  );
};
// ;
