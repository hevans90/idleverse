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
import {
  galaxyConfig,
  galaxySlidersConfig,
} from '../../_state/reactive-variables';

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
        {galaxySlidersConfig.map(slider => (
          <Slider
            key={`${slider.name}-slider`}
            aria-label={`${slider.name}-slider`}
            defaultValue={galaxyConfig()[slider.name]}
            min={slider.min}
            max={slider.max}
            step={slider.step}
            onChange={event => {
              galaxyConfig({ ...galaxyConfig(), [slider.name]: event });
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        ))}
      </VStack>
    </Box>
  );
};
