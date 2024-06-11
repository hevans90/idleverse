import { useReactiveVar } from '@apollo/client';
import { RepeatIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Input, Text } from '@chakra-ui/react';
import { generateCelestialName } from '@idleverse/galaxy-gen';
import { colorsVar, planetGeneratorConfigVar } from '@idleverse/state';
import { useEffect, useState } from 'react';

export const PlanetNameEditor = () => {
  const currentConfig = useReactiveVar(planetGeneratorConfigVar);

  const [localConfigValues, setLocalValues] = useState(
    planetGeneratorConfigVar()
  );

  useEffect(() => {
    setLocalValues(currentConfig);
  }, [currentConfig]);

  const { secondary } = useReactiveVar(colorsVar);

  return (
    <HStack mb={1}>
      <Text minWidth="100px" fontSize={['2xs', 'xss']}>
        name
      </Text>
      <Input
        fontSize="2xs"
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
  );
};
