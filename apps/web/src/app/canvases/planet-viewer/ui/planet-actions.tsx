import {
  Box,
  Button,
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
    <Grid
      width="full"
      gap="6"
      gridTemplate={[
        'repeat(1, 1fr) / repeat(4, 1fr)',
        'repeat(1, 1fr) / repeat(5, 1fr)',
        'repeat(1, 1fr) / repeat(6, 1fr)',
      ]}
    >
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
            <FrameSVGWrapperBox
              pointerEvents="all"
              padding={3}
              display="flex"
              flexDir="column"
              gap={2}
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
              <FrameSVGNefrex smallLineLength={100} largeLineLength={200} />
              <Box
                position="relative"
                textDecoration="underline"
                textDecorationColor={`${secondary}.600`}
                {...responsiveFontProps}
              >
                {item.name}
              </Box>
              <Box
                position="relative"
                opacity={0.75}
                {...copyResponsiveFontProps}
              >
                {item.description}
              </Box>
              <Button
                padding={3}
                isDisabled={true}
                onClick={() => {
                  //
                }}
              >
                +
              </Button>
            </FrameSVGWrapperBox>
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
