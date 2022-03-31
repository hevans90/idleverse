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
import { Fragment, useRef } from 'react';
import { v4 } from 'uuid';
import { RingConfig, RingKey, RING_TYPES } from '../../../_state/models';
import { planetGenerationRingDrawerVar } from '../../../_state/planet-generation';
import { rgbToHex, themeColToRGB } from '../../_utils/theme-colour-conversions';
import {
  degreesToRadians,
  radiansToDegrees,
} from '../_utils/angle-conversions';

type RingTerrainBiases = {
  [key in RingKey]: [number, number, number, number];
};

const defaultTerrainBiases: RingTerrainBiases = {
  rocky: [0.6, 0.725, 0.85, 0.975],
  banded: [0.3, 0.5, 0.6, 0.8],
};

export const PlanetGeneratorRingDrawer = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.600');
  const tableBorderColor = useColorModeValue('green.600', 'green.300');

  const { colors } = useTheme<Theme>();

  const drawerState = useReactiveVar(planetGenerationRingDrawerVar);

  const defaultRing = useRef<Omit<RingConfig, 'id'>>({
    // don't generate a UUID here or it will always be the same, you idiot
    rotation: [Math.PI / 2, 0, 0],
    type: 'banded',
    innerRadius: 2,
    outerRadius: 3,
    resolution: 1024,
    colors: [
      themeColToRGB(colors.gray['600']),
      themeColToRGB(colors.gray['700']),
      themeColToRGB(colors.gray['800']),
      themeColToRGB(colors.gray['900']),
    ],
    terrainBias: defaultTerrainBiases['rocky'],
  });

  return (
    <VStack bgColor={bgColor} position="absolute" right="0" top="0" padding={3}>
      <HStack width="100%" justifyContent="space-between">
        <Text>Rings</Text>

        {drawerState.panelOpen && (
          <Button
            onClick={() =>
              planetGenerationRingDrawerVar({
                ...drawerState,
                rings: [
                  ...drawerState.rings,
                  { id: v4(), ...defaultRing.current },
                ],
              })
            }
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
                <Th borderColor={tableBorderColor} fontSize="xxs">
                  type
                </Th>
                <Th borderColor={tableBorderColor} fontSize="xxs">
                  x°
                </Th>
                <Th borderColor={tableBorderColor} fontSize="xxs">
                  y°
                </Th>
                <Th borderColor={tableBorderColor} fontSize="xxs">
                  color biases
                </Th>
                <Th borderColor={tableBorderColor} isNumeric fontSize="xxs">
                  inner rad.
                </Th>
                <Th borderColor={tableBorderColor} isNumeric fontSize="xxs">
                  outer rad.
                </Th>
                <Th borderColor={tableBorderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {drawerState.rings.map(
                (
                  {
                    type,
                    innerRadius,
                    outerRadius,
                    colors,
                    terrainBias,
                    rotation,
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
                                      terrainBias: defaultTerrainBiases[type],
                                      type,
                                    };

                                    planetGenerationRingDrawerVar({
                                      ...drawerState,
                                    });
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

                            planetGenerationRingDrawerVar({
                              ...drawerState,
                            });
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

                            planetGenerationRingDrawerVar({
                              ...drawerState,
                            });
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
                        <Box padding={3} w="100%" minWidth="275px">
                          <RangeSlider
                            defaultValue={terrainBias}
                            min={0}
                            max={1}
                            step={0.01}
                            onChangeEnd={(
                              val: [number, number, number, number]
                            ) => {
                              drawerState.rings[index] = {
                                ...drawerState.rings[index],
                                terrainBias: val,
                              };

                              planetGenerationRingDrawerVar({
                                ...drawerState,
                              });
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

                            planetGenerationRingDrawerVar({
                              ...drawerState,
                            });
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

                            planetGenerationRingDrawerVar({
                              ...drawerState,
                            });
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

                            planetGenerationRingDrawerVar({
                              ...drawerState,
                            });
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
