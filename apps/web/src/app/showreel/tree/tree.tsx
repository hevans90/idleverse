import { TechnologiesQuery } from '@idleverse/galaxy-gql';
import { colors } from '@idleverse/theme';
import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useViewport } from '../../canvases/_utils/use-viewport.hook';
import { colorsVar } from '../../_state/colors';
import { treeNodesVar } from './state/tree.state';
import {
  createTreeFromQuery,
  TechnologyNode,
} from './utils/create-tree-from-query';
import { connectNodes, drawNode } from './utils/draw-node';
import { Tree } from './utils/tree-structure';

export const ResearchTree = ({
  technologies,
}: {
  technologies: TechnologiesQuery['technology'];
}) => {
  const app = useApp();
  const treeRef = useRef<Tree<TechnologyNode>>();
  const containerRef = useRef<Container>(new Container());

  const size = useResize();

  const viewport = useViewport({ app, containerRef, size });

  useEffect(() => {
    containerRef.current.sortableChildren = true;
    if (viewport && technologies.length) {
      treeRef.current = createTreeFromQuery(technologies);

      const radius = 50;

      const nodesWithDepth = [...treeRef.current.preOrderTraversal()].map(
        (node) => ({
          ...node,
          depth: node.value.depth,
        })
      );

      treeNodesVar(nodesWithDepth);

      nodesWithDepth.forEach((node, i) => {
        let x = 0;
        const y = -size.height / 4 + node.depth * 3 * radius;

        let parent: { x: number; y: number };

        if (node.parent) {
          const parentRenderedNode = containerRef.current.getChildByName(
            node.parent.id
          );

          parent = parentRenderedNode.position;

          x = parent?.x;

          const siblings = node.parent.children
            .filter(({ id }) => id !== node.id)
            .map(({ id }) => containerRef.current.getChildByName(id));

          const renderedSiblings = siblings.filter(
            (element) => element !== null
          );

          const generationCount = siblings.length + 1;

          const nodeWidth = (2 * radius * (3 / generationCount)) / node.depth;

          const separation = (2 * nodeWidth) / generationCount;

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

        const palette = colors[colorsVar().secondary];

        const container = drawNode({
          app,
          id: node.id,
          name: node.value.name,
          position: {
            x,
            y,
          },
          colorPalette: palette,
          radius,
        });

        if (parent) {
          const line = connectNodes({
            parent,
            self: { x, y },
            color: colors[colorsVar().secondary]['300'],
          });
          containerRef.current.addChild(line);
        }

        containerRef.current.addChild(container);
      });
    }
  }, [technologies, viewport]);

  useEffect(() => {
    if (viewport) {
      viewport.scaled = 4;
      viewport.animate({ time: 1000, scale: 1 });
    }
  }, [viewport]);

  return <></>;
};
