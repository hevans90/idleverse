import { useReactiveVar } from '@apollo/client';
import { Checkbox, HStack, StackDivider, Text, VStack } from '@chakra-ui/react';

import { responsiveFontProps } from '../../../../_responsive-utils/font-props';
import { ExpandingUI } from '../../../../components/expanding-ui';
import { useUiBackground } from '../../../../hooks/use-ui-background';
import {
  selectedNodeVar,
  treeDebugVar,
  treeNodesVar,
} from '../../state/shared-tree.state';

export const DebugControls = () => {
  const { border } = useUiBackground();

  const treeNodes = useReactiveVar(treeNodesVar);
  const selectedNode = useReactiveVar(selectedNodeVar);
  const treeDebugSettings = useReactiveVar(treeDebugVar);

  const isUnlocked = (nodeId: string) =>
    treeDebugSettings.unlockedTechs.includes(nodeId);

  return (
    <ExpandingUI
      icon={null}
      panelOpen={treeDebugSettings.panelOpen}
      onPanelOpenChange={() =>
        treeDebugVar({
          ...treeDebugSettings,
          panelOpen: !treeDebugSettings.panelOpen,
        })
      }
      stackProps={{
        right: '0',
        top: '20%',
        borderRightWidth: 0,
        divider: <StackDivider borderColor={border} />,
      }}
      title="DEBUG"
      footer={
        <HStack width="100%" justifyContent="space-between" mt={2}>
          <Text
            {...responsiveFontProps}
            minWidth="175px"
            fontWeight="bold"
            mr={2}
          >
            UNLOCK ALL
          </Text>
          <Checkbox
            size="lg"
            isChecked={treeDebugSettings.allUnlocked}
            onChange={() =>
              treeDebugVar({
                ...treeDebugSettings,
                allUnlocked: !treeDebugSettings.allUnlocked,
              })
            }
          ></Checkbox>
        </HStack>
      }
    >
      <VStack
        padding={3}
        w="100%"
        minWidth="275px"
        spacing={5}
        divider={<StackDivider borderColor={border} />}
      >
        {treeNodes.map((treeNode) => (
          <HStack
            width="100%"
            key={treeNode.id}
            justifyContent="space-between "
          >
            <Text {...responsiveFontProps} minWidth="175px">
              {treeNode.value.name}
            </Text>
            <Checkbox
              size="lg"
              isChecked={isUnlocked(treeNode.id)}
              onChange={() => {
                const unlocked = isUnlocked(treeNode.id);

                treeDebugVar({
                  ...treeDebugSettings,
                  unlockedTechs: unlocked
                    ? [
                        ...treeDebugSettings.unlockedTechs.filter(
                          (id) => id !== treeNode.id
                        ),
                      ]
                    : [...treeDebugSettings.unlockedTechs, treeNode.id],
                });
              }}
            ></Checkbox>
          </HStack>
        ))}
      </VStack>
    </ExpandingUI>
  );
};
