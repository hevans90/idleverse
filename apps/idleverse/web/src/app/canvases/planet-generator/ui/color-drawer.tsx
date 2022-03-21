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
import { useEffect, useState, Fragment } from 'react';
import { HexPalette } from '../../../_state/models';
import { planetGenerationColorDrawerVar } from '../../../_state/planet-generation';
import { themeColToRGB } from '../../_utils/theme-colour-conversions';
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
        water: themeColToRGB(localPalette.palette.water),
        sand: themeColToRGB(localPalette.palette.sand),
        grass: themeColToRGB(localPalette.palette.grass),
        forest: themeColToRGB(localPalette.palette.forest),
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
      right="0"
      top="20%"
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
              _hover={{ bg: 'green.300' }}
              _expanded={{ bg: 'green.700' }}
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
