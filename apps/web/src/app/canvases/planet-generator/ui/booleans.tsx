import { Checkbox, HStack, Text, VStack } from '@chakra-ui/react';
import { useUiBackground } from '../../../hooks/use-ui-background';
import { planetGeneratorConfigVar } from '../../../_state/planet-generation';
import { planetGenerationControlsHeight } from './sliders';

export const PlanetGeneratorBooleans = () => {
  const { bg, border } = useUiBackground();

  return (
    <VStack
      position="absolute"
      right="0"
      bottom={`${planetGenerationControlsHeight}px`}
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderBottomWidth={0}
      borderRightWidth={0}
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
      <HStack width="100%" display={['none', 'none', 'none', 'flex']}>
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
      <HStack width="100%" display={['none', 'none', 'none', 'flex']}>
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
