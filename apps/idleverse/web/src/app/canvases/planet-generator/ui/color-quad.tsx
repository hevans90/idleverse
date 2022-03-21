import { HStack, VStack, Box } from '@chakra-ui/react';
import { LocalPalette } from './color-drawer';

export const ColorQuad = ({ water, sand, grass, forest }: LocalPalette) => (
  <HStack maxWidth="48px">
    <VStack>
      <Box w={5} h={5} bgColor={water}></Box>
      <Box w={5} h={5} bgColor={sand}></Box>
    </VStack>
    <VStack>
      <Box w={5} h={5} bgColor={grass}></Box>
      <Box w={5} h={5} bgColor={forest}></Box>
    </VStack>
  </HStack>
);
