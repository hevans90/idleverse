import { useReactiveVar } from '@apollo/client';
import { RepeatIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react';
import { generateCelestialName } from '@idleverse/galaxy-gen';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useUiBackground } from '../../../hooks/use-ui-background';
import { colorsVar } from '../../../_state/colors';

import { planetGeneratorConfigVar } from '../../../_state/planet-generation';
import { planetGenerationControlsHeight } from './sliders';

export const NameSeedMobile = () => {
  const { bg, border } = useUiBackground();
  const { secondary } = useReactiveVar(colorsVar);

  const initialPlanetGenerationConfig = planetGeneratorConfigVar();

  const [localConfigValues, setLocalValues] = useState(
    initialPlanetGenerationConfig
  );

  useEffect(() => {
    setLocalValues({ ...initialPlanetGenerationConfig });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack
      display={['flex', 'flex', 'flex', 'none']}
      position="absolute"
      right="0"
      bottom={`${planetGenerationControlsHeight}px`}
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderBottomWidth={0}
      borderRightWidth={0}
      spacing={2}
      padding={2}
    >
      <HStack>
        <Text minWidth="100px" fontSize={['xxs', 'xs']}>
          name
        </Text>
        <Input
          fontSize="xxs"
          value={localConfigValues.name}
          maxLength={25}
          flexGrow="1"
          onChange={(event) => {
            setLocalValues({
              ...localConfigValues,
              name: event.target.value,
            });

            planetGeneratorConfigVar({
              ...planetGeneratorConfigVar(),
              name: event.target.value,
            });
          }}
        />
        <IconButton
          marginLeft="0.3rem"
          colorScheme={secondary}
          aria-label="Generate new name"
          icon={<RepeatIcon />}
          onClick={() => {
            const name = generateCelestialName();

            setLocalValues({
              ...localConfigValues,
              name,
            });

            planetGeneratorConfigVar({
              ...planetGeneratorConfigVar(),
              name,
            });
          }}
        />
      </HStack>
      <HStack>
        <Text minWidth="100px" fontSize={['xxs', 'xs']}>
          seed
        </Text>
        <Input
          fontSize="xxs"
          value={localConfigValues.seed}
          flexGrow="1"
          isReadOnly={true}
        />
        <IconButton
          marginLeft="0.3rem"
          colorScheme={secondary}
          aria-label="Generate new seed"
          icon={<RepeatIcon />}
          onClick={() => {
            const seed = uuidv4();

            setLocalValues({
              ...localConfigValues,
              seed,
            });
            planetGeneratorConfigVar({
              ...planetGeneratorConfigVar(),
              seed,
            });
          }}
        />
      </HStack>
    </VStack>
  );
};