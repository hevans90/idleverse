import { useReactiveVar } from '@apollo/client';
import { AddIcon, MinusIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Checkbox,
  HStack,
  IconButton,
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
import { useUiBackground } from '../../../hooks/use-ui-background';
import {
  responsiveFontProps,
  responsiveIconProps,
} from '../../../_responsive-utils/font-props';
import { treeSettingsVar } from '../state/tree.state';

export const TreeSettings = () => {
  const { bg, border } = useUiBackground();

  const treeSettings = useReactiveVar(treeSettingsVar);

  return (
    <VStack
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderLeftWidth={0}
      position="absolute"
      left="0"
      top="40%"
      padding={[2, 2, 3]}
    >
      <HStack width="100%" justifyContent="space-between">
        <SettingsIcon {...responsiveIconProps} />
        <IconButton
          size={['xs', 'sm', 'sm', 'md']}
          aria-label="close color drawer"
          icon={treeSettings.panelOpen ? <MinusIcon /> : <AddIcon />}
          onClick={() =>
            treeSettingsVar({
              ...treeSettings,
              panelOpen: !treeSettings.panelOpen,
            })
          }
        />
      </HStack>

      {treeSettings.panelOpen && (
        <VStack
          padding={3}
          w="100%"
          minWidth="275px"
          spacing={5}
          divider={<StackDivider borderColor={border} />}
        >
          <VStack w="100%">
            <Text {...responsiveFontProps}>Node Radius</Text>
            <NumberInput
              maxW="250px"
              flexGrow={0}
              value={treeSettings.nodeRadius}
              min={10}
              max={100}
              step={1}
              onChange={(event) => {
                treeSettingsVar({
                  ...treeSettings,
                  nodeRadius: parseInt(event),
                });
              }}
            >
              <NumberInputField autoFocus />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </VStack>
          <VStack w="100%">
            <Text {...responsiveFontProps}>Separation</Text>
            <Slider
              defaultValue={treeSettings.separation}
              min={0}
              max={5}
              step={0.01}
              onChange={(val: number) =>
                treeSettingsVar({
                  ...treeSettings,
                  separation: val,
                })
              }
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} bgColor={border} />
            </Slider>
          </VStack>
          <VStack w="100%">
            <Text {...responsiveFontProps}>Depth Multiplier</Text>
            <Slider
              defaultValue={treeSettings.depthMulti}
              min={0}
              max={500}
              step={0.01}
              onChange={(val: number) =>
                treeSettingsVar({
                  ...treeSettings,
                  depthMulti: val,
                })
              }
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} bgColor={border} />
            </Slider>
          </VStack>
          <HStack width="100%">
            <Text mr={3} {...responsiveFontProps}>
              Snap back
            </Text>
            <Checkbox
              size="lg"
              isChecked={treeSettings.snapBack}
              onChange={() =>
                treeSettingsVar({
                  ...treeSettings,
                  snapBack: !treeSettings.snapBack,
                })
              }
            ></Checkbox>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};