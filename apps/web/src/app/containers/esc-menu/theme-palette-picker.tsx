import { useReactiveVar } from '@apollo/client';
import {
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { colors, themePaletteKeys } from '@idleverse/theme';
import { Fragment } from 'react';
import { ColorQuad } from '../../canvases/planet-generator/ui/color-quad';
import { useUiBackground } from '../../hooks/use-ui-background';
import { colorsVar } from '../../_state/colors';

export const ThemePalettePicker = () => {
  const { bg, border } = useUiBackground();
  const { primary, secondary } = useReactiveVar(colorsVar);

  return (
    <VStack>
      <Menu direction="rtl">
        <MenuButton
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
          <HStack minWidth="200px" justifyContent="space-between">
            <Text fontSize="sm">Primary: {primary}</Text>{' '}
            <ColorQuad
              water={colors[primary][500]}
              sand={colors[primary][600]}
              grass={colors[primary][800]}
              forest={colors[primary][900]}
            />
          </HStack>
        </MenuButton>
        <MenuList bg={bg} borderColor={border}>
          {themePaletteKeys.map((paletteKey, i) => (
            <Fragment key={i}>
              <MenuItem
                bg={bg}
                onClick={() =>
                  colorsVar({ ...colorsVar(), primary: paletteKey })
                }
              >
                <HStack
                  width="100%"
                  minWidth="205px"
                  justifyContent="space-between"
                >
                  <Text fontSize="sm">{paletteKey}</Text>
                  <ColorQuad
                    water={colors[paletteKey][500]}
                    sand={colors[paletteKey][600]}
                    grass={colors[paletteKey][800]}
                    forest={colors[paletteKey][900]}
                  />
                </HStack>
              </MenuItem>
              {i !== themePaletteKeys.length - 1 && <MenuDivider />}
            </Fragment>
          ))}
        </MenuList>
      </Menu>
    </VStack>
  );
};
