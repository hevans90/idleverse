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
import {
  CelestialAudioName,
  SYSTEM_FOCI,
  celestialPresets,
  celestialViewerGenerationVar,
  celestialViewerSelectedPlanet,
  colorsVar,
  systemEditorConfigVar,
  systemEditorFocusVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { AnimatedFrame } from '@idleverse/ui';
import { IoHelpCircleOutline } from 'react-icons/io5';
import {
  headerResponsiveFontProps,
  responsiveFontProps,
} from '../../../_responsive-utils/font-props';

export const SystemEditorOverview = ({
  onHelpClicked,
}: {
  onHelpClicked: (help: CelestialAudioName) => void;
}) => {
  const currentFocus = useReactiveVar(systemEditorFocusVar);
  const { mode, formingPoints } = useReactiveVar(celestialViewerGenerationVar);

  const { secondary } = useReactiveVar(colorsVar);

  const { rawBgDarker } = useUiBackground();

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  const isMobile = bp === 'small';

  return (
    <Box
      position="absolute"
      bottom={[0, 'unset']}
      top={['unset', 0]}
      left={[0, 'unset']}
      right={['unset', 0]}
      width={['104vw', 'unset']}
    >
      <AnimatedFrame
        show={true}
        leftTop={false}
        leftBottom={isMobile ? false : true}
        rightBottom={false}
        rightTop={false}
        bg={rawBgDarker}
      >
        <VStack gap={2} width="100%">
          <Text
            as="u"
            mb={2}
            {...headerResponsiveFontProps}
            textUnderlineOffset={2}
            textDecorationColor={`${secondary}.400`}
          >
            System Designer
          </Text>
          <VStack justifyContent="start" width="100%">
            {SYSTEM_FOCI.map((focus, i) => (
              <HStack key={i} width="100%" justifyContent="space-between">
                <Button
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
                  isDisabled={currentFocus === focus}
                  onClick={() => {
                    systemEditorFocusVar(focus);
                    celestialViewerSelectedPlanet(null);
                  }}
                >
                  {focus.replace('-', ' ').toLocaleUpperCase()}{' '}
                </Button>
                <IconButton
                  aria-label="help"
                  onClick={() => onHelpClicked(focus)}
                  icon={<IoHelpCircleOutline size={30} />}
                ></IconButton>
              </HStack>
            ))}
            <HStack mt={4} width="100%" justifyContent="space-between">
              <Text>Forming Points:</Text>
              <Text> {formingPoints}</Text>
              <IconButton
                aria-label="help"
                onClick={() => onHelpClicked('system-forming-points')}
                icon={<IoHelpCircleOutline size={30} />}
              ></IconButton>
            </HStack>
          </VStack>
        </VStack>
      </AnimatedFrame>
    </Box>
  );
};

export const CelestialFocusUI = (args) => {
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
      <HStack>
        <Input
          fontSize="2xs"
          value={config.celestial.name}
          maxLength={25}
          flexGrow="1"
          onChange={(event) => {
            console.log('name change');
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
