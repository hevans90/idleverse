import { useReactiveVar } from '@apollo/client';
import { RepeatIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { generateCelestialName } from '@idleverse/galaxy-gen';
import {
  celestialPresets,
  colorsVar,
  systemEditorConfigVar,
  systemEditorFocusVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { AnimatedFrame } from '@idleverse/ui';
import { subHeaderResponsiveFontProps } from '../../../_responsive-utils/font-props';

export const SystemEditorFocusUI = () => {
  const focus = useReactiveVar(systemEditorFocusVar);

  const { rawBgDarker } = useUiBackground();

  return focus ? (
    <Box position="absolute" left={-2} bottom={-2}>
      <AnimatedFrame
        show={true}
        leftBottom={false}
        leftTop={false}
        rightBottom={false}
        bg={rawBgDarker}
      >
        <VStack padding={5} gap={2}>
          <Text width="100%" mb={5} {...subHeaderResponsiveFontProps}>
            {focus.replace('-', ' ').toLocaleUpperCase()}
          </Text>
          {focus === 'celestial' ? <CelestialFocusUI /> : null}
        </VStack>
      </AnimatedFrame>
    </Box>
  ) : null;
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
