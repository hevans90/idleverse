import { Box, Checkbox, useColorModeValue } from '@chakra-ui/react';
import { animate } from '../../_state/reactive-variables';

export const GameUIRightBar = () => {
  const bg = useColorModeValue('gray.300', 'gray.700');
  const border = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      padding="1rem"
      display="flex"
      flexDirection="column"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      bottom="0"
      right="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderRight="unset"
    >
      <Checkbox checked={animate()} onChange={() => animate(!animate())}>
        Animate
      </Checkbox>
    </Box>
  );
};
