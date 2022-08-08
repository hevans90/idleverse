import { Box, ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import { useUiBackground } from '../../../hooks/use-ui-background';
import { generatorControlsHeight } from './generator-controls';

export const GameUIBottomBar = ({ bottom }: { bottom?: number }) => {
  const { bg, border } = useUiBackground();

  if (bottom === undefined) {
    bottom = generatorControlsHeight;
  }

  return (
    <Box
      padding="1rem"
      display="flex"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      bottom={`${bottom}px`}
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
