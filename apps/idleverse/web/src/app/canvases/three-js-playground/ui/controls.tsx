import {
  Box,
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

export type PlanetGeneratorSliderType = {
  name: keyof PlanetGenerationConfig;
  displayName: string;
  min?: number;
  max: number;
  step: number;
};

export const planetGenerationControlsHeight = 160;

export const planetGeneratorSlidersConfig: PlanetGeneratorSliderType[] = [
  {
    name: 'pixelSize',
    displayName: 'Pixel size',
    min: 1,
    max: 15,
    step: 1,
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
    <Box
      className="footer"
      padding="1rem"
      display="flex"
      flexDirection="column"
      bgColor={color}
      position="absolute"
      bottom="0"
      left="0"
      height={`${planetGenerationControlsHeight}px`}
      width="100%"
    >
      {planetGeneratorSlidersConfig.map((slider, index) => (
        <Box
          key={`${index}-container`}
          display="flex"
          alignItems="center"
          marginBottom="5px"
          justifyContent="space-between"
        >
          <Text minWidth="250px" fontSize="small">
            {slider.displayName}
          </Text>
          <Slider
            key={`${index}-slider`}
            flexGrow={1}
            maxWidth="400px"
            aria-label={`${slider.name}-slider`}
            value={localConfigValues[slider.name]}
            defaultValue={initialPlanetGenerationConfig[slider.name] as number}
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
            ml={10}
            key={`${index}-number`}
            flexGrow={0}
            value={localConfigValues[slider.name]}
            defaultValue={initialPlanetGenerationConfig[slider.name] as number}
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
        </Box>
      ))}
    </Box>
  );
};
