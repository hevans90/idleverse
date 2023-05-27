import { useReactiveVar } from '@apollo/client';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';
import { colorsVar } from '../../../_state/colors';
import { TreeNodeWithDepth, treeSettingsVar } from '../state/shared-tree.state';

import {
  hoveredNodeVar,
  selectedNodeVar,
  treeNodesVar,
} from '../state/shared-tree.state';
import { TechnologyNode } from '../utils/create-tree-from-technologies-query';
import { QuestNode } from '../utils/create-trees-from-quests-query';

const glowFilter = new GlowFilter({
  distance: 20,
  outerStrength: 4,
  color: hexStringToNumber(colors[colorsVar().secondary]['200']),
});

const weakGlowFilter = new GlowFilter({
  distance: 15,
  outerStrength: 2,
  color: hexStringToNumber(colors[colorsVar().secondary]['300']),
});

const highlightNodeWithChildren = (
  nodeContainer: PIXI.Container,
  children?: PIXI.Container[],
  connectors?: PIXI.Container[]
) => {
  const baseRenderedNode = nodeContainer.getChildByName(
    'nodeBg'
  ) as PIXI.Graphics;

  nodeContainer.zIndex = 3;

  const selectedNode = selectedNodeVar();

  if (selectedNode?.id !== nodeContainer.name) {
    baseRenderedNode.filters = [weakGlowFilter];
  }

  children.forEach((child) => {
    if (child.name !== selectedNode?.id) {
      child.getChildByName('nodeBg').filters = [weakGlowFilter];
    }
  });
  connectors.forEach((line) => (line.filters = [weakGlowFilter]));
};

const removeNodeHighlights = (
  nodeContainer: PIXI.Container,
  children?: PIXI.Container[],
  connectors?: PIXI.Container[]
) => {
  const baseRenderedNode = nodeContainer.getChildByName(
    'nodeBg'
  ) as PIXI.Graphics;

  nodeContainer.zIndex = 2;

  const selectedNode = selectedNodeVar();

  if (selectedNode?.id !== nodeContainer.name) {
    baseRenderedNode.filters = [];
  }
  children.forEach((child) => {
    if (child.name !== selectedNode?.id) {
      child.getChildByName('nodeBg').filters = [];
    }
  });
  connectors.forEach((line) => (line.filters = []));
};

const setupNodeMouseEvents = (
  nodeContainer: PIXI.Container,
  node: TreeNodeWithDepth<TechnologyNode | QuestNode>
) => {
  const baseRenderedNode = nodeContainer.getChildByName(
    'overlay'
  ) as PIXI.Graphics;

  if (baseRenderedNode) {
    baseRenderedNode.eventMode = 'static';
    baseRenderedNode.cursor = 'pointer';

    baseRenderedNode.on('mouseover', () => hoveredNodeVar(node));
    baseRenderedNode.on('mouseout', () => hoveredNodeVar(undefined));

    baseRenderedNode.on('pointerdown', () => {
      const selectedNode = selectedNodeVar();

      if (selectedNode?.id !== node.id) {
        selectedNodeVar(node);
      }
    });
  }
};

export const useNodeInteractions = (container: PIXI.Container) => {
  const treeNodes = useReactiveVar(treeNodesVar);
  const settings = useReactiveVar(treeSettingsVar);

  const selectedNode = useReactiveVar(selectedNodeVar);
  const prevSelectedNode =
    useRef<TreeNodeWithDepth<TechnologyNode | QuestNode>>();

  const hoveredNode = useReactiveVar(hoveredNodeVar);
  const prevHoveredNode =
    useRef<TreeNodeWithDepth<TechnologyNode | QuestNode>>();

  const renderedNode = (node: TreeNodeWithDepth<TechnologyNode | QuestNode>) =>
    container.getChildByName(node?.id) as PIXI.Container;

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
      if (renderedNode) {
        setupNodeMouseEvents(renderedNode(node), node);
      }
    });
  }, [treeNodes, container, settings]);

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
          ...childNodes.map((child) => child?.getChildByName('nodeBg')),
          ...connectors,
        ].forEach((pixiObj) => (pixiObj.filters = []));
        rendered.getChildByName('nodeBg').filters = [];
      }
    }

    const rendered = renderedNode(selectedNode);
    if (rendered) {
      rendered.getChildByName('nodeBg').filters = [glowFilter];
    }

    prevSelectedNode.current = selectedNode;
  }, [selectedNode, settings]);
};
