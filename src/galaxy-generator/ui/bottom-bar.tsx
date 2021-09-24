import {
  Box,
  ListItem,
  UnorderedList,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { generatorControlsHeight } from './generator-controls';

export const GameUIBottomBar = () => {
  const bg = useColorModeValue('gray.300', 'gray.700');
  const border = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      padding="1rem"
      display="flex"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      bottom={generatorControlsHeight}
      left="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderLeft="unset"
      borderBottom="unset"
    >
      <VStack>
        <UnorderedList fontSize="small">
          <ListItem marginBottom="1rem">
            Zoom in/out using a mousewheel or pinching on a touchpad.
          </ListItem>
          <ListItem>
            Move the galaxy around by dragging (after zooming in)
          </ListItem>
        </UnorderedList>
      </VStack>
    </Box>
  );
};
