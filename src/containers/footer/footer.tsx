import {
  Box,
  ListItem,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  UnorderedList,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { curvature } from '../../_state/reactive-variables';

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
      <VStack>
        <UnorderedList fontSize="small">
          <ListItem marginBottom="1rem">
            Zoom in/out using a mousewheel or pinching on a touchpad.
          </ListItem>
          <ListItem>
            Move the galaxy around by dragging (after zooming in)
          </ListItem>
        </UnorderedList>
        <Slider
          aria-label="curvature-slider"
          defaultValue={3}
          max={10}
          step={0.1}
          onChange={event => {
            curvature(event);
          }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </VStack>
    </Box>
  );
};
