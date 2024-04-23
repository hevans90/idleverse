import { useReactiveVar } from '@apollo/client';
import { indicatorFactory } from '@idleverse/pixi-utils';
import { celestialViewerSelectedPlanet } from '@idleverse/state';
import { Viewport } from 'pixi-viewport';
import { Container, Text } from 'pixi.js';
import { useEffect, useMemo } from 'react';

/**
 * Adds selection UI to the currently selected planet.
 */
export const useSelectedPlanet = ({
  container,
  x,
  y,
  viewport,
}: {
  container: Container;
  x: number;
  y: number;
  viewport: Viewport;
}) => {
  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanet);

  const indicatorKey = `${selectedPlanet?.name}_indicator_PRESERVE_SCALE`;

  const selectedPlanetText = useMemo<Text>(
    () =>
      selectedPlanet
        ? indicatorFactory(selectedPlanet?.name, x, y, indicatorKey)
        : null,
    [selectedPlanet, indicatorKey, x, y]
  );

  useEffect(() => {
    if (selectedPlanet && container) {
      console.log('CONTAINER SCALE', container.scale);
      container.addChild(selectedPlanetText);
      const indicator = container.getChildByName(indicatorKey) as Text;
      indicator.text = selectedPlanet.name;
      indicator.position.x = x;
      indicator.position.y = y;
      indicator.zIndex = 2;
      indicator.scale = {
        x: 1 / viewport.scale.x,
        y: 1 / viewport.scale.y,
      };
    }

    return () => {
      try {
        container?.removeChild(selectedPlanetText);
      } catch (e) {
        console.warn(e);
      }
    };
  }, [selectedPlanet, container, selectedPlanetText, indicatorKey, x, y]);

  useEffect(() => {
    if (selectedPlanet && container) {
      const indicator = container.getChildByName(indicatorKey) as Text;
      indicator.position.x = x;
      indicator.position.y = y;
    }
  }, [x, y, container, selectedPlanet, indicatorKey]);

  return selectedPlanet;
};
