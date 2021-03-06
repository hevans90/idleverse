/* eslint-disable react/jsx-no-useless-fragment */
import { useReactiveVar } from '@apollo/client';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Theme,
  useColorModeValue,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { TerrainHexPalettesQuery } from '@idleverse/galaxy-gql';
import { hexToRGB } from '@idleverse/theme';
import { Fragment, useEffect, useState } from 'react';
import { planetGenerationColorDrawerVar } from '../../../_state/planet-generation';

import { ColorQuad } from './color-quad';

export const PlanetGeneratorColorDrawer = ({
  paletteData,
}: {
  paletteData: TerrainHexPalettesQuery;
}) => {
  const drawerState = useReactiveVar(planetGenerationColorDrawerVar);
  const { colors } = useTheme<Theme>();
  const bgColor = useColorModeValue('gray.200', 'gray.600');

  const palettePresets = paletteData.terrain_hex_palette;

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
      currentPalette: {
        water: hexToRGB(localPalette.water),
        sand: hexToRGB(localPalette.sand),
        grass: hexToRGB(localPalette.grass),
        forest: hexToRGB(localPalette.forest),
      },
      currentHexPalette: {
        water: localPalette.water,
        sand: localPalette.sand,
        grass: localPalette.grass,
        forest: localPalette.forest,
      },
      currentPaletteId: localPalette.id,
    });
  }, [localPalette]);

  return (
    <VStack
      bgColor={bgColor}
      position="absolute"
      left="0"
      top="10%"
      padding={3}
    >
      <HStack width="100%" justifyContent="space-between">
        <IconButton
          aria-label="close color drawer"
          icon={drawerState.panelOpen ? <MinusIcon /> : <AddIcon />}
          onClick={() =>
            planetGenerationColorDrawerVar({
              ...drawerState,
              panelOpen: !drawerState.panelOpen,
            })
          }
        />

        {drawerState.panelOpen && <Text>Colors</Text>}

        {localPalette && !drawerState.panelOpen && (
          <ColorQuad {...localPalette} />
        )}
      </HStack>
      {drawerState.panelOpen && (
        <VStack>
          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ bg: 'gray.500' }}
              _expanded={{ bg: 'gray.700' }}
              _focus={{ boxShadow: 'outline' }}
            >
              <HStack minWidth="200px" justifyContent="space-between">
                <Text>{localPalette.name}</Text> <ColorQuad {...localPalette} />
              </HStack>
            </MenuButton>
            <MenuList>
              {palettePresets.map(
                ({ name, water, sand, grass, forest, id }, i) => (
                  <Fragment key={id}>
                    <MenuItem
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
        </VStack>
      )}
    </VStack>
  );
};
