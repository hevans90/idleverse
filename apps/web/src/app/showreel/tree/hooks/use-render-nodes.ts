import { useReactiveVar } from '@apollo/client';
import { colors } from '@idleverse/theme';
import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { colorsVar } from '../../../_state/colors';

import { TreeNodeWithDepth, treeSettingsVar } from '../state/shared-tree.state';
import { TechnologyNode } from '../utils/create-tree-from-technologies-query';
import { QuestNode } from '../utils/create-trees-from-quests-query';

import { connectNodes, drawNode } from '../utils/draw-node';

export const useRenderNodes = (
  nodesWithDepth: TreeNodeWithDepth<QuestNode | TechnologyNode>[],
  container: PIXI.Container,
  size: { width: number; height: number }
) => {
  const {
    separation: separationMultiplier,
    depthMulti: depthMultiplier,
    nodeRadius,
  } = useReactiveVar(treeSettingsVar);

  useEffect(() => {
    const asyncAdd = async () => {
      for (const node of nodesWithDepth) {
        let x = 0;
        const y = -size.height / 3 + node.depth * depthMultiplier;

        let parent: { x: number; y: number };

        const palette = colors[colorsVar().secondary];

        if (node.parent) {
          const parentRenderedNode = container.getChildByName(node.parent.id);

          parent = parentRenderedNode.position;

          x = parent?.x;

          const siblings = node.parent.children
            .filter(({ id }) => id !== node.id)
            .map(({ id }) => container.getChildByName(id));

          const renderedSiblings = siblings.filter(
            (element) => element !== null
          );

          const generationCount = siblings.length + 1;

          const nodeWidth =
            (2 * (depthMultiplier / 10) * (3 / generationCount)) / node.depth;

          const separation = 2 * nodeWidth * separationMultiplier;

          const lowerbound =
            nodeWidth * siblings.length + separation * siblings.length;

          if (!renderedSiblings.length) {
            x -= lowerbound / 2;
          } else {
            x =
              renderedSiblings[renderedSiblings.length - 1].position.x +
              nodeWidth +
              separation;
          }

          if (generationCount === 1) {
            x = parentRenderedNode?.position.x;
          }
        }

        const nodeContainer = await drawNode({
          id: node.id,
          name: node.value.name,
          imageUrl: node.value.image_url,
          position: {
            x,
            y,
          },
          colorPalette: palette,
          radius: nodeRadius,
        });

        if (parent) {
          const line = connectNodes({
            parent,
            self: { x, y },
            color: colors[colorsVar().secondary]['300'],
          });
          line.name = `line_${node.id}`;
          container.addChild(line);
        }
        container.addChild(nodeContainer);
      }
    };

    // this is hacky but forces  a re-run of the `useNodeInteractions` hook after each change... it works but not gud.
    asyncAdd().then(() => treeSettingsVar({ ...treeSettingsVar() }));

    return () => {
      nodesWithDepth.forEach((node) => {
        const renderedNode = container.getChildByName(node.id);
        const renderedLine = container.getChildByName(`line_${node.id}`);

        if (renderedNode) {
          container.removeChild(renderedNode);
          renderedNode.destroy(true);
        }
        if (renderedLine) {
          container.removeChild(renderedLine);
          renderedLine.destroy(true);
        }
      });
    };
  }, [nodesWithDepth, separationMultiplier, depthMultiplier, nodeRadius]);
};
