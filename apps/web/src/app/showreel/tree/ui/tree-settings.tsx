import { useReactiveVar } from '@apollo/client';
import {
  Checkbox,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
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
import { Fragment } from 'react';

import { useUiBackground } from '@idleverse/theme';
import { responsiveFontProps } from '../../../_responsive-utils/font-props';
import { ExpandingUI } from '../../../components/expanding-ui';
import { orientations } from '../orientation';
import { treeSettingsVar } from '../state/shared-tree.state';

export const TreeSettings = () => {
  const { bg, border } = useUiBackground();

  const treeSettings = useReactiveVar(treeSettingsVar);

  return (
    <ExpandingUI
      stackProps={{
        left: '0',
        top: '20%',
        borderLeftWidth: 0,
      }}
      panelOpen={treeSettings.panelOpen}
      onPanelOpenChange={() =>
        treeSettingsVar({ ...treeSettings, panelOpen: !treeSettings.panelOpen })
      }
    >
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
            Orientation
          </Text>
          <Menu>
            <MenuButton
              px={4}
              py={2}
              minW="120px"
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              fontSize="xxs"
            >
              {treeSettings.orientation}
            </MenuButton>
            <MenuList
              bgColor={bg}
              borderWidth="1px"
              borderStyle="solid"
              borderColor={border}
            >
              {orientations.map((orientation, i) => (
                <Fragment key={i}>
                  <MenuItem
                    bgColor={bg}
                    onClick={() => {
                      treeSettingsVar({
                        ...treeSettings,
                        orientation,
                      });
                    }}
                  >
                    {orientation}
                  </MenuItem>
                  {i !== orientations.length - 1 && <MenuDivider />}
                </Fragment>
              ))}
            </MenuList>
          </Menu>
        </HStack>
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
    </ExpandingUI>
  );
};
