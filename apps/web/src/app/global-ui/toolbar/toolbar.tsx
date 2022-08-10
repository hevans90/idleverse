import { useReactiveVar } from '@apollo/client';
import { ChatIcon, SettingsIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Kbd, useDisclosure } from '@chakra-ui/react';
import { useKeypress } from '../../hooks/use-keypress';
import { useUiBackground } from '../../hooks/use-ui-background';
import { Auth } from '../../_auth/auth';
import {
  responsiveFontProps,
  responsiveIconProps,
} from '../../_responsive-utils/font-props';
import { hotkeyHintsVar, layoutVar } from '../../_state/global-settings';
import { globalUiVar } from '../../_state/global-ui';
import { EscMenuContainer } from '../esc-menu/escape-menu.container';

export const ToolBar = () => {
  const { bg, border } = useUiBackground();

  useKeypress('Escape', () => {
    if (!isOpen || !escapeMenuOpen) {
      onOpen();
      globalUiVar({ ...globalUiVar(), escapeMenuOpen: true });
    } else {
      globalUiVar({ ...globalUiVar(), escapeMenuOpen: false });
    }
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { sideNav, toolBar } = useReactiveVar(layoutVar);

  const { escapeMenuOpen } = useReactiveVar(globalUiVar);

  const hotkeyHints = useReactiveVar(hotkeyHintsVar);

  return (
    <>
      <EscMenuContainer
        isOpen={isOpen || escapeMenuOpen}
        onClose={() => {
          globalUiVar({ ...globalUiVar(), escapeMenuOpen: false });
          onClose();
        }}
      ></EscMenuContainer>
      <Box
        fontSize="xs"
        className="toolbar"
        padding={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgColor={bg}
        borderColor={border}
        borderBottomStyle="solid"
        borderBottomWidth="1px"
        {...responsiveFontProps}
      >
        <HStack>
          <Button
            onClick={() => {
              layoutVar({ sideNav: !sideNav, toolBar });
            }}
            {...responsiveFontProps}
          >
            <ChatIcon {...responsiveIconProps}></ChatIcon>
          </Button>
          <Button onClick={() => onOpen()} {...responsiveFontProps}>
            <SettingsIcon {...responsiveIconProps}></SettingsIcon>
            {hotkeyHints && (
              <>
                &nbsp; <Kbd>Esc</Kbd>
              </>
            )}
          </Button>
        </HStack>
        <Auth></Auth>
      </Box>
    </>
  );
};
