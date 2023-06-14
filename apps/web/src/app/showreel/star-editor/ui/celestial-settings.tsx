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
import { hexToRGB, rgbToHex } from '@idleverse/theme';
import { responsiveFontProps } from '../../../_responsive-utils/font-props';
import { ExpandingUI } from '../../../components/expanding-ui';
import { useUiBackground } from '../../../hooks/use-ui-background';
import { celestialSettingsVar } from '../state/celestial.state';

export const CelestialSettings = () => {
  const { border } = useUiBackground();

  const settings = useReactiveVar(celestialSettingsVar);

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
        <VStack width="100%">
          <HStack gap={10} width="100%" justifyContent="space-between">
            <Text {...responsiveFontProps}>Radius</Text>
            <NumberInput
              maxW="150"
              flexGrow={0}
              value={settings.radius}
              precision={3}
              min={0.01}
              max={0.9}
              step={0.01}
              onChange={(event) => {
                celestialSettingsVar({
                  ...settings,
                  radius: parseFloat(event),
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
          <Slider
            value={settings.radius}
            min={0.01}
            max={0.9}
            step={0.01}
            onChange={(val: number) =>
              celestialSettingsVar({
                ...settings,
                radius: val,
              })
            }
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} bgColor={border} />
          </Slider>
        </VStack>
        <VStack>
          <HStack gap={10}>
            <Text {...responsiveFontProps}>Brightness</Text>
            <NumberInput
              maxW="150"
              flexGrow={0}
              value={settings.brightness}
              precision={3}
              min={0.001}
              max={1}
              step={0.001}
              onChange={(event) => {
                celestialSettingsVar({
                  ...settings,
                  brightness: parseFloat(event),
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
          <Slider
            value={settings.brightness}
            min={0}
            max={1}
            step={0.001}
            onChange={(val: number) =>
              celestialSettingsVar({
                ...settings,
                brightness: val,
              })
            }
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} bgColor={border} />
          </Slider>
        </VStack>
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
