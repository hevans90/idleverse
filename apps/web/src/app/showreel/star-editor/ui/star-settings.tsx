import { useReactiveVar } from '@apollo/client';
import {
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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

import {
  celestialPresets,
  celestialSettingsVar,
  colorsVar,
} from '@idleverse/state';
import { Fragment } from 'react';
import { responsiveFontProps } from '../../../_responsive-utils/font-props';
import { ExpandingUI } from '../../../components/expanding-ui';

export const StarSettings = () => {
  const { border, bg } = useUiBackground();
  const { primary } = useReactiveVar(colorsVar);

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
        <Menu>
          <MenuButton
            px={4}
            py={2}
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: `${primary}.500` }}
            _expanded={{ bg: `${primary}.700` }}
            _focus={{ boxShadow: 'outline' }}
          >
            {settings.preset.replace('-', ' ')}
          </MenuButton>
          <MenuList bg={bg} zIndex={2}>
            {celestialPresets.map(({ preset, ...rest }, i) => (
              <Fragment key={i}>
                <MenuItem
                  bg={bg}
                  _hover={{ bg: `${primary}.500` }}
                  onClick={() => {
                    celestialSettingsVar({ ...settings, preset, ...rest });
                  }}
                >
                  {preset.replace('-', ' ')}
                </MenuItem>
              </Fragment>
            ))}
          </MenuList>
        </Menu>

        {numericalSettings.map(({ name, setting, precision, ...rest }) => (
          <VStack width="100%" key={name} zIndex={1}>
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
