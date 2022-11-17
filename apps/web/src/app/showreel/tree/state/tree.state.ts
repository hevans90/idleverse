import { makeVar } from '@apollo/client';
import { makeVarPersisted } from '../../../_state/utils';
import { TechnologyNode } from '../utils/create-tree-from-query';
import { TreeNode } from '../utils/tree-structure';

export type TreeNodeWithDepth = {
  depth: number;
  id: string;
  value: TechnologyNode;
  parent?: TreeNode<TechnologyNode>;
  children?: TreeNode<TechnologyNode>[];
};

export const treeNodesVar = makeVar<TreeNodeWithDepth[]>([]);
export const searchResultsVar = makeVar<TreeNodeWithDepth[]>([]);

export const selectedNodeVar = makeVar<TreeNodeWithDepth>(undefined);

export const treeSettingsVar = makeVarPersisted<{
  panelOpen: boolean;
  separation: number;
  depthMulti: number;
  nodeRadius: number;
  snapBack: boolean;
}>(
  {
    panelOpen: false,
    separation: 2.75,
    depthMulti: 250,
    nodeRadius: 50,
    snapBack: true,
  },
  'treeSettings'
);
