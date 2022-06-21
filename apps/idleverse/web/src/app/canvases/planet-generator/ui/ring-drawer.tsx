/* eslint-disable react/jsx-no-useless-fragment */
import { useReactiveVar } from '@apollo/client';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderProps,
  RangeSliderThumb,
  RangeSliderTrack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Theme,
  Tr,
  useColorModeValue,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { Fragment, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { RingConfig, RingKey, RING_TYPES } from '../../../_state/models';
import { planetGenerationRingDrawerVar } from '../../../_state/planet-generation';
import { hexToRGB, rgbToHex } from '../../_utils/theme-colour-conversions';
import {
  degreesToRadians,
  radiansToDegrees,
} from '../_utils/angle-conversions';
import { ColorQuadPicker } from './color-quad-picker';

type RingTerrainBiases = {
  [key in RingKey]: [number, number, number, number];
};

const defaultTerrainBiases: RingTerrainBiases = {
  rocky: [0.8, 0.85, 0.9, 0.95],
  banded: [0.3, 0.5, 0.6, 0.8],
};

const columns: { name: string; numeric?: boolean }[] = [
  { name: 'Type' },
  { name: 'x°' },
  { name: 'y°' },
  { name: 'colors' },
  { name: 'biases' },
  { name: 'inner rad.', numeric: true },
  { name: 'outer rad.', numeric: true },
  { name: 'res.', numeric: true },
];

export const PlanetGeneratorRingDrawer = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.600');
  const tableBorderColor = useColorModeValue('green.600', 'green.300');

  const { colors: themeColors } = useTheme<Theme>();

  const drawerState = useReactiveVar(planetGenerationRingDrawerVar);

  const [ringProps, setRingProps] = useState<{
    [key: string]: RangeSliderProps;
  }>(() => {
    const obj: { [key: string]: RangeSliderProps } = {};

    drawerState.rings.forEach(
      ({ id, terrainBias }) => (obj[id] = { defaultValue: terrainBias })
    );

    return obj;
  });

  const defaultRing = useRef<Omit<RingConfig, 'id'>>({
    // don't generate a UUID here or it will always be the same, you idiot
    rotation: [Math.PI / 2, 0, 0],
    type: 'rocky',
    innerRadius: 2,
    outerRadius: 3,
    resolution: 1024,
    colors: [
      hexToRGB(themeColors.gray['600']),
      hexToRGB(themeColors.gray['700']),
      hexToRGB(themeColors.gray['800']),
      hexToRGB(themeColors.gray['900']),
    ],
    terrainBias: defaultTerrainBiases['rocky'],
  });

  const updateRings = () =>
    planetGenerationRingDrawerVar({
      ...drawerState,
    });

  return (
    <VStack bgColor={bgColor} position="absolute" right="0" top="0" padding={3}>
      <HStack width="100%" justifyContent="space-between">
        <Text>Rings</Text>

        {drawerState.panelOpen && (
          <Button
            onClick={() => {
              const id = v4();

              setRingProps({
                ...ringProps,
                ...{ [id]: { defaultValue: defaultRing.current.terrainBias } },
              });

              planetGenerationRingDrawerVar({
                ...drawerState,
                rings: [...drawerState.rings, { id, ...defaultRing.current }],
              });
            }}
          >
            Add ring
          </Button>
        )}

        <IconButton
          aria-label="close color drawer"
          icon={drawerState.panelOpen ? <MinusIcon /> : <AddIcon />}
          onClick={() =>
            planetGenerationRingDrawerVar({
              ...drawerState,
              panelOpen: !drawerState.panelOpen,
            })
          }
        />
      </HStack>

      {drawerState.panelOpen && (
        <Box padding={3} w="100%" minWidth="275px">
          <Table variant="simple" fontSize="xs" size="sm">
            <Thead>
              <Tr>
                {columns.map(({ name, numeric }) => (
                  <Th
                    borderColor={tableBorderColor}
                    fontSize="xxs"
                    isNumeric={numeric}
                  >
                    {name}
                  </Th>
                ))}

                <Th borderColor={tableBorderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {drawerState.rings.map(
                (
                  {
                    id,
                    type,
                    innerRadius,
                    outerRadius,
                    colors,
                    terrainBias,
                    rotation,
                    resolution,
                  },
                  index
                ) => (
                  <Fragment key={index}>
                    <Tr>
                      <Td borderColor={tableBorderColor}>
                        <Menu>
                          <MenuButton
                            px={4}
                            py={2}
                            minW="120px"
                            transition="all 0.2s"
                            borderRadius="md"
                            borderWidth="1px"
                            _hover={{ bg: 'gray.500' }}
                            _expanded={{ bg: 'gray.700' }}
                            _focus={{ boxShadow: 'outline' }}
                          >
                            {type}
                          </MenuButton>
                          <MenuList>
                            {RING_TYPES.map((type, i) => (
                              <Fragment key={i}>
                                <MenuItem
                                  onClick={() => {
                                    drawerState.rings[index] = {
                                      ...drawerState.rings[index],
                                      type,
                                      terrainBias: defaultTerrainBiases[type],
                                    };
                                    updateRings();

                                    setRingProps({
                                      ...ringProps,
                                      ...{
                                        [id]: {
                                          value: defaultTerrainBiases[type],
                                        },
                                      },
                                    });

                                    setTimeout(() => {
                                      setRingProps({
                                        ...ringProps,
                                        ...{
                                          [id]: {
                                            defaultValue:
                                              defaultTerrainBiases[type],
                                          },
                                        },
                                      });
                                    }, 200);
                                  }}
                                >
                                  {type}
                                </MenuItem>
                                {i !== RING_TYPES.length - 1 && <MenuDivider />}
                              </Fragment>
                            ))}
                          </MenuList>
                        </Menu>
                      </Td>

                      <Td borderColor={tableBorderColor}>
                        <NumberInput
                          maxW="100px"
                          flexGrow={0}
                          value={radiansToDegrees(rotation[0])}
                          min={0}
                          max={360}
                          step={15}
                          onChange={(event) => {
                            drawerState.rings[index] = {
                              ...drawerState.rings[index],
                              rotation: [
                                degreesToRadians(parseFloat(event)),
                                rotation[1],
                                rotation[2],
                              ],
                            };
                            updateRings();
                          }}
                        >
                          <NumberInputField fontSize="xs" autoFocus />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>

                      <Td borderColor={tableBorderColor}>
                        <NumberInput
                          maxW="100px"
                          flexGrow={0}
                          value={radiansToDegrees(rotation[1])}
                          min={0}
                          max={360}
                          step={15}
                          onChange={(event) => {
                            drawerState.rings[index] = {
                              ...drawerState.rings[index],
                              rotation: [
                                rotation[0],
                                degreesToRadians(parseFloat(event)),
                                rotation[2],
                              ],
                            };

                            updateRings();
                          }}
                        >
                          <NumberInputField fontSize="xs" autoFocus />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>

                      <Td borderColor={tableBorderColor}>
                        <ColorQuadPicker
                          colors={colors}
                          onChange={(val) => {
                            drawerState.rings[index] = {
                              ...drawerState.rings[index],
                              colors: val,
                            };

                            updateRings();
                          }}
                        ></ColorQuadPicker>
                      </Td>

                      <Td borderColor={tableBorderColor}>
                        <Box padding={3} w="100%" minWidth="275px">
                          <Box mb={2}>
                            {JSON.stringify(terrainBias, null, 2)}
                            {JSON.stringify(ringProps[id])}
                          </Box>

                          <RangeSlider
                            {...ringProps[id]}
                            min={type === 'banded' ? 0 : 0.675}
                            max={1}
                            step={0.01}
                            onChangeEnd={(
                              val: [number, number, number, number]
                            ) => {
                              drawerState.rings[index] = {
                                ...drawerState.rings[index],
                                terrainBias: val,
                              };

                              updateRings();
                            }}
                          >
                            <RangeSliderTrack>
                              <RangeSliderFilledTrack />
                            </RangeSliderTrack>
                            <RangeSliderThumb
                              boxSize={6}
                              index={0}
                              bgColor={rgbToHex(colors[0])}
                            />
                            <RangeSliderThumb
                              boxSize={6}
                              index={1}
                              bgColor={rgbToHex(colors[1])}
                            />
                            <RangeSliderThumb
                              boxSize={6}
                              index={2}
                              bgColor={rgbToHex(colors[2])}
                            />
                            <RangeSliderThumb
                              boxSize={6}
                              index={3}
                              bgColor={rgbToHex(colors[3])}
                            />
                          </RangeSlider>
                        </Box>
                      </Td>

                      <Td borderColor={tableBorderColor} isNumeric>
                        <NumberInput
                          maxW="100px"
                          flexGrow={0}
                          value={innerRadius}
                          min={2}
                          max={outerRadius - 0.1}
                          step={0.1}
                          onChange={(event) => {
                            drawerState.rings[index] = {
                              ...drawerState.rings[index],
                              innerRadius: parseFloat(event),
                            };
                            updateRings();
                          }}
                        >
                          <NumberInputField fontSize="xs" autoFocus />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>
                      <Td borderColor={tableBorderColor} isNumeric>
                        <NumberInput
                          maxW="100px"
                          flexGrow={0}
                          value={outerRadius}
                          min={0.1}
                          max={7}
                          step={0.1}
                          onChange={(event) => {
                            drawerState.rings[index] = {
                              ...drawerState.rings[index],
                              outerRadius: parseFloat(event),
                            };
                            updateRings();
                          }}
                        >
                          <NumberInputField fontSize="xs" autoFocus />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>
                      <Td borderColor={tableBorderColor} isNumeric>
                        <NumberInput
                          maxW="120px"
                          flexGrow={0}
                          value={resolution}
                          min={128}
                          max={2048}
                          step={128}
                          onChange={(event) => {
                            drawerState.rings[index] = {
                              ...drawerState.rings[index],
                              resolution: parseInt(event),
                            };
                            updateRings();
                          }}
                        >
                          <NumberInputField fontSize="xs" autoFocus />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>
                      <Td borderColor={tableBorderColor}>
                        <IconButton
                          aria-label="delete ring"
                          icon={<MinusIcon />}
                          onClick={() => {
                            drawerState.rings.splice(index, 1);
                            updateRings();
                          }}
                        />
                      </Td>
                    </Tr>
                  </Fragment>
                )
              )}
            </Tbody>
          </Table>

          {/* <Box width="800px">
            {drawerState.rings.map((ring) => (
              <Code fontSize="xxs">{JSON.stringify(ring, null, 2)}</Code>
            ))}
          </Box> */}
        </Box>
      )}
    </VStack>
  );
};
