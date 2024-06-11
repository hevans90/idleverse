import { useReactiveVar } from '@apollo/client';
import { indicatorFactory } from '@idleverse/pixi-utils';
import { celestialViewerSelectedPlanet } from '@idleverse/state';
import { Text } from 'pixi.js';
import { useMemo } from 'react';

/**
 * Adds selection UI to the currently selected planet.
 */
export const useSelectedPlanetIndicator = ({
  x,
  y,
}: {
  x: number;
  y: number;
}) => {
  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanet);

  const indicatorKey = `${selectedPlanet?.id}_indicator_PRESERVE_SCALE`;

  const selectedPlanetText = useMemo<Text>(
    () =>
      selectedPlanet
        ? indicatorFactory(selectedPlanet?.name, x, y, indicatorKey)
        : null,
    [selectedPlanet, indicatorKey, x, y]
  );

  return { selectedPlanetText, indicatorKey };
};
