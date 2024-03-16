import { HStack, Switch, Text, VStack } from '@chakra-ui/react';

import { useReactiveVar } from '@apollo/client';
import { colorsVar, planetGeneratorConfigVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { planetGenerationControlsHeight } from './sliders';

export const PlanetGeneratorBooleans = () => {
  const { bg, border } = useUiBackground();

  const { secondary } = useReactiveVar(colorsVar);

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
        <Switch
          colorScheme={secondary}
          size="lg"
          isChecked={planetGeneratorConfigVar().ui}
          onChange={() =>
            planetGeneratorConfigVar({
              ...planetGeneratorConfigVar(),
              ui: !planetGeneratorConfigVar().ui,
            })
          }
        />
      </HStack>
      <HStack width="100%" display={['none', 'none', 'none', 'flex']}>
        <Text minWidth="175px" fontSize="small">
          Atmosphere
        </Text>
        <Switch
          colorScheme={secondary}
          size="lg"
          isChecked={planetGeneratorConfigVar().atmosphere}
          onChange={() =>
            planetGeneratorConfigVar({
              ...planetGeneratorConfigVar(),
              atmosphere: !planetGeneratorConfigVar().atmosphere,
            })
          }
        />
      </HStack>
      <HStack width="100%" display={['none', 'none', 'none', 'flex']}>
        <Text minWidth="175px" fontSize="small">
          Rotate
        </Text>
        <Switch
          colorScheme={secondary}
          size="lg"
          isChecked={planetGeneratorConfigVar().rotate}
          onChange={() =>
            planetGeneratorConfigVar({
              ...planetGeneratorConfigVar(),
              rotate: !planetGeneratorConfigVar().rotate,
            })
          }
        />
      </HStack>
    </VStack>
  );
};
