import { Box, useColorModeValue } from '@chakra-ui/react';

export const Footer = () => {
  const color = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      className="footer"
      padding={2}
      display="flex"
      alignItems="center"
      bgColor={color}
    ></Box>
  );
};
