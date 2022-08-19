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
  VStack,
} from '@chakra-ui/react';
import { TerrainHexPalettesQuery } from '@idleverse/galaxy-gql';
import { hexToRGB } from '@idleverse/theme';
import { Fragment, useEffect, useState } from 'react';
import { useUiBackground } from '../../../hooks/use-ui-background';
import { responsiveFontProps } from '../../../_responsive-utils/font-props';
import { colorsVar } from '../../../_state/colors';
import { planetGenerationColorDrawerVar } from '../../../_state/planet-generation';

import { ColorQuad } from './color-quad';

export const PlanetGeneratorColorDrawer = ({
  paletteData,
}: {
  paletteData: TerrainHexPalettesQuery;
}) => {
  const drawerState = useReactiveVar(planetGenerationColorDrawerVar);
  const { bg, border } = useUiBackground();
  const { primary, secondary } = useReactiveVar(colorsVar);

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
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderLeftWidth={0}
      position="absolute"
      left="0"
      top="10%"
      padding={[2, 2, 3]}
    >
      <HStack width="100%" justifyContent="space-between">
        <IconButton
          size={['xs', 'sm', 'sm', 'md']}
          aria-label="close color drawer"
          icon={drawerState.panelOpen ? <MinusIcon /> : <AddIcon />}
          onClick={() =>
            planetGenerationColorDrawerVar({
              ...drawerState,
              panelOpen: !drawerState.panelOpen,
            })
          }
        />

        {drawerState.panelOpen && <Text {...responsiveFontProps}>Colors</Text>}

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
              borderColor={border}
              _hover={{ bg: `${primary}.500` }}
              _expanded={{ bg: `${primary}.700` }}
              _focus={{ boxShadow: 'outline' }}
            >
              <HStack minWidth="200px" justifyContent="space-between">
                <Text>{localPalette.name}</Text> <ColorQuad {...localPalette} />
              </HStack>
            </MenuButton>
            <MenuList bg={bg} borderColor={border}>
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
        </VStack>
      )}
    </VStack>
  );
};
