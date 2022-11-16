import { useReactiveVar } from '@apollo/client';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { colorsVar } from '../../../_state/colors';
import { treeNodesVar, treeSettingsVar } from '../state/tree.state';

const glowFilter = new GlowFilter({
  distance: 15,
  outerStrength: 4,
  color: hexStringToNumber(colors[colorsVar().secondary]['200']),
});

const setupNodeHover = (
  nodeContainer: PIXI.Container,
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

      nodeContainer.filters = [glowFilter];

      children.forEach((child) => (child.filters = [glowFilter]));
      connectors.forEach((line) => (line.filters = [glowFilter]));
    });
    baseRenderedNode.on('mouseout', () => {
      baseRenderedNode.alpha = 0.5;
      nodeContainer.zIndex = 2;

      nodeContainer.filters = [];
      children.forEach((child) => (child.filters = []));
      connectors.forEach((line) => (line.filters = []));
    });
  }
};

export const useHoverNodes = (container: PIXI.Container) => {
  const treeNodes = useReactiveVar(treeNodesVar);
  const settings = useReactiveVar(treeSettingsVar);

  useEffect(() => {
    treeNodes.forEach((node) => {
      const renderedNode = container.getChildByName(node.id) as PIXI.Container;

      const children = node.children.map(
        (node) => container.getChildByName(node.id) as PIXI.Container
      );
      const childConnectors = node.children.map(
        (node) => container.getChildByName(`line_${node.id}`) as PIXI.Container
      );

      if (renderedNode) {
        setupNodeHover(renderedNode, children, childConnectors);
      }
    });
  }, [treeNodes, container, settings]);
};
