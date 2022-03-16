import {
  Box,
  Checkbox,
  HStack,
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PlanetGenerationConfig } from '../../../_state/models';
import { planetGeneratorConfigVar } from '../../../_state/reactive-variables';
import { VStack } from '@chakra-ui/react';

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

export const PlanetGeneratorControls = () => {
  const color = useColorModeValue('gray.200', 'gray.600');

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
      padding="1rem"
      bgColor={color}
      position="absolute"
      bottom="0"
      left="0"
      height={`${planetGenerationControlsHeight}px`}
      width="100%"
      justifyContent="space-around"
      alignItems="start"
    >
      <VStack width="75%">
        {planetGeneratorSlidersConfig.map((slider, index) => (
          <HStack
            width="100%"
            key={`${index}-container`}
            alignItems="center"
            spacing="100px"
          >
            <Text width="20%" fontSize="small">
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
              maxWidth="150px"
              ml={10}
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
      </VStack>

      <VStack spacing={5}>
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
    </HStack>
  );
};
