import { useReactiveVar } from '@apollo/client';
import { RepeatIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  Input,
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
import { generateCelestialName } from '@idleverse/galaxy-gen';
import {
  colorPalettesVar,
  colorsVar,
  planetGenerationColorDrawerVar,
  planetGeneratorConfigVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { Fragment, useEffect, useState } from 'react';
import { ColorQuad } from '../../planet-generator/ui/color-quad';

export const PlanetNameEditor = () => {
  const currentConfig = useReactiveVar(planetGeneratorConfigVar);

  const [localConfigValues, setLocalValues] = useState(
    planetGeneratorConfigVar()
  );

  useEffect(() => {
    setLocalValues(currentConfig);
  }, [currentConfig]);

  const { secondary } = useReactiveVar(colorsVar);

  return (
    <HStack mb={1}>
      <Input
        placeholder="planet name"
        fontSize="2xs"
        value={localConfigValues.name}
        maxLength={25}
        flexGrow="1"
        onChange={(event) => {
          setLocalValues({
            ...localConfigValues,
            name: event.target.value,
          });
          planetGeneratorConfigVar({
            ...planetGeneratorConfigVar(),
            name: event.target.value,
          });
        }}
      />
      <IconButton
        marginLeft="0.3rem"
        colorScheme={secondary}
        aria-label="Generate new name"
        icon={<RepeatIcon />}
        onClick={() => {
          const name = generateCelestialName();

          setLocalValues({
            ...localConfigValues,
            name,
          });
          planetGeneratorConfigVar({
            ...planetGeneratorConfigVar(),
            name,
          });
        }}
      />
    </HStack>
  );
};

export const PlanetAppearanceEditor = () => {
  const appearance = useReactiveVar(planetGenerationColorDrawerVar);
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
      ({ name }) => name === appearance.palettePresetName
    );

    if (existingPalette) {
      setLocalPalette(existingPalette);
    }
  }, []);

  useEffect(() => {
    planetGenerationColorDrawerVar({
      ...appearance,
      palettePresetName: localPalette.name,
    });
  }, [localPalette]);

  return (
    <VStack w="100%">
      <Menu>
        <MenuButton
          w="100%"
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: `${primary}.600` }}
          _expanded={{ bg: `${primary}.600` }}
          _focus={{ boxShadow: 'outline' }}
        >
          <HStack minWidth="200px" justifyContent="space-between">
            <Text>{localPalette.name}</Text> <ColorQuad {...localPalette} />
          </HStack>
        </MenuButton>
        <MenuList bg={bg} borderColor={border} zIndex={2}>
          {palettePresets.map(({ name, water, sand, grass, forest, id }, i) => (
            <Fragment key={id}>
              <MenuItem
                bg={bg}
                _hover={{ bg: `${primary}.600` }}
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
          ))}
        </MenuList>
      </Menu>
      <Box padding={2} w="100%" zIndex={1}>
        <RangeSlider
          defaultValue={appearance.terrainBias}
          min={0}
          max={1}
          step={0.01}
          onChangeEnd={(val: [number, number, number, number]) =>
            planetGenerationColorDrawerVar({
              ...appearance,
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
  );
};
