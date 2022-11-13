import { TechnologiesQuery } from '@idleverse/galaxy-gql';
import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useViewport } from '../../canvases/_utils/use-viewport.hook';
import {
  createTreeFromQuery,
  TechnologyNode,
} from './utils/create-tree-from-query';
import { drawNode } from './utils/draw-node';
import { Tree } from './utils/tree-structure';

export const ResearchTree = ({
  technologies,
}: {
  technologies: TechnologiesQuery['technology'];
}) => {
  const app = useApp();
  const containerRef = useRef(new Container());
  const treeRef = useRef<Tree<TechnologyNode>>();

  const size = useResize();

  useViewport({ app, containerRef, size });

  useEffect(() => {
    if (technologies.length) {
      treeRef.current = createTreeFromQuery(technologies);
      console.log(
        [...treeRef.current.preOrderTraversal()].map((x) => ({
          name: x.value.name,
          depth: x.value.depth,
        }))
      );

      const radius = 55;

      [...treeRef.current.preOrderTraversal()]
        .map((node) => ({
          ...node,
          depth: node.value.depth,
        }))
        .forEach((node, i) => {
          let x = 0;

          if (node.parent) {
            const parentRenderedNode = containerRef.current.getChildByName(
              node.parent.id
            );

            x = parentRenderedNode?.position.x;

            const siblings = node.parent.children
              .filter(({ id }) => id !== node.id)
              .map(({ id }) => containerRef.current.getChildByName(id));

            const renderedSiblings = siblings.filter(
              (element) => element !== null
            );

            const noUnrenderedSiblings = siblings.filter(
              (element) => element === null
            ).length;

            const generationCount =
              renderedSiblings.length + noUnrenderedSiblings + 1;

            const depthMultiplier = 1 / node.depth;

            const totalMultiplier =
              ((radius * 8) / generationCount) * depthMultiplier;

            if (!renderedSiblings.length) {
              if (noUnrenderedSiblings > 0) {
                x = x - totalMultiplier;
              }
            }

            if (renderedSiblings[renderedSiblings.length - 1]) {
              x =
                renderedSiblings[renderedSiblings.length - 1].position.x +
                totalMultiplier;
            }

            if (
              renderedSiblings.length === generationCount - 1 &&
              generationCount === 2
            ) {
              // if last sibling to render and we're in an even generation
              x = x + totalMultiplier;
            }
          }

          const container = drawNode(
            node.id,
            node.value.name,
            {
              x: x,
              y: node.depth * 3 * radius,
            },
            radius
          );

          containerRef.current.addChild(container);
        });

      // return () => {
      //   containerRef.current.destroy(true);
      // };
    }
  }, [technologies]);

  return <></>;
};
