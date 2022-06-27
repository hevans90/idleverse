import { Container, Text } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { indicatorFactory } from '../galaxy-generator/utils/indicator-factory';

/**
 * Adds selection UI to the currently selected planet.
 */
export const useSelectedPlanet = (
  container: Container,
  planetName: string | null,
  x: number,
  y: number
) => {
  const selectedPlanetText = useRef<Text>(
    indicatorFactory(planetName, x, y, 'selectedPlanetName')
  );

  useEffect(() => {
    if (planetName) {
      container.addChild(selectedPlanetText.current);
      const indicator = container.getChildByName('selectedPlanetName') as Text;
      indicator.text = planetName;
      indicator.position.x = x;
      indicator.position.y = y;
      indicator.zIndex = 2;
    }

    return () => {
      try {
        container.removeChild(selectedPlanetText.current);
      } catch (e) {
        console.warn(e);
      }
    };
  }, [planetName]);

  useEffect(() => {
    if (planetName) {
      const indicator = container.getChildByName('selectedPlanetName') as Text;
      indicator.position.x = x;
      indicator.position.y = y;
    }
  }, [x, y]);
};
