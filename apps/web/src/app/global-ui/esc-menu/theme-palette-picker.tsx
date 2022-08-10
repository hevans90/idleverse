import { useReactiveVar } from '@apollo/client';
import {
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { colors, themePaletteKeys } from '@idleverse/theme';
import { Fragment } from 'react';
import { ColorQuad } from '../../canvases/planet-generator/ui/color-quad';
import { useUiBackground } from '../../hooks/use-ui-background';
import { colorsVar } from '../../_state/colors';

export const ThemePalettePicker = ({
  palette,
}: {
  palette: 'primary' | 'secondary';
}) => {
  const { bg, border } = useUiBackground();
  const { primary, secondary } = useReactiveVar(colorsVar);

  const paletteChoice = palette === 'primary' ? primary : secondary;

  return (
    <Menu eventListeners={{ scroll: false }} offset={[100, -300]}>
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
          <Text fontSize="sm">
            {palette}: {paletteChoice}
          </Text>{' '}
          <ColorQuad
            water={colors[paletteChoice][500]}
            sand={colors[paletteChoice][600]}
            grass={colors[paletteChoice][800]}
            forest={colors[paletteChoice][900]}
          />
        </HStack>
      </MenuButton>
      <MenuList bg={bg} borderColor={border}>
        {themePaletteKeys.map((paletteKey, i) => (
          <Fragment key={i}>
            <MenuItem
              bg={bg}
              onClick={() => {
                colorsVar({ ...colorsVar(), [palette]: paletteKey });
              }}
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
  );
};
