import { Box, Kbd, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useKeypress } from '../../hooks/use-keypress';
import { Auth } from '../../_auth/auth';
import { EscMenuContainer } from '../esc-menu/escape-menu.container';

export const ToolBar = () => {
  const color = useColorModeValue('gray.200', 'gray.700');

  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useKeypress('Escape', () => isOpen || onOpen());

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <EscMenuContainer isOpen={isOpen} onClose={onClose}></EscMenuContainer>
      <Box
        className="toolbar"
        padding={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgColor={color}
        borderColor={borderColor}
        borderBottomStyle="solid"
        borderBottomWidth="1px"
      >
        <span>
          Settings: <Kbd>Esc</Kbd>
        </span>
        <Auth></Auth>
      </Box>
    </>
  );
};
