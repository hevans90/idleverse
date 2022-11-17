import { useReactiveVar } from '@apollo/client';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';
import { colorsVar } from '../../../_state/colors';

import {
  selectedNodeVar,
  treeNodesVar,
  TreeNodeWithDepth,
  treeSettingsVar,
} from '../state/tree.state';

const glowFilter = new GlowFilter({
  distance: 15,
  outerStrength: 4,
  color: hexStringToNumber(colors[colorsVar().secondary]['100']),
});

const weakGlowFilter = new GlowFilter({
  distance: 15,
  outerStrength: 2,
  color: hexStringToNumber(colors[colorsVar().secondary]['300']),
});

const setupNodeMouseEvents = (
  nodeContainer: PIXI.Container,
  node: TreeNodeWithDepth,
  children?: PIXI.Container[],
  connectors?: PIXI.Container[]
) => {
  const baseRenderedNode = nodeContainer.getChildByName(
    'node'
  ) as PIXI.Graphics;

  if (baseRenderedNode) {
    baseRenderedNode.interactive = true;
    baseRenderedNode.cursor = 'pointer';
    baseRenderedNode.alpha = 0.5;

    baseRenderedNode.on('mouseover', () => {
      baseRenderedNode.alpha = 0.75;
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
    });
    baseRenderedNode.on('mouseout', () => {
      baseRenderedNode.alpha = 0.5;
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
    });

    baseRenderedNode.on('pointerdown', () => {
      const selectedNode = selectedNodeVar();

      if (selectedNode?.id !== node.id) {
        selectedNodeVar(node);

        setTimeout(() => {
          // force the filter update on to the event queue after the reactive var setter
          nodeContainer.filters = [glowFilter];
        });
      }
    });
  }
};

export const useNodeInteractions = (container: PIXI.Container) => {
  const treeNodes = useReactiveVar(treeNodesVar);
  const settings = useReactiveVar(treeSettingsVar);
  const selectedNode = useReactiveVar(selectedNodeVar);

  const prevSelectedNode = useRef<TreeNodeWithDepth>();

  const renderedNode = (node: TreeNodeWithDepth) =>
    container.getChildByName(node.id) as PIXI.Container;

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
        setupNodeMouseEvents(
          renderedNode(node),
          node,
          children(node),
          childConnectors(node)
        );
      }
    });
  }, [treeNodes, container, settings]);

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

    prevSelectedNode.current = selectedNode;
  }, [selectedNode]);
};
