import { useReactiveVar } from '@apollo/client';
import {
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { generateCelestialName } from '@idleverse/galaxy-gen';
import {
  celestialPresets,
  colorsVar,
  systemEditorConfigVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { RepeatPixelIcon } from '@idleverse/ui';
import { responsiveIconProps } from '../../../../_responsive-utils/font-props';

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
          {config.celestial?.config.preset.replace('-', ' ') || 'Select Star'}
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
      {config.celestial && (
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
      )}
    </>
  );
};
