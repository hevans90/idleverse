import { TechnologiesQuery } from '@idleverse/galaxy-gql';
import { Tree } from './tree-structure';

export type TechnologyNode = Pick<
  TechnologiesQuery['technology'][0],
  'name' | 'description'
> & { depth: number };

export const createTreeFromQuery = (
  technologies: TechnologiesQuery['technology']
): Tree<TechnologyNode> => {
  const root = technologies.find((tech) => tech?.root === true);

  if (!root) {
    throw new Error('No root node found. Could not create tree.');
  }

  const tree = new Tree<TechnologyNode>(root.id, {
    name: root.name,
    description: root.description,
    depth: 0,
  });

  const generateAndInsertNodes = (
    node: TechnologiesQuery['technology'][0],
    depth = 0
  ) => {
    node.children.forEach((childId) => {
      const childTech = technologies.find(({ id }) => id === childId);

      if (!childTech) {
        throw new Error(`Could not find child with id: ${childId}`);
      }

      tree.insert(
        { parentId: node.id, id: childId },
        {
          name: childTech.name,
          description: childTech?.description,
          depth: depth + 1,
        }
      );

      generateAndInsertNodes(childTech, depth + 1);
    });
  };

  generateAndInsertNodes(root);

  return tree;
};