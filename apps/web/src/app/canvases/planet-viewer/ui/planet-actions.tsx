import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  chakra,
  useToken,
} from '@chakra-ui/react';

import { useReactiveVar } from '@apollo/client';
import { Animator } from '@arwes/react-animator';
import { Dots } from '@arwes/react-bgs';
import { FrameSVGCorners, FrameSVGNefrex } from '@arwes/react-frames';
import { Resource_Generator } from '@idleverse/galaxy-gql';
import {
  colorsVar,
  empireResourcesVar,
  resourceGeneratorsVar,
  resourcesVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { useMemo, type ReactElement } from 'react';
import {
  copyResponsiveFontProps,
  responsiveFontProps,
} from '../../../_responsive-utils/font-props';

const FrameSVGWrapperBox = chakra(Box, {
  baseStyle: {},
});

type AffordableResourceGenerator = Resource_Generator & { affordable: boolean };

const ResourceGenerationSummary = ({
  generator: {
    resource_type_1_id,
    resource_type_2_id,
    generation_rate,
    image_url,
  },
}: {
  generator: Resource_Generator;
}) => {
  const resources = useReactiveVar(resourcesVar);

  const { resource1, resource2 } = useMemo(() => {
    const resource1 = resources.find(({ id }) => id === resource_type_1_id);
    const resource2 = resources.find(({ id }) => id === resource_type_2_id);

    return { resource1, resource2 };
  }, [resources, resource_type_1_id, resource_type_2_id]);

  return (
    <Flex direction="column" gap={1}>
      <Flex align="center" gap={1}>
        <Text {...copyResponsiveFontProps}>+{generation_rate[0]}</Text>
        <Image
          float="left"
          width="25px"
          height="25px"
          src={resource1.image_url}
          fallbackSrc="/placeholders/150x150.png"
        />
      </Flex>
      {resource2 && (
        <Flex align="center" gap={1}>
          <Text {...copyResponsiveFontProps}>+{generation_rate[1]}</Text>
          <Image
            float="left"
            width="25px"
            height="25px"
            src={resource2.image_url}
            fallbackSrc="/placeholders/150x150.png"
          />
        </Flex>
      )}
    </Flex>
  );
};

const BuildItems = ({ items }: { items: Resource_Generator[] }) => {
  const { borderSecondary, bgDark, bg } = useUiBackground();
  const { secondary } = useReactiveVar(colorsVar);

  const empireResources = useReactiveVar(empireResourcesVar);

  const affordableGenerators = useMemo<AffordableResourceGenerator[]>(
    () =>
      items.map(({ cost_amount_1, cost_resource_type_id_1, ...rest }) => {
        const resource = empireResources.find(
          ({ id }) => id === cost_resource_type_id_1
        );
        return {
          affordable: !!resource && resource.value > cost_amount_1,
          cost_amount_1,
          cost_resource_type_id_1,
          ...rest,
        };
      }),
    [items, empireResources]
  );

  return (
    <Grid
      width="full"
      gap="6"
      gridTemplate={[
        'repeat(1, 1fr) / repeat(2, 1fr)',
        'repeat(1, 1fr) / repeat(3, 1fr)',
        'repeat(1, 1fr) / repeat(4, 1fr)',
        'repeat(1, 1fr) / repeat(4, 1fr)',
        'repeat(1, 1fr) / repeat(5, 1fr)',
        'repeat(1, 1fr) / repeat(6, 1fr)',
      ]}
    >
      {affordableGenerators.map((item, index) => {
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
              <Flex
                position="relative"
                justify="space-between"
                align="center"
                textDecorationColor={`${secondary}.600`}
                {...responsiveFontProps}
              >
                <Text textDecoration="underline">{item.name}</Text>

                <ResourceGenerationSummary generator={item} />
              </Flex>
              <Box
                position="relative"
                opacity={0.75}
                {...copyResponsiveFontProps}
              >
                {item.description}
              </Box>
              <Button
                padding={3}
                isDisabled={!item.affordable}
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
