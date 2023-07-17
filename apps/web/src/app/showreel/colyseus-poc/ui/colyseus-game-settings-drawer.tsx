import { useReactiveVar } from '@apollo/client';
import { Checkbox, HStack, Text, VStack } from '@chakra-ui/react';

import { colyseusGameSettingsVar } from '@idleverse/state';
import { ExpandingUI } from '../../../components/expanding-ui';

export const ColyseusGameSettingsDrawer = () => {
  const drawerState = useReactiveVar(colyseusGameSettingsVar);

  return (
    <ExpandingUI
      stackProps={{
        right: '0',
        top: '40%',
        borderRightWidth: 0,
      }}
      panelOpen={drawerState.panelOpen}
      onPanelOpenChange={() =>
        colyseusGameSettingsVar({
          ...drawerState,
          panelOpen: !drawerState.panelOpen,
        })
      }
    >
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
      ;
    </ExpandingUI>
  );
};
