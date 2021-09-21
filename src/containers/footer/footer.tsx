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
} from "@chakra-ui/react";

export const Footer = (props: {
  curvature: number;
  setCurvature: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const color = useColorModeValue("gray.200", "gray.600");

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
          aria-label="slider-ex-1"
          defaultValue={30}
          onChange={(event) => {
            props.setCurvature(event);
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
