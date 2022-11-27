import { makeVar } from '@apollo/client';
import { TechnologyNode } from '../utils/create-tree-from-technologies-query';
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

export const hoveredNodeVar = makeVar<TreeNodeWithDepth>(undefined);
export const selectedNodeVar = makeVar<TreeNodeWithDepth>(undefined);
