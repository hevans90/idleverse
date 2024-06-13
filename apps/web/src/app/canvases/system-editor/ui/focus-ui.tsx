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
  Image,
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
import {
  asteroidSizes,
  celestialPresets,
  celestialViewerAsteroidBeltVar,
  celestialViewerPlanetDataUris,
  celestialViewerPlanetsVar,
  celestialViewerSelectedPlanetVar,
  colorPalettesVar,
  colorsVar,
  dialogVar,
  systemEditorConfigVar,
  systemEditorFocusVar,
  systemEditorNewPlanetVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';

import {
  AnimatedFrame,
  AnimatedText,
  BlinkingText,
  RepeatPixelIcon,
} from '@idleverse/ui';
import { Fragment, useEffect } from 'react';
import {
  responsiveFontProps,
  responsiveIconProps,
} from '../../../_responsive-utils/font-props';

import { useResize } from '../../_utils/use-resize.hook';
import { PlanetGenerator } from '../../planet-generator/planet-generator';
import { ColorQuad } from '../../planet-generator/ui/color-quad';
import { PlanetAppearanceEditor, PlanetNameEditor } from './planet-editing';

type FocusUIProps = HTMLChakraProps<'div'>;

export const SystemEditorFocusUI = ({ ...divProps }: FocusUIProps) => {
  const focus = useReactiveVar(systemEditorFocusVar);

  const { rawBgDark } = useUiBackground();

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  const isMobile = bp === 'small';

  return focus ? (
    <Box
      position={['fixed', 'static']}
      bottom={['unset', 0]}
      top={[0, 'unset']}
      left={0}
      right={'unset'}
      width={['100vw', '100%']}
      maxWidth={['unset', 300]}
      minW={['unset', 300]}
      {...divProps}
    >
      <AnimatedFrame
        show={true}
        leftBottom={false}
        leftTop={false}
        rightBottom={false}
        rightTop={isMobile ? false : true}
        bg={rawBgDark}
      >
        <VStack gap={2}>
          {focus === 'celestial' ? <CelestialFocusUI /> : null}
          {focus === 'goldilocks-zone' ? <GoldilocksFocusUI /> : null}
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

export const GoldilocksFocusUI = () => {
  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanetVar);
  const { open: dialogOpen } = useReactiveVar(dialogVar);
  const sizeWithoutDialog = useResize();
  const { rawBgDarker, border } = useUiBackground();
  const planets = useReactiveVar(celestialViewerPlanetsVar);
  const { uris } = useReactiveVar(celestialViewerPlanetDataUris);

  const creatingNewPlanet = useReactiveVar(systemEditorNewPlanetVar);

  const { secondary } = useReactiveVar(colorsVar);

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  const isMobile = bp === 'small';

  const showEditor = creatingNewPlanet || !!selectedPlanet;

  const selectPlanetHandler = ({ name, id }: { name: string; id: string }) => {
    systemEditorNewPlanetVar(false);
    celestialViewerSelectedPlanetVar({ name, id });
  };

  const newPlanetHandler = () => {
    celestialViewerSelectedPlanetVar(null);
    systemEditorNewPlanetVar(true);
  };

  const cancelNewPlanetHandler = () => {
    systemEditorNewPlanetVar(false);
  };
  const saveNewPlanetHandler = () => {
    //
  };

  useEffect(() => {
    return () => {
      // disable this when the component unmounts to avoid weird global state leaks
      systemEditorNewPlanetVar(false);
    };
  }, []);

  return (
    <>
      {showEditor && (
        <AnimatedText
          animationType="decipher"
          textAlign="center"
          display="block"
          duration={{ enter: 0.5, exit: 1 }}
          fontSize={['lg', 'xl']}
          content={creatingNewPlanet ? 'New' : 'Editing'}
        >
          {creatingNewPlanet && (
            <BlinkingText fontSize={['lg', 'xl']}>+</BlinkingText>
          )}
        </AnimatedText>
      )}
      {showEditor && (
        <AnimatedFrame
          show={true}
          bg={rawBgDarker}
          leftBottom={!isMobile ? false : true}
          containerProps={{
            height: [
              sizeWithoutDialog.height / 4,
              sizeWithoutDialog.height / 3,
            ],
            width: ['100vw', '100%'],
            position: ['fixed', 'relative'],
            top: ['20vh', 'unset'],
            left: [0, 'unset'],
            display: isMobile && dialogOpen ? 'none' : 'block',
          }}
        >
          <PlanetGenerator stars={false} fullUI={false} />
        </AnimatedFrame>
      )}
      {showEditor && (
        <>
          <PlanetNameEditor />
          <PlanetAppearanceEditor />
        </>
      )}

      {!creatingNewPlanet &&
        planets.map(({ name, id, radius }) => (
          <HStack width="100%" key={id}>
            <Box minW="40px">
              <Image
                margin="auto"
                boxSize={`${40 * radius}px`}
                src={uris.find(({ seed }) => seed === id)?.uri}
                fallbackSrc="/placeholders/75x75-circle.png"
                borderRadius="full"
                objectFit="cover"
              />
            </Box>
            <Button
              width="100%"
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
              onClick={() => selectPlanetHandler({ name, id })}
            >
              {name.toLocaleUpperCase()}{' '}
            </Button>
          </HStack>
        ))}
      {creatingNewPlanet ? (
        <HStack width="100%">
          <Button
            colorScheme={secondary}
            width="50%"
            onClick={saveNewPlanetHandler}
          >
            Save
          </Button>
          <Button width="50%" onClick={cancelNewPlanetHandler}>
            Cancel
          </Button>
        </HStack>
      ) : (
        <Button width="100%" onClick={newPlanetHandler} colorScheme={secondary}>
          New +
        </Button>
      )}
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
