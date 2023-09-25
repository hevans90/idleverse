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
import { Resource_Generator } from '@idleverse/galaxy-gql';
import { colorsVar, resourceGeneratorsVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { type ReactElement } from 'react';
import {
  copyResponsiveFontProps,
  responsiveFontProps,
} from '../../../_responsive-utils/font-props';

const FrameSVGWrapperBox = chakra(Box, {
  baseStyle: {},
});

const BuildItems = ({ items }: { items: Resource_Generator[] }) => {
  const { borderSecondary, bgDark, bg } = useUiBackground();
  const { secondary } = useReactiveVar(colorsVar);
  return (
    <Grid width="full" gap="6" gridTemplate={'repeat(1, 1fr) / repeat(4, 1fr)'}>
      {items.map((item, index) => {
        return (
          <GridItem
            key={index}
            display="flex"
            flexDir="column"
            alignItems="start"
            justifyContent="center"
            {...responsiveFontProps}
            position="relative"
            gap={2}
          >
            <Box
              textDecoration="underline"
              textDecorationColor={`${secondary}.600`}
            >
              {item.name}
            </Box>
            <Box {...copyResponsiveFontProps}>{item.description}</Box>
            <Box className="wrapper">
              <FrameSVGWrapperBox
                position="relative"
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
                <FrameSVGNefrex smallLineLength={100} largeLineLength={100} />
                <Box position="relative" padding={3}>
                  Build
                </Box>
              </FrameSVGWrapperBox>
            </Box>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export const PlanetActions = ({
  active,
}: {
  active: boolean;
}): ReactElement => {
  const { border, bgDark, bgDarker, bg, borderSecondary } = useUiBackground();

  const bgDarkHex = useToken('colors', bg);

  const generators = useReactiveVar(resourceGeneratorsVar);

  return (
    <Box flexGrow={1} bg={bgDark} borderTopColor={border} borderTopWidth={1}>
      <Animator duration={{ enter: 1, exit: 2 }} active={active}>
        <Box pos="relative">
          <Dots color={bgDarkHex} distance={24} />
          <Box p="6">
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

                <BuildItems items={generators} />
              </Box>
            </FrameSVGWrapperBox>
          </Box>
        </Box>
      </Animator>
    </Box>
  );
};
// ;
