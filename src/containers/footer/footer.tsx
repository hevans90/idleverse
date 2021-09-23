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
  galaxyConfig,
  galaxySlidersConfig,
} from '../../_state/reactive-variables';

export const Footer = () => {
  const color = useColorModeValue('gray.200', 'gray.600');

  const initialGalaxyConfig = galaxyConfig();

  const [localConfigValues, setLocalValues] = useState(initialGalaxyConfig);

  // useEffect(() => {
  //   galaxyConfig({ ...initialGalaxyConfig, radius: 300 });
  // }, []);

  return (
    <Box
      className="footer"
      padding="1rem"
      display="flex"
      flexDirection="column"
      bgColor={color}
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
