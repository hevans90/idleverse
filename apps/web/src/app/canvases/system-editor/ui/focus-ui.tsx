import { useReactiveVar } from '@apollo/client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  HTMLChakraProps,
  Icon,
  IconButton,
  Input,
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
  useBreakpointValue,
} from '@chakra-ui/react';
import { generateCelestialName } from '@idleverse/galaxy-gen';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import {
  asteroidSizes,
  celestialPresets,
  celestialViewerAsteroidBeltVar,
  celestialViewerSelectedPlanet,
  colorPalettesVar,
  colorsVar,
  systemEditorConfigVar,
  systemEditorFocusVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { AnimatedFrame, RepeatPixelIcon } from '@idleverse/ui';
import { Fragment } from 'react';
import {
  responsiveFontProps,
  responsiveIconProps,
  subHeaderResponsiveFontProps,
} from '../../../_responsive-utils/font-props';
import { ColorQuad } from '../../planet-generator/ui/color-quad';

type FocusUIProps = HTMLChakraProps<'div'> & {
  planets: PlanetByIdQuery[];
};

export const SystemEditorFocusUI = ({ planets, ...divProps }: FocusUIProps) => {
  const focus = useReactiveVar(systemEditorFocusVar);
  const { secondary } = useReactiveVar(colorsVar);

  const { rawBgDarker } = useUiBackground();

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  const isMobile = bp === 'small';

  return focus ? (
    <Box
      position="absolute"
      bottom={['unset', 0]}
      top={[0, 'unset']}
      left={0}
      right={'unset'}
      width={['104vw', 'unset']}
      {...divProps}
    >
      <AnimatedFrame
        show={true}
        leftBottom={false}
        leftTop={false}
        rightBottom={false}
        rightTop={isMobile ? false : true}
        bg={rawBgDarker}
      >
        <VStack gap={2}>
          <Text
            as="u"
            width="100%"
            mb={2}
            {...subHeaderResponsiveFontProps}
            textUnderlineOffset={2}
            textDecorationColor={`${secondary}.400`}
          >
            {focus.replace('-', ' ').toLocaleUpperCase()}
          </Text>
          {focus === 'celestial' ? <CelestialFocusUI /> : null}
          {focus === 'goldilocks-zone' ? (
            <GoldilocksFocusUI planets={planets} />
          ) : null}
          {focus === 'asteroid-belt' ? <AsteroidBeltFocusUI /> : null}
        </VStack>
      </AnimatedFrame>
    </Box>
  ) : null;
};

export const CelestialFocusUI = () => {
  const config = useReactiveVar(systemEditorConfigVar);

  const { bg } = useUiBackground();
  const { primary, secondary } = useReactiveVar(colorsVar);

  return (
    <>
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
          {config.celestial.config.preset.replace('-', ' ')}
        </MenuButton>
        <MenuList bg={bg} zIndex={2}>
          {celestialPresets.map(({ preset, ...rest }, i) => (
            <MenuItem
              key={i}
              bg={bg}
              _hover={{ bg: `${primary}.500` }}
              onClick={() => {
                systemEditorConfigVar({
                  ...config,
                  celestial: {
                    ...config.celestial,
                    config: {
                      preset,
                      ...rest,
                    },
                  },
                });
              }}
            >
              {preset.replace('-', ' ')}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <HStack width="100%">
        <Input
          fontSize="2xs"
          placeholder="name your star"
          value={config.celestial.name}
          maxLength={25}
          flexGrow="1"
          onChange={(event) => {
            systemEditorConfigVar({
              ...config,
              celestial: { ...config.celestial, name: event.target.value },
            });
          }}
        />
        <IconButton
          marginLeft="0.3rem"
          colorScheme={secondary}
          aria-label="Generate new name"
          icon={<Icon as={RepeatPixelIcon} {...responsiveIconProps} />}
          onClick={() => {
            systemEditorConfigVar({
              ...config,
              celestial: {
                ...config.celestial,
                name: generateCelestialName(),
              },
            });
          }}
        />
      </HStack>
    </>
  );
};

export const GoldilocksFocusUI = ({
  planets,
}: {
  planets: PlanetByIdQuery[];
}) => {
  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanet);

  const { secondary } = useReactiveVar(colorsVar);

  return (
    <>
      {planets.map(({ planet_by_pk: { name, id } }) => (
        <Button
          width="100%"
          key={id}
          flexGrow={1}
          opacity={0.75}
          {...responsiveFontProps}
          _disabled={{
            bg: `${secondary}.700`,
            pointerEvents: 'none',
            opacity: 1,
            _hover: { bg: `${secondary}.600` },
          }}
          isDisabled={selectedPlanet?.id === id}
          onClick={() => {
            celestialViewerSelectedPlanet({ name, id });
          }}
        >
          {name.toLocaleUpperCase()}{' '}
        </Button>
      ))}
    </>
  );
};

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
