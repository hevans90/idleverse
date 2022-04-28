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
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SolarSystemConfig } from '../../../_state/models';
import { solarSystemConfigVar } from '../../../_state/reactive-variables';

export type SolarSystemSliderType = {
  name: keyof SolarSystemConfig;
  displayName: string;
  min?: number;
  max: number;
  step: number;
};

export const solarSystemControlsHeight = 160;

export const solarSystemSlidersConfig: SolarSystemSliderType[] = [
  {
    name: 'viewAngle',
    displayName: 'View Angle',
    max: 90,
    step: 1,
  },
  {
    name: 'simulationSpeed',
    displayName: 'Sim. Speed',
    min: 1,
    max: 10,
    step: 1,
  },
];

export const SolarSystemControls = () => {
  const color = useColorModeValue('gray.200', 'gray.600');

  const initialSolarSystemConfig = solarSystemConfigVar();

  const [localConfigValues, setLocalValues] = useState(
    initialSolarSystemConfig
  );

  useEffect(() => {
    setLocalValues({ ...initialSolarSystemConfig });
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
      height={`${solarSystemControlsHeight}px`}
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
          <Text minWidth="250px" fontSize="small">
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
              solarSystemConfigVar({
                ...solarSystemConfigVar(),
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
            defaultValue={initialSolarSystemConfig[slider.name] as number}
            min={slider.min}
            max={slider.max}
            step={slider.step}
            onChange={(event) => {
              setLocalValues({ ...localConfigValues, [slider.name]: event });
              solarSystemConfigVar({
                ...solarSystemConfigVar(),
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
