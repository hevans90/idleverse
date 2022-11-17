import { useReactiveVar } from '@apollo/client';
import { StackDivider, Text, VStack } from '@chakra-ui/react';
import { useUiBackground } from '../../../../hooks/use-ui-background';
import {
  selectedNodeVar,
  treeNodesVar,
  TreeNodeWithDepth,
} from '../../state/tree.state';

export const TreeNodeEditor = () => {
  const { bg, border } = useUiBackground();

  const selectedNode = useReactiveVar(selectedNodeVar);
  const treeNodes = useReactiveVar(treeNodesVar);

  return (
    <VStack
      spacing={5}
      padding={3}
      position="absolute"
      alignItems="start"
      bgColor={bg}
      bottom={0}
      right={0}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderBottom="unset"
      borderRight="unset"
      divider={<StackDivider borderColor={border} />}
    >
      {treeNodes.length && (
        <>
          {!selectedNode && <Text>Select a node to start editing</Text>}
          {selectedNode && <TreeNodeForm node={selectedNode} />}
        </>
      )}
      {!treeNodes.length && <Text>Start by creating a root node:</Text>}
    </VStack>
  );
};

const TreeNodeForm = ({ node }: { node: TreeNodeWithDepth }) => {
  return <>{node.value.name}</>;
};
