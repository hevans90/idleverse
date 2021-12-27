import { useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  HStack,
  StackDivider,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Auth } from '../../_auth/auth';
import { layoutVar } from '../../_state/persisted-reactive-variables';

export const ToolBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const color = useColorModeValue('gray.200', 'gray.700');

  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const { sideNav, toolBar } = useReactiveVar(layoutVar);

  return (
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
      <HStack divider={<StackDivider borderColor="gray.600" />}>
        <Button fontSize="xs" onClick={toggleColorMode}>
          Theme
        </Button>

        <Button
          fontSize="xs"
          onClick={() => {
            layoutVar({ sideNav: !sideNav, toolBar });
          }}
        >
          Chat
        </Button>
      </HStack>

      <Auth></Auth>
    </Box>
  );
};
