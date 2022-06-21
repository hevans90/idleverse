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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { galaxyConfigVar } from '../../../_state/reactive-variables';
import { galaxySlidersConfig } from './sliders';

export const generatorControlsHeight = 350;

export const GeneratorControls = () => {
  const color = useColorModeValue('gray.200', 'gray.600');

  const initialGalaxyConfig = galaxyConfigVar();

  const [localConfigValues, setLocalValues] = useState(initialGalaxyConfig);

  useEffect(() => {
    setLocalValues({ ...initialGalaxyConfig });
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
      height={`${generatorControlsHeight}px`}
      width="100%"
      alignItems="start"
    >
      <Box
        maxWidth="600px"
        marginRight="2rem"
        display="flex"
        flexDirection="column"
        flexGrow={1}
      >
        <Box
          display="flex"
          alignItems="center"
          marginBottom="5px"
          justifyContent="space-between"
        >
          <Text minWidth="100px" fontSize="small">
            name
          </Text>
          <Input
            placeholder="galaxy name"
            value={localConfigValues.name}
            onChange={(event) => {
              setLocalValues({
                ...localConfigValues,
                name: event.target.value,
              });
              galaxyConfigVar({
                ...galaxyConfigVar(),
                name: event.target.value,
              });
            }}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          marginBottom="5px"
          justifyContent="space-between"
        >
          <Text minWidth="100px" fontSize="small">
            seed
          </Text>
          <Input
            fontSize="xxs"
            value={localConfigValues.seed}
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
              galaxyConfigVar({
                ...galaxyConfigVar(),
                seed,
              });
            }}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" flexGrow={2}>
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
              value={localConfigValues[slider.name] as number}
              defaultValue={initialGalaxyConfig[slider.name] as number}
              min={slider.min}
              max={slider.max}
              step={slider.step}
              onChange={(event) => {
                setLocalValues({ ...localConfigValues, [slider.name]: event });
                galaxyConfigVar({ ...galaxyConfigVar(), [slider.name]: event });
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
              marginLeft="1rem"
              flexGrow={0}
              value={localConfigValues[slider.name]}
              defaultValue={initialGalaxyConfig[slider.name] as number}
              min={slider.min}
              max={slider.max}
              step={slider.step}
              onChange={(event) => {
                setLocalValues({ ...localConfigValues, [slider.name]: event });
                galaxyConfigVar({ ...galaxyConfigVar(), [slider.name]: event });
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
    </HStack>
  );
};
