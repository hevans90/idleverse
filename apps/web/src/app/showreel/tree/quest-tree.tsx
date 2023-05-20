import { useApp } from '@pixi/react';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useViewport } from '../../canvases/_utils/use-viewport.hook';
import { Tree } from './utils/tree-structure';

import { useReactiveVar } from '@apollo/client';
import { questsVar } from '../../_state/quests';
import { useNodeInteractions } from './hooks/use-node-interactions';
import { useRenderNodes } from './hooks/use-render-nodes';

import { treeNodesVar, treeSettingsVar } from './state/shared-tree.state';
import {
  QuestNode,
  createTreesFromQuestsQuery,
} from './utils/create-trees-from-quests-query';

export const QuestTree = () => {
  const app = useApp();
  const treesRef = useRef<Tree<QuestNode>[]>();
  const containerRef = useRef<Container>(new Container());

  const size = useResize();

  const nodesWithDepth = useReactiveVar(treeNodesVar);

  const settings = useReactiveVar(treeSettingsVar);
  const quests = useReactiveVar(questsVar);

  const viewport = useViewport({ app, containerRef, size });

  useEffect(() => {
    containerRef.current.sortableChildren = true;
    if (quests.length) {
      treesRef.current = createTreesFromQuestsQuery(quests);

      const nodesWithDepth = treesRef.current
        .map((tree) => [...tree.preOrderTraversal()])
        .flat()
        .map((node) => ({
          ...node,
          depth: node.value.depth,
        }));

      treeNodesVar(nodesWithDepth);
    }
  }, [quests]);

  useRenderNodes(nodesWithDepth, containerRef.current, size);

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
