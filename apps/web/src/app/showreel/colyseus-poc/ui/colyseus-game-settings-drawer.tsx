/* eslint-disable react/jsx-no-useless-fragment */
import { useReactiveVar } from '@apollo/client';
import { AddIcon, MinusIcon, SettingsIcon } from '@chakra-ui/icons';
import { Checkbox, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { responsiveIconProps } from '../../../_responsive-utils/font-props';
import { colyseusGameSettingsVar } from '../../../_state/colyseus';
import { useUiBackground } from '../../../hooks/use-ui-background';

export const ColyseusGameSettingsDrawer = () => {
  const { bg, border } = useUiBackground();
  const drawerState = useReactiveVar(colyseusGameSettingsVar);

  return (
    <VStack
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderRightWidth={0}
      position="absolute"
      right="0"
      top="40%"
      padding={[2, 2, 3]}
    >
      <HStack width="100%" justifyContent="space-between">
        <SettingsIcon {...responsiveIconProps} />
        <IconButton
          size={['xs', 'sm', 'sm', 'md']}
          aria-label="close color drawer"
          icon={drawerState.panelOpen ? <MinusIcon /> : <AddIcon />}
          onClick={() =>
            colyseusGameSettingsVar({
              ...drawerState,
              panelOpen: !drawerState.panelOpen,
            })
          }
        />
      </HStack>

      {drawerState.panelOpen && (
        <VStack padding={3} w="100%" minWidth="275px">
          <HStack width="100%">
            <Text minWidth="175px">Grid</Text>
            <Checkbox
              size="lg"
              isChecked={drawerState.grid}
              onChange={() =>
                colyseusGameSettingsVar({
                  ...drawerState,
                  grid: !drawerState.grid,
                })
              }
            ></Checkbox>
          </HStack>
          <HStack width="100%">
            <Text minWidth="175px">Bounding Boxes</Text>
            <Checkbox
              size="lg"
              isChecked={drawerState.boundingBoxes}
              onChange={() =>
                colyseusGameSettingsVar({
                  ...drawerState,
                  boundingBoxes: !drawerState.boundingBoxes,
                })
              }
            ></Checkbox>
          </HStack>
          <HStack width="100%">
            <Text minWidth="175px">Player Avatars</Text>
            <Checkbox
              size="lg"
              isChecked={drawerState.avatars}
              onChange={() =>
                colyseusGameSettingsVar({
                  ...drawerState,
                  avatars: !drawerState.avatars,
                })
              }
            ></Checkbox>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};
