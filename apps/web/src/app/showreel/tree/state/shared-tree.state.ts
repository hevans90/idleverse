import { makeVar } from '@apollo/client';
import { makeVarPersisted } from '../../../_state/utils';
import { Orientation } from '../orientation';
import { TechnologyNode } from '../utils/create-tree-from-technologies-query';
import { QuestNode } from '../utils/create-trees-from-quests-query';
import { TreeNode } from '../utils/tree-structure';

export type TreeNodeWithDepth<T> = {
  depth: number;
  id: string;
  value: T;
  parent?: TreeNode<T>;
  children?: TreeNode<T>[];
};

export const treeSettingsVar = makeVarPersisted<{
  panelOpen: boolean;
  separation: number;
  depthMulti: number;
  nodeRadius: number;
  snapBack: boolean;
  orientation: Orientation;
}>(
  {
    panelOpen: false,
    separation: 2.75,
    depthMulti: 250,
    nodeRadius: 50,
    snapBack: true,
    orientation: 'top-to-bottom',
  },
  'treeSettings'
);

export const treeNodesVar = makeVar<
  TreeNodeWithDepth<TechnologyNode | QuestNode>[]
>([]);
export const searchResultsVar = makeVar<
  TreeNodeWithDepth<TechnologyNode | QuestNode>[]
>([]);

export const hoveredNodeVar =
  makeVar<TreeNodeWithDepth<TechnologyNode | QuestNode>>(undefined);
export const selectedNodeVar =
  makeVar<TreeNodeWithDepth<TechnologyNode | QuestNode>>(undefined);
