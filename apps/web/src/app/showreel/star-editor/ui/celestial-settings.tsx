import { useReactiveVar } from '@apollo/client';
import {
  HStack,
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
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { hexToRGB, rgbToHex, useUiBackground } from '@idleverse/theme';

import { responsiveFontProps } from '../../../_responsive-utils/font-props';
import { ExpandingUI } from '../../../components/expanding-ui';
import { celestialSettingsVar } from '../state/celestial.state';

export const CelestialSettings = () => {
  const { border } = useUiBackground();

  const settings = useReactiveVar(celestialSettingsVar);

  const numericalSettings: {
    name: string;
    setting: keyof Pick<
      typeof settings,
      'radius' | 'brightness' | 'coronalStrength' | 'density'
    >;
    precision: number;
    min: number;
    max: number;
    step: number;
  }[] = [
    {
      name: 'Radius',
      setting: 'radius',
      min: 0.1,
      max: 2.5,
      step: 0.1,
      precision: 3,
    },
    {
      name: 'Brightness',
      setting: 'brightness',
      min: 0.01,
      max: 1,
      step: 0.01,
      precision: 3,
    },
    {
      name: 'Corona',
      setting: 'coronalStrength',
      min: 0.01,
      max: 1,
      step: 0.01,
      precision: 3,
    },
    {
      name: 'Density',
      setting: 'density',
      min: 0.01,
      max: 1,
      step: 0.01,
      precision: 3,
    },
  ];

  return (
    <ExpandingUI
      stackProps={{
        left: '0',
        top: '20%',
        borderLeftWidth: 0,
      }}
      panelOpen={settings.panelOpen}
      onPanelOpenChange={() =>
        celestialSettingsVar({
          ...settings,
          panelOpen: !settings.panelOpen,
        })
      }
    >
      <VStack
        padding={3}
        minWidth="275px"
        spacing={5}
        divider={<StackDivider borderColor={border} />}
      >
        {numericalSettings.map(({ name, setting, precision, ...rest }) => (
          <VStack width="100%" key={name}>
            <HStack gap={10} width="100%" justifyContent="space-between">
              <Text {...responsiveFontProps}>{name}</Text>
              <NumberInput
                maxW="150"
                flexGrow={0}
                value={settings[setting]}
                precision={precision}
                onChange={(event) => {
                  celestialSettingsVar({
                    ...settings,
                    [setting]: parseFloat(event),
                  });
                }}
                {...rest}
              >
                <NumberInputField autoFocus />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
            <Slider
              value={settings[setting]}
              onChange={(val: number) =>
                celestialSettingsVar({
                  ...settings,
                  [setting]: val,
                })
              }
              {...rest}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} bgColor={border} />
            </Slider>
          </VStack>
        ))}

        <VStack width="100%">
          <HStack gap={10} width="100%" justifyContent="space-between">
            <Text {...responsiveFontProps}>Color</Text>
            <Input
              value={rgbToHex(settings.color)}
              width="50%"
              type="color"
              onChange={(e) =>
                celestialSettingsVar({
                  ...settings,
                  color: hexToRGB(e.target.value),
                })
              }
            />
          </HStack>
        </VStack>
      </VStack>
    </ExpandingUI>
  );
};
