import { TechnologiesQuery } from '@idleverse/galaxy-gql';
import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useViewport } from '../../canvases/_utils/use-viewport.hook';
import { treeNodesVar, treeSettingsVar } from './state/tree.state';
import {
  createTreeFromQuery,
  TechnologyNode,
} from './utils/create-tree-from-query';
import { Tree } from './utils/tree-structure';

import { useReactiveVar } from '@apollo/client';
import { useHighlightSearchResults } from './hooks/use-highlight-search-results';
import { useHoverNodes } from './hooks/use-hover-nodes';
import { useRenderNodes } from './hooks/use-render-nodes';

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

  const settings = useReactiveVar(treeSettingsVar);

  useHighlightSearchResults(containerRef.current);

  useEffect(() => {
    containerRef.current.sortableChildren = true;
    if (viewport && technologies.length) {
      treeRef.current = createTreeFromQuery(technologies);

      const nodesWithDepth = [...treeRef.current.preOrderTraversal()].map(
        (node) => ({
          ...node,
          depth: node.value.depth,
        })
      );

      treeNodesVar(nodesWithDepth);
    }
  }, [technologies, viewport]);

  useRenderNodes(app, containerRef.current, size);

  useHoverNodes(containerRef.current);

  useEffect(() => {
    if (viewport) {
      viewport.scaled = 4;
      viewport.animate({ time: 1000, scale: 1 });
    }
  }, [viewport]);

  useEffect(() => {
    if (settings.snapBack) {
      viewport?.snap(size.width / 2, size.height / 2, {
        removeOnInterrupt: true,
        removeOnComplete: true,
      });
      viewport?.snapZoom({
        width: size.width,
        height: size.height,
        removeOnComplete: true,
        removeOnInterrupt: true,
      });
    }
  }, [JSON.stringify(settings), settings.snapBack]);

  return <></>;
};
