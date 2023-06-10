import { useReactiveVar } from '@apollo/client';
import { colors } from '@idleverse/theme';
import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { colorsVar } from '../../../_state/colors';

import { TreeNodeWithDepth, treeSettingsVar } from '../state/shared-tree.state';
import { TechnologyNode } from '../utils/create-tree-from-technologies-query';
import { QuestNode } from '../utils/create-trees-from-quests-query';

import { orientationConfig } from '../orientation';
import { connectNodes, drawNode } from '../utils/draw-node';

/**
 * Renders a tree!
 */
export const useRenderNodes = ({
  nodesWithDepth,
  unlockedNodeIds,
  container,
  size,
  allUnlocked,
}: {
  nodesWithDepth: TreeNodeWithDepth<QuestNode | TechnologyNode>[];
  unlockedNodeIds: string[];
  container: PIXI.Container;
  size: { width: number; height: number };
  allUnlocked: boolean;
}) => {
  const {
    separation: separationMultiplier,
    depthMulti: depthMultiplier,
    nodeRadius,
    orientation,
  } = useReactiveVar(treeSettingsVar);

  const isUnlocked = (nodeId: string) =>
    allUnlocked || unlockedNodeIds.includes(nodeId);

  const cleanupRenderedNodes = () =>
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

  useEffect(() => {
    // run cleanup at the start for remounts - the return cleanup doesn't always handle the horrendous async reality of canvases
    cleanupRenderedNodes();
    const asyncAdd = async () => {
      const treeOrientation = orientationConfig(orientation);

      for (const node of nodesWithDepth) {
        const position = { x: 0, y: 0 };

        const depthCoefficient =
          treeOrientation.depth.axis === 'y' ? size.height : size.width;

        position[treeOrientation.depth.axis] =
          depthCoefficient / (treeOrientation.depth.start === 1 ? -5 : 5) +
          node.depth * depthMultiplier * treeOrientation.depth.start;

        let parent: { x: number; y: number };

        const palette = colors[colorsVar().secondary];

        if (node.parent) {
          const parentRenderedNode = container.getChildByName(node.parent.id);

          parent = parentRenderedNode.position;

          position[treeOrientation.separationAxis] =
            parent?.[treeOrientation.separationAxis];

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
            position[treeOrientation.separationAxis] -= lowerbound / 2;
          } else {
            position[treeOrientation.separationAxis] =
              renderedSiblings[renderedSiblings.length - 1].position[
                treeOrientation.separationAxis
              ] +
              nodeWidth +
              separation;
          }

          if (generationCount === 1) {
            position[treeOrientation.separationAxis] =
              parentRenderedNode?.position[treeOrientation.separationAxis];
          }
        }

        const unrevealed = !(
          isUnlocked(node.id) || isUnlocked(node?.parent?.id)
        );

        const nodeContainer = await drawNode({
          id: node.id,
          name: node.value.name,
          imageUrl: node.value.image_url,
          position,
          colorPalette: palette,
          radius: nodeRadius,
          unlocked: isUnlocked(node.id),
          unrevealed,
        });

        if (parent) {
          const graphic = container.addChild(new PIXI.Graphics());
          graphic.name = `line_${node.id}`;

          connectNodes({
            graphic,
            parent,
            self: position,
            color: colors[colorsVar().secondary]['300'],
            dashedLine: !isUnlocked(node.id),
            unrevealed,
            unlocked: isUnlocked(node.id),
            nodeRadius,
          });
        }
        container.addChild(nodeContainer);
      }
    };

    // this is hacky but forces a re-run of the `useNodeInteractions` hook after each change... it works but not gud.
    asyncAdd().then(() => treeSettingsVar({ ...treeSettingsVar() }));

    return () => cleanupRenderedNodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allUnlocked,
    unlockedNodeIds,
    nodesWithDepth,
    separationMultiplier,
    depthMultiplier,
    nodeRadius,
    orientation,
    size,
  ]);
};
