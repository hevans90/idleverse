import { RepeatIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlanetGenerationConfig } from '../../../_state/models';
import { planetGeneratorConfigVar } from '../../../_state/planet-generation';

export type PlanetGeneratorSliderType = {
  name: keyof PlanetGenerationConfig;
  displayName: string;
  min?: number;
  max: number;
  step: number;
};

export const planetGenerationControlsHeight = 200;

export const planetGeneratorSlidersConfig: PlanetGeneratorSliderType[] = [
  {
    name: 'pixelSize',
    displayName: 'Pixel size',
    min: 1,
    max: 15,
    step: 1,
  },
  {
    name: 'atmosphericDistance',
    displayName: 'Atmospheric Dist.',
    min: 1,
    max: 8,
    step: 1,
  },
  {
    name: 'textureResolution',
    displayName: 'Resolution',
    min: 16,
    max: 1024,
    step: 16,
  },
];

export const PlanetGeneratorSliders = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.600');

  const initialPlanetGenerationConfig = planetGeneratorConfigVar();

  const [localConfigValues, setLocalValues] = useState(
    initialPlanetGenerationConfig
  );

  useEffect(() => {
    setLocalValues({ ...initialPlanetGenerationConfig });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HStack
      className="footer"
      padding={3}
      bgColor={bgColor}
      position="absolute"
      bottom="0"
      left="0"
      height={`${planetGenerationControlsHeight}px`}
      width="100%"
      alignItems="start"
    >
      <Box
        maxWidth="600px"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        marginRight="2rem"
      >
        <HStack>
          <Text minWidth="100px" fontSize="small">
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
            colorScheme="teal"
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
      </Box>
      <Box display="flex" flexDirection="column" flexGrow={2}>
        {planetGeneratorSlidersConfig.map((slider, index) => (
          <HStack
            key={`${index}-container`}
            alignItems="center"
            marginBottom="5px"
            justifyContent="space-between"
          >
            <Text minWidth="300px" fontSize="small">
              {slider.displayName}
            </Text>
            <Slider
              key={`${index}-slider`}
              flexGrow={1}
              maxWidth="400px"
              aria-label={`${slider.name}-slider`}
              value={localConfigValues[slider.name] as number}
              defaultValue={
                initialPlanetGenerationConfig[slider.name] as number
              }
              min={slider.min}
              max={slider.max}
              step={slider.step}
              onChange={(event) => {
                setLocalValues({ ...localConfigValues, [slider.name]: event });
                planetGeneratorConfigVar({
                  ...planetGeneratorConfigVar(),
                  [slider.name]: event,
                });
              }}
              focusThumbOnChange={false}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>

            <NumberInput
              ml="1rem"
              key={`${index}-number`}
              flexGrow={0}
              value={localConfigValues[slider.name] as number}
              defaultValue={
                initialPlanetGenerationConfig[slider.name] as number
              }
              min={slider.min}
              max={slider.max}
              step={slider.step}
              onChange={(event) => {
                setLocalValues({ ...localConfigValues, [slider.name]: event });
                planetGeneratorConfigVar({
                  ...planetGeneratorConfigVar(),
                  [slider.name]: event,
                });
              }}
            >
              <NumberInputField autoFocus />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        ))}
      </Box>
    </HStack>
  );
};