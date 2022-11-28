import { QuestsQuery } from '@idleverse/galaxy-gql';
import { Tree } from './tree-structure';

export type QuestNode = Partial<QuestsQuery['quest'][0]> & {
  depth: number;
};

export const createTreesFromQuestsQuery = (
  quests: QuestsQuery['quest']
): Tree<QuestNode>[] => {
  const roots = quests.filter((tech) => tech?.initial === true);

  if (!roots.length) {
    throw new Error('No root node(s) found. Could not create tree.');
  }

  const trees: Tree<QuestNode>[] = [];

  roots.forEach((root) => {
    const tree = new Tree<QuestNode>(root.id, {
      ...root,
      depth: 0,
    });
    const generateAndInsertNodes = (
      node: QuestsQuery['quest'][0],
      depth = 0
    ) => {
      if (node.next_quest_in_chain) {
        const childQuest = quests.find(
          ({ id }) => id === node.next_quest_in_chain
        );

        if (!childQuest) {
          console.warn(
            `Could not find child quest with id: ${node.next_quest_in_chain}`
          );
          return;
        }
        tree.insert(
          { parentId: node.id, id: node.next_quest_in_chain },
          {
            ...childQuest,
            depth: depth + 1,
          }
        );

        generateAndInsertNodes(childQuest, depth + 1);
      }
    };

    generateAndInsertNodes(root);
    trees.push(tree);
  });

  return trees;
};
