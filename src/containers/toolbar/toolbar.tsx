import { Box, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Auth } from '../../_auth/auth';

export const ToolBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const color = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      className="toolbar"
      padding={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgColor={color}
    >
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>

      <Auth></Auth>
    </Box>
  );
};
