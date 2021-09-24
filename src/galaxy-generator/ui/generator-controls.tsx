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
import {
  galaxyConfig,
  galaxySlidersConfig,
} from '../../_state/reactive-variables';

export const generatorControlsHeight = 300;

export const GeneratorControls = () => {
  const color = useColorModeValue('gray.200', 'gray.600');

  const initialGalaxyConfig = galaxyConfig();

  const [localConfigValues, setLocalValues] = useState(initialGalaxyConfig);

  useEffect(() => {
    setTimeout(() => {
      galaxyConfig({ ...initialGalaxyConfig, radius: 200 });
      setLocalValues({ ...initialGalaxyConfig, radius: 200 });
    }, 100);
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
      height={`${generatorControlsHeight}px`}
      width="100%"
    >
      {galaxySlidersConfig.map((slider, index) => (
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
            defaultValue={initialGalaxyConfig[slider.name] as number}
            min={slider.min}
            max={slider.max}
            step={slider.step}
            onChange={event => {
              setLocalValues({ ...localConfigValues, [slider.name]: event });
              galaxyConfig({ ...galaxyConfig(), [slider.name]: event });
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
            defaultValue={initialGalaxyConfig[slider.name] as number}
            min={slider.min}
            max={slider.max}
            step={slider.step}
            onChange={event => {
              setLocalValues({ ...localConfigValues, [slider.name]: event });
              galaxyConfig({ ...galaxyConfig(), [slider.name]: event });
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
