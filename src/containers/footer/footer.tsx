import {
  Box,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react';

export const Footer = () => {
  const color = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      className="footer"
      padding="1rem"
      display="flex"
      alignItems="start"
      bgColor={color}
    >
      <UnorderedList fontSize="small">
        <ListItem marginBottom="1rem">
          Zoom in/out using a mousewheel or pinching on a touchpad.
        </ListItem>
        <ListItem>
          Move the galaxy around by dragging (after zooming in)
        </ListItem>
      </UnorderedList>
    </Box>
  );
};
