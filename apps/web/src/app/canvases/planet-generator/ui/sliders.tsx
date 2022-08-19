import { useReactiveVar } from '@apollo/client';
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
} from '@chakra-ui/react';
import { generateCelestialName } from '@idleverse/galaxy-gen';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useUiBackground } from '../../../hooks/use-ui-background';
import { responsiveFontProps } from '../../../_responsive-utils/font-props';
import { colorsVar } from '../../../_state/colors';
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
    name: 'radius',
    displayName: 'Radius',
    min: 1,
    max: 8,
    step: 0.25,
  },
  {
    name: 'atmosphericDistance',
    displayName: 'Atmospheric Dist.',
    min: 1,
    max: 8,
    step: 1,
  },
  {
    name: 'pixelSize',
    displayName: 'Pixel size',
    min: 1,
    max: 15,
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
    <HStack
      className="footer"
      padding={3}
      bgColor={bg}
      borderStyle="solid"
      borderColor={border}
      borderTopWidth="1px"
      position="absolute"
      bottom="0"
      left="0"
      height={`${planetGenerationControlsHeight}px`}
      width="100%"
      alignItems="start"
      justifyContent="space-between"
    >
      <Box
        display={['none', 'none', 'none', 'flex']}
        maxWidth="600px"
        flexDirection="column"
        flexGrow={1}
        marginRight="2rem"
      >
        <HStack mb={1}>
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
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={2}
        maxWidth={['unset', 'unset', 'unset', '60%', '50%', '40%']}
      >
        {planetGeneratorSlidersConfig.map((slider, index) => (
          <HStack
            key={`${index}-container`}
            alignItems="center"
            marginBottom="5px"
            justifyContent="space-between"
            spacing={5}
          >
            <Text minWidth="250px" fontSize={['xxs', 'xs']}>
              {slider.displayName}
            </Text>
            <Slider
              display={['none', 'none', 'none', 'block']}
              mr={10}
              key={`${index}-slider`}
              maxWidth={[200, 300, 400]}
              aria-label={`${slider.name}-slider`}
              value={localConfigValues[slider.name] as number}
              defaultValue={
                initialPlanetGenerationConfig[slider.name] as number
              }
              min={slider.min}
              max={slider.max}
              step={slider.step}
              onChange={(event: number) => {
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
              key={`${index}-number`}
              value={localConfigValues[slider.name] as number}
              defaultValue={
                initialPlanetGenerationConfig[slider.name] as number
              }
              min={slider.min}
              max={slider.max}
              step={slider.step}
              onChange={(event: string) => {
                setLocalValues({
                  ...localConfigValues,
                  [slider.name]: parseFloat(event),
                });
                planetGeneratorConfigVar({
                  ...planetGeneratorConfigVar(),
                  [slider.name]: parseFloat(event),
                });
              }}
            >
              <NumberInputField autoFocus {...responsiveFontProps} />
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
