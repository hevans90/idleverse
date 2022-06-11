import { Box, HStack, VStack } from '@chakra-ui/react';
import { TerrainHexPalette } from '../../../_state/models';

export const ColorQuad = ({
  water,
  sand,
  grass,
  forest,
}: TerrainHexPalette) => (
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
