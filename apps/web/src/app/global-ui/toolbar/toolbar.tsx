import { useReactiveVar } from '@apollo/client';
import { ChatIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Icon,
  Kbd,
  useDisclosure,
} from '@chakra-ui/react';
import { BsFileMusic } from 'react-icons/bs';

import { Auth } from '../../_auth/auth';
import {
  responsiveFontProps,
  responsiveIconProps,
} from '../../_responsive-utils/font-props';

import {
  globalUiVar,
  hotkeyHintsVar,
  layoutVar,
  musicPlayerVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { useKeypress } from '../../hooks/use-keypress';
import { EscMenuContainer } from '../esc-menu/escape-menu.container';

export const ToolBar = () => {
  const { bg, border } = useUiBackground();

  useKeypress('Escape', () => {
    if (!escapeMenuOpen) {
      globalUiVar({ ...globalUiVar(), escapeMenuOpen: true });
    } else {
      globalUiVar({ ...globalUiVar(), escapeMenuOpen: false });
    }
  });

  const { onClose } = useDisclosure();

  const { sideNav, toolBar } = useReactiveVar(layoutVar);

  const { escapeMenuOpen } = useReactiveVar(globalUiVar);
  const { show: showMusicPlayer } = useReactiveVar(musicPlayerVar);

  const hotkeyHints = useReactiveVar(hotkeyHintsVar);

  return (
    <>
      <EscMenuContainer
        isOpen={escapeMenuOpen}
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
          <Button
            onClick={() =>
              globalUiVar({ ...globalUiVar(), escapeMenuOpen: !escapeMenuOpen })
            }
            {...responsiveFontProps}
          >
            <SettingsIcon {...responsiveIconProps}></SettingsIcon>
            {hotkeyHints && (
              <>
                &nbsp; <Kbd>Esc</Kbd>
              </>
            )}
          </Button>
          <Button
            onClick={() => {
              musicPlayerVar({ ...musicPlayerVar(), show: !showMusicPlayer });
            }}
            {...responsiveFontProps}
          >
            <Icon as={BsFileMusic} {...responsiveIconProps} />
          </Button>
        </HStack>
        <Auth></Auth>
      </Box>
    </>
  );
};
