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
import { Fragment, useEffect, useState } from 'react';
import { HexPalette } from '../../../_state/models';
import { planetGenerationColorDrawerVar } from '../../../_state/planet-generation';
import { hexToRGB } from '../../_utils/theme-colour-conversions';
import { ColorQuad } from './color-quad';

export const PlanetGeneratorColorDrawer = () => {
  const drawerState = useReactiveVar(planetGenerationColorDrawerVar);
  const { colors } = useTheme<Theme>();
  const bgColor = useColorModeValue('gray.200', 'gray.600');

  const palettePresets: { name: string; palette: HexPalette }[] = [
    {
      name: 'terran',
      palette: {
        water: colors.blue['500'],
        sand: colors.orange['300'],
        grass: colors.green['500'],
        forest: colors.green['700'],
      },
    },
    {
      name: 'desert',
      palette: {
        water: colors.orange['200'],
        sand: colors.orange['300'],
        grass: colors.orange['400'],
        forest: colors.orange['600'],
      },
    },
    {
      name: 'alien',
      palette: {
        water: colors.blue['900'],
        sand: colors.orange['700'],
        grass: colors.green['200'],
        forest: colors.green['100'],
      },
    },
  ];

  // set a default here because we need access to the useTheme hook to pull colors
  const [localPalette, setLocalPalette] = useState<{
    name: string;
    palette: HexPalette;
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
        water: hexToRGB(localPalette.palette.water),
        sand: hexToRGB(localPalette.palette.sand),
        grass: hexToRGB(localPalette.palette.grass),
        forest: hexToRGB(localPalette.palette.forest),
      },
      currentHexPalette: {
        water: localPalette.palette.water,
        sand: localPalette.palette.sand,
        grass: localPalette.palette.grass,
        forest: localPalette.palette.forest,
      },
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
          <ColorQuad {...localPalette.palette} />
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
                <Text>{localPalette.name}</Text>{' '}
                <ColorQuad {...localPalette.palette} />
              </HStack>
            </MenuButton>
            <MenuList>
              {palettePresets.map(({ name, palette }, i) => (
                <Fragment key={i}>
                  <MenuItem onClick={() => setLocalPalette({ name, palette })}>
                    <HStack
                      width="100%"
                      minWidth="205px"
                      justifyContent="space-between"
                    >
                      <Text>{name}</Text>
                      <ColorQuad {...palette} />
                    </HStack>
                  </MenuItem>
                  {i !== palettePresets.length - 1 && <MenuDivider />}
                </Fragment>
              ))}
            </MenuList>
          </Menu>
        </VStack>
      )}
    </VStack>
  );
};
