/* eslint-disable react/jsx-no-useless-fragment */
import { useReactiveVar } from '@apollo/client';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import {
  planetGenerationTerrainDrawerVar,
  planetGenerationColorDrawerVar,
} from '../../../_state/planet-generation';

export const PlanetGeneratorTerrainDrawer = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.600');

  const { currentHexPalette } = useReactiveVar(planetGenerationColorDrawerVar);
  const drawerState = useReactiveVar(planetGenerationTerrainDrawerVar);

  return (
    <VStack
      bgColor={bgColor}
      position="absolute"
      left="0"
      top="20%"
      padding={3}
    >
      <HStack width="100%" justifyContent="space-between">
        <Text>Terrain</Text>
        <IconButton
          aria-label="close color drawer"
          icon={drawerState.panelOpen ? <MinusIcon /> : <AddIcon />}
          onClick={() =>
            planetGenerationTerrainDrawerVar({
              ...drawerState,
              panelOpen: !drawerState.panelOpen,
            })
          }
        />
      </HStack>

      {drawerState.panelOpen && (
        <Box padding={3} w="100%" minWidth="275px">
          <RangeSlider
            defaultValue={drawerState.terrainBias}
            min={0}
            max={1}
            step={0.01}
            onChangeEnd={(val: [number, number, number, number]) =>
              planetGenerationTerrainDrawerVar({
                ...drawerState,
                terrainBias: val,
              })
            }
          >
            <RangeSliderTrack bg="green.400">
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb
              boxSize={6}
              index={0}
              bgColor={currentHexPalette?.water}
            />
            <RangeSliderThumb
              boxSize={6}
              index={1}
              bgColor={currentHexPalette?.sand}
            />
            <RangeSliderThumb
              boxSize={6}
              index={2}
              bgColor={currentHexPalette?.grass}
            />
            <RangeSliderThumb
              boxSize={6}
              index={3}
              bgColor={currentHexPalette?.forest}
            />
          </RangeSlider>
        </Box>
      )}
    </VStack>
  );
};
