import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Text,
  chakra,
  useToken,
} from '@chakra-ui/react';

import { useMutation, useReactiveVar } from '@apollo/client';
import { Animator } from '@arwes/react-animator';
import { Dots } from '@arwes/react-bgs';
import { FrameSVGCorners, FrameSVGNefrex } from '@arwes/react-frames';
import {
  PurchaseResourceGeneratorDocument,
  PurchaseResourceGeneratorMutation,
  PurchaseResourceGeneratorMutationVariables,
  Resource_Generator,
} from '@idleverse/galaxy-gql';
import {
  colorsVar,
  empireResourcesVar,
  galacticEmpireVar,
  resourceGeneratorsVar,
  resourcesVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { useMemo, type ReactElement } from 'react';
import {
  copyResponsiveFontProps,
  responsiveFontProps,
  responsiveIconProps,
} from '../../../_responsive-utils/font-props';

import { PlusPixelIcon } from '@idleverse/ui';

const FrameSVGWrapperBox = chakra(Box, {
  baseStyle: {},
});

type AffordableResourceGenerator = Resource_Generator & {
  count: number;
  affordable: boolean;
  costForNext: {
    resourceId: string;
    resourceName: string;
    resourceImage: string;
    amount: number;
  };
};

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

  const empire = useReactiveVar(galacticEmpireVar);
  const empireResources = useReactiveVar(empireResourcesVar);

  const affordableGenerators = useMemo<AffordableResourceGenerator[]>(
    () =>
      items.map(({ id, cost_amount_1, cost_resource_type_id_1, ...rest }) => {
        const resource = empireResources.find(
          ({ id }) => id === cost_resource_type_id_1
        );

        if (!resource) {
          // don't allow this generator to appear unless the empire has the unlocked resource
          return undefined;
        }

        const costForNext = {
          resourceId: resource.id,
          resourceName: resource.name,
          resourceImage: resource.imageUrl,
          amount: cost_amount_1,
        };

        const generator = resource.generators.find(
          ({ id: generatorId }) => generatorId === id
        );

        if (generator) {
          costForNext.amount = generator.costForNext.find(
            ({ resourceId }) => resourceId === resource.id
          )?.amount;
        }

        return {
          count: generator?.count ?? 0,
          id,
          affordable: !!resource && resource.value >= costForNext.amount,
          cost_amount_1,
          cost_resource_type_id_1,
          costForNext,
          ...rest,
        };
      }),
    [items, empireResources]
  );

  const [purchaseResourceGenerator, { loading: purchaseInProgress }] =
    useMutation<
      PurchaseResourceGeneratorMutation,
      PurchaseResourceGeneratorMutationVariables
    >(PurchaseResourceGeneratorDocument);

  return (
    <Grid
      width="full"
      gap="6"
      gridTemplate={
        empireResources?.length
          ? [
              'repeat(1, 1fr) / repeat(2, 1fr)',
              'repeat(1, 1fr) / repeat(3, 1fr)',
              'repeat(1, 1fr) / repeat(4, 1fr)',
              'repeat(1, 1fr) / repeat(4, 1fr)',
              'repeat(1, 1fr) / repeat(5, 1fr)',
              'repeat(1, 1fr) / repeat(6, 1fr)',
            ]
          : ''
      }
    >
      {empireResources?.length
        ? affordableGenerators.map((item, index) => {
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
                    {...responsiveFontProps}
                  >
                    <Text
                      textDecoration="underline"
                      textDecorationColor={`${secondary}.400`}
                    >
                      {item.name}
                    </Text>

                    <ResourceGenerationSummary generator={item} />
                  </Flex>
                  <Text
                    position="relative"
                    color={`${secondary}.200`}
                    {...copyResponsiveFontProps}
                  >
                    Owned: {item.count}
                  </Text>
                  <Box
                    position="relative"
                    opacity={0.75}
                    {...copyResponsiveFontProps}
                  >
                    {item.description}
                  </Box>
                  <Button
                    display="flex"
                    gap={2}
                    padding={3}
                    isLoading={purchaseInProgress}
                    isDisabled={!item.affordable}
                    onClick={() => {
                      purchaseResourceGenerator({
                        variables: {
                          galacticEmpireId: empire.id,
                          resourceGeneratorId: item.id,
                        },
                      });
                    }}
                    {...copyResponsiveFontProps}
                  >
                    <Icon
                      as={PlusPixelIcon}
                      {...responsiveIconProps}
                      color={`${secondary}.300`}
                    />
                    <Flex gap={1} alignItems="center">
                      {item.costForNext.amount}
                      <Image
                        float="left"
                        width="25px"
                        height="25px"
                        src={item.costForNext.resourceImage}
                        fallbackSrc="/placeholders/150x150.png"
                      />
                    </Flex>
                  </Button>
                </FrameSVGWrapperBox>
              </GridItem>
            );
          })
        : 'Your empire has no resources unlocked. Try completing some quests to get started.'}
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
    <Box bg={bgDark} borderTopColor={border} borderTopWidth={1}>
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
