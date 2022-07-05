import { useReactiveVar } from '@apollo/client';
import { ChatIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Kbd,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useKeypress } from '../../hooks/use-keypress';
import { Auth } from '../../_auth/auth';
import { responsiveFontProps } from '../../_responsive-utils/font-props';
import { layoutVar } from '../../_state/persisted-reactive-variables';
import { EscMenuContainer } from '../esc-menu/escape-menu.container';

export const ToolBar = () => {
  const color = useColorModeValue('gray.200', 'gray.700');

  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useKeypress('Escape', () => isOpen || onOpen());

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { sideNav, toolBar } = useReactiveVar(layoutVar);

  return (
    <>
      <EscMenuContainer isOpen={isOpen} onClose={onClose}></EscMenuContainer>
      <Box
        fontSize="xs"
        className="toolbar"
        padding={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgColor={color}
        borderColor={borderColor}
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
            <ChatIcon {...responsiveFontProps}></ChatIcon>
          </Button>
          <Button onClick={() => onOpen()} {...responsiveFontProps}>
            <SettingsIcon {...responsiveFontProps}></SettingsIcon>&nbsp;{' '}
            <Kbd>Esc</Kbd>
          </Button>
        </HStack>
        <Auth></Auth>
      </Box>
    </>
  );
};
