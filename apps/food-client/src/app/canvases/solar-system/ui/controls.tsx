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
import { useState } from 'react';
import {
  solarSystemConfig,
  solarSystemSlidersConfig,
} from '../../../_state/reactive-variables';

export const controlsHeight = 160;

export const SolarSystemControls = () => {
  const color = useColorModeValue('gray.200', 'gray.600');

  const initialSolarSystemConfig = solarSystemConfig();

  const [localConfigValues, setLocalValues] = useState(initialSolarSystemConfig);

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
      height={`${controlsHeight}px`}
      width="100%"
    >
      {solarSystemSlidersConfig.map((slider, index) => (
        <Box
          key={`${index}-container`}
          display="flex"
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
            value={localConfigValues[slider.name]}
            defaultValue={initialSolarSystemConfig[slider.name] as number}
            min={slider.min}
            max={slider.max}
            step={slider.step}
            onChange={(event) => {
              setLocalValues({ ...localConfigValues, [slider.name]: event });
              solarSystemConfig({ ...solarSystemConfig(), [slider.name]: event });
            }}
            focusThumbOnChange={false}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <NumberInput
            key={`${index}-number`}
            flexGrow={0}
            value={localConfigValues[slider.name]}
            defaultValue={initialSolarSystemConfig[slider.name] as number}
            min={slider.min}
            max={slider.max}
            step={slider.step}
            onChange={(event) => {
              setLocalValues({ ...localConfigValues, [slider.name]: event });
              solarSystemConfig({ ...solarSystemConfig(), [slider.name]: event });
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
