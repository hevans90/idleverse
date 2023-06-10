import { useReactiveVar } from '@apollo/client';
import {
  Checkbox,
  HStack,
  IconButton,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { responsiveFontProps } from '../../../../_responsive-utils/font-props';
import { colorsVar } from '../../../../_state/colors';
import { useUiBackground } from '../../../../hooks/use-ui-background';
import {
  selectedNodeVar,
  treeDebugVar,
  treeNodesVar,
} from '../../state/shared-tree.state';

export const DebugControls = () => {
  const { bg, border } = useUiBackground();
  const { secondary } = useReactiveVar(colorsVar);

  const treeNodes = useReactiveVar(treeNodesVar);
  const selectedNode = useReactiveVar(selectedNodeVar);
  const treeDebugSettings = useReactiveVar(treeDebugVar);

  const isUnlocked = (nodeId: string) =>
    treeDebugSettings.unlockedTechs.includes(nodeId);

  return (
    <VStack
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderRightWidth={0}
      position="absolute"
      right="0"
      top="20%"
      padding={[2, 2, 3]}
      divider={<StackDivider borderColor={border} />}
    >
      <HStack width="100%" justifyContent="space-between">
        <IconButton
          size={['xs', 'sm', 'sm', 'md']}
          aria-label="close color drawer"
          icon={treeDebugSettings.panelOpen ? <MinusIcon /> : <AddIcon />}
          onClick={() =>
            treeDebugVar({
              ...treeDebugSettings,
              panelOpen: !treeDebugSettings.panelOpen,
            })
          }
        />
        <Text>DEBUG</Text>
      </HStack>

      {treeDebugSettings.panelOpen && (
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
      )}

      <HStack width="100%" justifyContent="space-between" mt={5}>
        <Text {...responsiveFontProps} minWidth="175px" fontWeight="bold">
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
    </VStack>
  );
};
