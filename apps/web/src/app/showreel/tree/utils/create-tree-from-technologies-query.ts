import { TechnologiesQuery } from '@idleverse/galaxy-gql';
import { Tree } from './tree-structure';

export type TechnologyNode = Partial<TechnologiesQuery['technology'][0]> & {
  depth: number;
};

export const createTreeFromTechnologiesQuery = (
  technologies: TechnologiesQuery['technology']
): Tree<TechnologyNode> => {
  const root = technologies.find((tech) => tech?.root === true);

  if (!root) {
    throw new Error('No root node found. Could not create tree.');
  }

  const tree = new Tree<TechnologyNode>(root.id, {
    ...root,
    depth: 0,
  });

  const generateAndInsertNodes = (
    node: TechnologiesQuery['technology'][0],
    depth = 0
  ) => {
    node.children.forEach((childId) => {
      const childTech = technologies.find(({ id }) => id === childId);

      if (!childTech) {
        console.warn(`Could not find child with id: ${childId}`);
        return;
      }

      tree.insert(
        { parentId: node.id, id: childId },
        {
          ...childTech,
          depth: depth + 1,
        }
      );

      generateAndInsertNodes(childTech, depth + 1);
    });
  };

  generateAndInsertNodes(root);

  return tree;
};
