import { useReactiveVar } from '@apollo/client';
import { RepeatIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { generateCelestialName } from '@idleverse/galaxy-gen';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import {
  celestialPresets,
  celestialViewerSelectedPlanet,
  colorsVar,
  systemEditorConfigVar,
  systemEditorFocusVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { AnimatedFrame } from '@idleverse/ui';
import {
  responsiveFontProps,
  subHeaderResponsiveFontProps,
} from '../../../_responsive-utils/font-props';

export const SystemEditorFocusUI = ({
  planets,
}: {
  planets: PlanetByIdQuery[];
}) => {
  const focus = useReactiveVar(systemEditorFocusVar);

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
      bottom={['unset', -2]}
      top={[-2, 'unset']}
      left={-2}
      right={'unset'}
      width={['104vw', 'unset']}
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
          <Text width="100%" mb={2} {...subHeaderResponsiveFontProps}>
            {focus.replace('-', ' ').toLocaleUpperCase()}
          </Text>
          {focus === 'celestial' ? <CelestialFocusUI /> : null}
          {focus === 'goldilocks-zone' ? (
            <GoldilocksFocusUI planets={planets} />
          ) : null}
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
          icon={<RepeatIcon />}
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
          key={id}
          flexGrow={1}
          opacity={0.75}
          {...responsiveFontProps}
          _disabled={{
            bg: `${secondary}.700`,
            transform: 'scale(0.98)',
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
