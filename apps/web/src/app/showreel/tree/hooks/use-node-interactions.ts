import { useReactiveVar } from '@apollo/client';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';
import { colorsVar } from '../../../_state/colors';

import {
  hoveredNodeVar,
  selectedNodeVar,
  treeNodesVar,
  TreeNodeWithDepth,
  treeSettingsVar,
} from '../state/tree.state';

const glowFilter = new GlowFilter({
  distance: 15,
  outerStrength: 3,
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
    'node'
  ) as PIXI.Graphics;

  baseRenderedNode.alpha = 0.35;
  nodeContainer.zIndex = 3;

  const selectedNode = selectedNodeVar();

  if (selectedNode?.id !== nodeContainer.name) {
    nodeContainer.filters = [weakGlowFilter];
  }

  children.forEach((child) => {
    if (child.name !== selectedNode?.id) {
      child.filters = [weakGlowFilter];
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
    'node'
  ) as PIXI.Graphics;

  baseRenderedNode.alpha = 0.25;
  nodeContainer.zIndex = 2;

  const selectedNode = selectedNodeVar();

  if (selectedNode?.id !== nodeContainer.name) {
    nodeContainer.filters = [];
  }
  children.forEach((child) => {
    if (child.name !== selectedNode?.id) {
      child.filters = [];
    }
  });
  connectors.forEach((line) => (line.filters = []));
};

const highlightSelectedNode = (nodeContainer: PIXI.Container) => {
  setTimeout(() => {
    // force the filter update on to the event queue after the reactive var setter
    nodeContainer.filters = [glowFilter];
  });
};

const setupNodeMouseEvents = (
  nodeContainer: PIXI.Container,
  node: TreeNodeWithDepth
) => {
  const baseRenderedNode = nodeContainer.getChildByName(
    'node'
  ) as PIXI.Graphics;

  if (baseRenderedNode) {
    baseRenderedNode.interactive = true;
    baseRenderedNode.cursor = 'pointer';
    baseRenderedNode.alpha = 0.25;

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
  const prevSelectedNode = useRef<TreeNodeWithDepth>();

  const hoveredNode = useReactiveVar(hoveredNodeVar);
  const prevHoveredNode = useRef<TreeNodeWithDepth>();

  const renderedNode = (node: TreeNodeWithDepth) =>
    container.getChildByName(node?.id) as PIXI.Container;

  const children = (node: TreeNodeWithDepth) =>
    node.children.map(
      (node) => container.getChildByName(node.id) as PIXI.Container
    );
  const childConnectors = (node: TreeNodeWithDepth) =>
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

      // remove previous node filters
      [rendered, ...childNodes, ...connectors].forEach(
        (pixiObj) => (pixiObj.filters = [])
      );
    }

    const rendered = renderedNode(selectedNode);
    if (rendered) {
      rendered.filters = [glowFilter];
    }

    prevSelectedNode.current = selectedNode;
  }, [selectedNode, settings]);
};
