import { useReactiveVar } from '@apollo/client';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { colorsVar } from '../../../_state/colors';
import { searchResultsVar, treeNodesVar } from '../state/tree.state';

export const useHighlightSearchResults = (container: PIXI.Container) => {
  const searchResults = useReactiveVar(searchResultsVar);
  const treeNodes = useReactiveVar(treeNodesVar);

  useEffect(() => {
    treeNodes.forEach((node) => {
      const renderedNode = container.getChildByName(node.id);

      if (renderedNode) {
        renderedNode.filters = [];
      }
    });
    if (searchResults.length) {
      searchResults.forEach((node) => {
        const renderedNode = container.getChildByName(node.id);

        if (renderedNode) {
          renderedNode.filters = [
            new GlowFilter({
              distance: 15,
              outerStrength: 2,
              color: hexStringToNumber(colors[colorsVar().secondary]['100']),
            }),
          ];
        }
      });
    }
  }, [searchResults, treeNodes, container]);
};
