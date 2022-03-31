import {
  Checkbox,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { planetGeneratorConfigVar } from '../../../_state/planet-generation';
import { planetGenerationControlsHeight } from './sliders';

export const PlanetGeneratorBooleans = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack
      position="absolute"
      right="0"
      bottom={`${planetGenerationControlsHeight}px`}
      bgColor={bgColor}
      spacing={5}
      padding={3}
    >
      <HStack width="100%">
        <Text minWidth="175px" fontSize="small">
          UI
        </Text>
        <Checkbox
          isChecked={planetGeneratorConfigVar().ui}
          onChange={() =>
            planetGeneratorConfigVar({
              ...planetGeneratorConfigVar(),
              ui: !planetGeneratorConfigVar().ui,
            })
          }
        ></Checkbox>
      </HStack>
      <HStack width="100%">
        <Text minWidth="175px" fontSize="small">
          Atmosphere
        </Text>
        <Checkbox
          isChecked={planetGeneratorConfigVar().atmosphere}
          onChange={() =>
            planetGeneratorConfigVar({
              ...planetGeneratorConfigVar(),
              atmosphere: !planetGeneratorConfigVar().atmosphere,
            })
          }
        ></Checkbox>
      </HStack>
      <HStack width="100%">
        <Text minWidth="175px" fontSize="small">
          Rotate
        </Text>
        <Checkbox
          isChecked={planetGeneratorConfigVar().rotate}
          onChange={() =>
            planetGeneratorConfigVar({
              ...planetGeneratorConfigVar(),
              rotate: !planetGeneratorConfigVar().rotate,
            })
          }
        ></Checkbox>
      </HStack>
    </VStack>
  );
};
