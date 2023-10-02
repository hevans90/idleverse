import { useReactiveVar } from '@apollo/client';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';

import {
  TreeNodeWithDepth,
  hoveredNodeVar,
  selectedNodeVar,
  treeNodesVar,
  treeSettingsVar,
} from '../state/shared-tree.state';

import { colorsVar } from '@idleverse/state';
import { TechnologyNode } from '../utils/create-tree-from-technologies-query';
import { QuestNode } from '../utils/create-trees-from-quests-query';

const glowFilter = new GlowFilter({
  distance: 20,
  outerStrength: 4,
  color: hexStringToNumber(colors[colorsVar().secondary]['200']),
});

const weakGlowFilter = new GlowFilter({
  distance: 15,
  outerStrength: 3,
  color: hexStringToNumber(colors[colorsVar().primary]['300']),
});

const AAFilter = new PIXI.FXAAFilter();

const highlightNodeWithChildren = (
  nodeContainer: PIXI.Container,
  children?: PIXI.Container[],
  connectors?: PIXI.Container[]
) => {
  const baseRenderedNode = nodeContainer.getChildByName('hoverOverlay');

  const selectedNode = selectedNodeVar();

  if (selectedNode?.id !== nodeContainer.name) {
    baseRenderedNode.filters = [weakGlowFilter, AAFilter];
  }

  children.forEach((child) => {
    if (child.name !== selectedNode?.id) {
      child.getChildByName('hoverOverlay').filters = [weakGlowFilter, AAFilter];
    }
  });
  connectors.forEach((line) => (line.filters = [weakGlowFilter, AAFilter]));
};

const removeNodeHighlights = (
  nodeContainer: PIXI.Container,
  children?: PIXI.Container[],
  connectors?: PIXI.Container[]
) => {
  const baseRenderedNode = nodeContainer.getChildByName('hoverOverlay');

  nodeContainer.zIndex = 2;

  const selectedNode = selectedNodeVar();

  if (selectedNode?.id !== nodeContainer.name) {
    baseRenderedNode.filters = [];
  }
  children.forEach((child) => {
    if (child.name !== selectedNode?.id) {
      child.getChildByName('hoverOverlay').filters = [];
    }
  });
  connectors.forEach((line) => (line.filters = []));
};

const setupNodeMouseEvents = (
  nodeContainer: PIXI.Container,
  node: TreeNodeWithDepth<TechnologyNode | QuestNode>
) => {
  const baseRenderedNode = nodeContainer.getChildByName(
    'hoverOverlay'
  ) as PIXI.Graphics;

  if (baseRenderedNode) {
    baseRenderedNode.eventMode = 'static';
    baseRenderedNode.cursor = 'pointer';

    baseRenderedNode.on('mouseover', () => hoveredNodeVar(node));
    baseRenderedNode.on('mouseout', () => hoveredNodeVar(undefined));

    baseRenderedNode.on('pointerdown', () => {
      const selectedNode = selectedNodeVar();
      hoveredNodeVar(undefined);

      if (selectedNode?.id !== node.id) {
        selectedNodeVar(node);
      }
    });
  }
};

export const useNodeInteractions = ({
  container,
  unlockedNodeIds,
  allUnlocked,
}: {
  container: PIXI.Container;
  unlockedNodeIds: string[];
  allUnlocked: boolean;
}) => {
  const isUnlocked = (nodeId: string) =>
    allUnlocked || unlockedNodeIds.includes(nodeId);

  const treeNodes = useReactiveVar(treeNodesVar);
  const settings = useReactiveVar(treeSettingsVar);

  const selectedNode = useReactiveVar(selectedNodeVar);
  const prevSelectedNode =
    useRef<TreeNodeWithDepth<TechnologyNode | QuestNode>>();

  const hoveredNode = useReactiveVar(hoveredNodeVar);
  const prevHoveredNode =
    useRef<TreeNodeWithDepth<TechnologyNode | QuestNode>>();

  const renderedNode = (
    node: TreeNodeWithDepth<TechnologyNode | QuestNode>
  ): PIXI.Container => container.getChildByName(node?.id);

  const children = (node: TreeNodeWithDepth<TechnologyNode | QuestNode>) =>
    node.children.map(
      (node) => container.getChildByName(node.id) as PIXI.Container
    );
  const childConnectors = (
    node: TreeNodeWithDepth<TechnologyNode | QuestNode>
  ) =>
    node.children.map(
      (node) => container.getChildByName(`line_${node.id}`) as PIXI.Container
    );

  useEffect(() => {
    treeNodes.forEach((node) => {
      if (
        (isUnlocked(node.id) || isUnlocked(node?.parent?.id)) &&
        renderedNode(node)
      ) {
        setupNodeMouseEvents(renderedNode(node), node);
      }
    });
  }, [treeNodes, settings]);

  useEffect(() => {
    if (prevHoveredNode.current) {
      removeNodeHighlights(
        renderedNode(prevHoveredNode.current),
        children(prevHoveredNode.current),
        childConnectors(prevHoveredNode.current)
      );
    }
    if (hoveredNode) {
      highlightNodeWithChildren(
        renderedNode(hoveredNode),
        children(hoveredNode),
        childConnectors(hoveredNode)
      );
    }
    prevHoveredNode.current = hoveredNode;
  }, [hoveredNode, settings]);

  useEffect(() => {
    if (prevSelectedNode.current) {
      const rendered = renderedNode(prevSelectedNode.current);
      const childNodes = children(prevSelectedNode.current);
      const connectors = childConnectors(prevSelectedNode.current);

      if (rendered) {
        // remove previous node filters
        [
          ...childNodes.map((child) => child?.getChildByName('hoverOverlay')),
          ...connectors,
        ].forEach((pixiObj) => (pixiObj.filters = []));
        rendered.getChildByName('hoverOverlay').filters = [];
      }
    }

    const rendered = renderedNode(selectedNode);
    if (rendered) {
      rendered.getChildByName('hoverOverlay').filters = [glowFilter, AAFilter];
    }

    prevSelectedNode.current = selectedNode;
  }, [selectedNode, settings]);
};
