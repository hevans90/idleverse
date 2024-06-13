import { useReactiveVar } from '@apollo/client';
import {
  FormControl,
  FormLabel,
  HStack,
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
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  asteroidSizes,
  celestialViewerAsteroidBeltVar,
  colorPalettesVar,
  colorsVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { Fragment } from 'react/jsx-runtime';
import { ColorQuad } from '../../../planet-generator/ui/color-quad';

export const AsteroidBeltFocusUI = () => {
  const { noAsteroids, size, colorPalette } = useReactiveVar(
    celestialViewerAsteroidBeltVar
  );

  const palettePresets = useReactiveVar(colorPalettesVar);

  const { primary } = useReactiveVar(colorsVar);
  const { bg, border } = useUiBackground();

  return (
    <VStack width="100%" gap={4}>
      <FormControl>
        <FormLabel>Count</FormLabel>
        <NumberInput
          value={noAsteroids}
          min={0}
          max={2000}
          step={100}
          onChange={(e) =>
            celestialViewerAsteroidBeltVar({
              ...celestialViewerAsteroidBeltVar(),
              noAsteroids: parseInt(e),
            })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Size</FormLabel>
        <Menu>
          <MenuButton
            width="100%"
            px={4}
            py={2}
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: `${primary}.500` }}
            _expanded={{ bg: `${primary}.700` }}
            _focus={{ boxShadow: 'outline' }}
          >
            {size}
          </MenuButton>
          <MenuList bg={bg} zIndex={2}>
            {asteroidSizes.map((asteroidSize, i) => (
              <MenuItem
                key={i}
                bg={bg}
                _hover={{ bg: `${primary}.500` }}
                onClick={() =>
                  celestialViewerAsteroidBeltVar({
                    ...celestialViewerAsteroidBeltVar(),
                    size: asteroidSize,
                  })
                }
              >
                {asteroidSize}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </FormControl>
      <FormControl>
        <FormLabel>Appearance</FormLabel>
        <Menu>
          <MenuButton
            width="100%"
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
            <HStack justifyContent="space-between">
              <Text>{colorPalette?.name ?? 'Choose palette'}</Text>{' '}
              <ColorQuad {...colorPalette} />
              {colorPalette?.name}
            </HStack>
          </MenuButton>
          <MenuList bg={bg} borderColor={border} zIndex={2}>
            {palettePresets.map(
              ({ name, water, sand, grass, forest, id }, i) => (
                <Fragment key={id}>
                  <MenuItem
                    bg={bg}
                    onClick={() =>
                      celestialViewerAsteroidBeltVar({
                        ...celestialViewerAsteroidBeltVar(),
                        colorPalette: { name, water, sand, grass, forest, id },
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
      </FormControl>
    </VStack>
  );
};
