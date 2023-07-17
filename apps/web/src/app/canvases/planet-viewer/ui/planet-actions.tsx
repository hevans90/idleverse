import {
  Box,
  Grid,
  GridItem,
  Heading,
  chakra,
  useToken,
} from '@chakra-ui/react';

import { Animator } from '@arwes/react-animator';
import { Dots } from '@arwes/react-bgs';
import { FrameSVGCorners, FrameSVGNefrex } from '@arwes/react-frames';
import { type ReactElement } from 'react';
import { useUiBackground } from '../../../../../../../libs/theme/src/lib/use-ui-background';

type PlanetActionsProps = {
  active: boolean;
};

const FrameSVGWrapperBox = chakra(Box, {
  baseStyle: {},
});

type BuildItem = {
  name: string;
  icon: string;
};

type BuildItemsProps = {
  items: BuildItem[];
};

const BuildItems = (props: BuildItemsProps) => {
  const { items } = props;
  return (
    <Grid gap="6" gridTemplate={'repeat(2, 1fr) / repeat(6, 1fr)'}>
      {items.map((item, index) => {
        return (
          <GridItem
            key={index}
            minWidth="0"
            aspectRatio={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xx-small"
            position="relative"
          >
            <FrameSVGWrapperBox
              sx={{
                '[data-name="bg"]': {
                  color: 'blackAlpha.100',
                },
                '[data-name="line"]': {
                  color: 'green.400',
                },
              }}
            >
              <FrameSVGNefrex />
            </FrameSVGWrapperBox>
            <Box position="relative">{item.name}</Box>
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

export const PlanetActions = (props: PlanetActionsProps): ReactElement => {
  const { active } = props;
  const { border, bgLight, bgDark, bgDarker } = useUiBackground();

  const bgDarkHex = useToken('colors', bgDark);

  return (
    <Box h="sm" bg={bgDarker} borderTopColor={border} borderTopWidth="1px">
      <Animator duration={{ enter: 2, exit: 2 }} active={active}>
        <Box pos="relative">
          <Dots color={bgDarkHex} distance={24} />
          <Box p="12">
            <Grid templateColumns="repeat(4, 1fr)" gap="6">
              <FrameSVGWrapperBox
                pos="relative"
                w="full"
                p="6"
                sx={{
                  '[data-name="bg"]': {
                    color: 'blackAlpha.500',
                  },
                  '[data-name="line"]': {
                    color: bgLight,
                  },
                }}
              >
                <FrameSVGCorners />
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
