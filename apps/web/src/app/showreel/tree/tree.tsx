import { useApp } from '@saitonakamura/react-pixi';
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
import { technologiesVar } from '../../_state/technologies';
import { useNodeInteractions } from './hooks/use-node-interactions';
import { useRenderNodes } from './hooks/use-render-nodes';

export const ResearchTree = () => {
  const app = useApp();
  const treeRef = useRef<Tree<TechnologyNode>>();
  const containerRef = useRef<Container>(new Container());

  const size = useResize();

  const settings = useReactiveVar(treeSettingsVar);
  const technologies = useReactiveVar(technologiesVar);

  const viewport = useViewport({ app, containerRef, size });

  useEffect(() => {
    containerRef.current.sortableChildren = true;
    if (technologies.length) {
      console.log(technologies);
      treeRef.current = createTreeFromQuery(technologies);

      const nodesWithDepth = [...treeRef.current.preOrderTraversal()].map(
        (node) => ({
          ...node,
          depth: node.value.depth,
        })
      );

      treeNodesVar(nodesWithDepth);
    }
  }, [technologies]);

  useRenderNodes(app, containerRef.current, size);

  useNodeInteractions(containerRef.current);

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
