/* eslint-disable react/jsx-no-useless-fragment */
import { useReactiveVar } from '@apollo/client';
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useUiBackground } from '@idleverse/theme';
import { Fragment, useEffect, useState } from 'react';

import { responsiveFontProps } from '../../../_responsive-utils/font-props';

import {
  colorPalettesVar,
  colorsVar,
  planetGenerationColorDrawerVar,
} from '@idleverse/state';
import { ExpandingUI } from '../../../components/expanding-ui';
import { ColorQuad } from './color-quad';

export const PlanetGeneratorColorDrawer = () => {
  const drawerState = useReactiveVar(planetGenerationColorDrawerVar);
  const { bg, border } = useUiBackground();
  const { primary } = useReactiveVar(colorsVar);

  const palettePresets = useReactiveVar(colorPalettesVar);

  // set a default here because we need access to the useTheme hook to pull colors
  const [localPalette, setLocalPalette] = useState<{
    forest: string;
    grass: string;
    id: string;
    name: string;
    sand: string;
    water: string;
  }>(palettePresets[0]);

  useEffect(() => {
    const existingPalette = palettePresets.find(
      ({ name }) => name === drawerState.palettePresetName
    );

    if (existingPalette) {
      setLocalPalette(existingPalette);
    }
  }, []);

  useEffect(() => {
    planetGenerationColorDrawerVar({
      ...drawerState,
      palettePresetName: localPalette.name,
    });
  }, [localPalette]);

  return (
    <ExpandingUI
      icon={
        localPalette &&
        !drawerState.panelOpen && <ColorQuad {...localPalette} />
      }
      stackProps={{
        left: 0,
        borderLeftWidth: 0,
        top: '10%',
      }}
      headerChildren={
        <>
          {drawerState.panelOpen && (
            <Text {...responsiveFontProps}>Terrain</Text>
          )}
        </>
      }
      panelOpen={drawerState.panelOpen}
      onPanelOpenChange={() =>
        planetGenerationColorDrawerVar({
          ...drawerState,
          panelOpen: !drawerState.panelOpen,
        })
      }
    >
      <VStack>
        <Menu>
          <MenuButton
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor={border}
            _hover={{ bg: `${primary}.500` }}
            _expanded={{ bg: `${primary}.700` }}
            _focus={{ boxShadow: 'outline' }}
          >
            <HStack minWidth="200px" justifyContent="space-between">
              <Text>{localPalette.name}</Text> <ColorQuad {...localPalette} />
            </HStack>
          </MenuButton>
          <MenuList bg={bg} borderColor={border} zIndex={2}>
            {palettePresets.map(
              ({ name, water, sand, grass, forest, id }, i) => (
                <Fragment key={id}>
                  <MenuItem
                    bg={bg}
                    onClick={() =>
                      setLocalPalette({
                        name,
                        water,
                        sand,
                        grass,
                        forest,
                        id,
                      })
                    }
                  >
                    <HStack
                      width="100%"
                      minWidth="205px"
                      justifyContent="space-between"
                    >
                      <Text>{name}</Text>
                      <ColorQuad {...{ water, sand, grass, forest }} />
                    </HStack>
                  </MenuItem>
                  {i !== palettePresets.length - 1 && <MenuDivider />}
                </Fragment>
              )
            )}
          </MenuList>
        </Menu>
        <Box padding={3} w="100%" minWidth="275px" zIndex={1}>
          <RangeSlider
            defaultValue={drawerState.terrainBias}
            min={0}
            max={1}
            step={0.01}
            onChangeEnd={(val: [number, number, number, number]) =>
              planetGenerationColorDrawerVar({
                ...drawerState,
                terrainBias: val,
              })
            }
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb
              boxSize={6}
              index={0}
              bgColor={localPalette?.water}
            />
            <RangeSliderThumb
              boxSize={6}
              index={1}
              bgColor={localPalette?.sand}
            />
            <RangeSliderThumb
              boxSize={6}
              index={2}
              bgColor={localPalette?.grass}
            />
            <RangeSliderThumb
              boxSize={6}
              index={3}
              bgColor={localPalette?.forest}
            />
          </RangeSlider>
        </Box>
      </VStack>
    </ExpandingUI>
  );
};
