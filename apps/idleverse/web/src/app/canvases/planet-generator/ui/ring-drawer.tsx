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
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { RingConfig, RING_TYPES } from '../../../_state/models';
import { planetGenerationRingDrawerVar } from '../../../_state/planet-generation';

const defaultRing: RingConfig = {
  type: 'rocky',
  angle: undefined,
  innerRadius: 2.5,
  outerRadius: 3.5,
};

export const PlanetGeneratorRingDrawer = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.600');
  const tableBorderColor = useColorModeValue('green.600', 'green.300');

  const drawerState = useReactiveVar(planetGenerationRingDrawerVar);

  return (
    <VStack bgColor={bgColor} position="absolute" right="0" top="0" padding={3}>
      <HStack width="100%" justifyContent="space-between">
        <Text>Rings</Text>

        {drawerState.panelOpen && (
          <Button
            onClick={() =>
              planetGenerationRingDrawerVar({
                ...drawerState,
                rings: [...drawerState.rings, defaultRing],
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
                  angle
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
                ({ type, angle, innerRadius, outerRadius }, index) => (
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
                                    drawerState.rings[index].type = type;
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
                      <Td borderColor={tableBorderColor}>{angle}</Td>
                      <Td borderColor={tableBorderColor} isNumeric>
                        <NumberInput
                          maxW="100px"
                          ml="1rem"
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
                          ml="1rem"
                          flexGrow={0}
                          value={outerRadius}
                          min={0.1}
                          max={5}
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
