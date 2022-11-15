import { makeVar } from '@apollo/client';
import { TechnologyNode } from '../utils/create-tree-from-query';
import { TreeNode } from '../utils/tree-structure';

export const treeNodesVar = makeVar<
  {
    depth: number;
    id: string;
    value: TechnologyNode;
    parent?: TreeNode<TechnologyNode>;
    children?: TreeNode<TechnologyNode>[];
  }[]
>(null);
