import { celestialViewerSelectedPlanet } from '@idleverse/state';
import { Container, useApp } from '@pixi/react';
import { Container as PixiContainer, TickerCallback } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Planet } from '../celestial-viewer/models';
import { useSelectedPlanet } from '../celestial-viewer/use-selected-planet';

export const Planets = ({ planets }: { planets: Planet[] }) => {
  console.log('NOT GOOD');
  const app = useApp();
  const containerRef = useRef<PixiContainer>();

  const [selectedPlanetPosition, setSelectedPlanetPosition] = useState<{
    x: number;
    y: number;
  }>(null);

  const selectedPlanet = useSelectedPlanet(
    containerRef.current,
    selectedPlanetPosition?.x,
    selectedPlanetPosition?.y
  );

  const selectedIndicatorTickerRef = useRef<TickerCallback<unknown>>();

  const setupTicker = useCallback(
    (planetArr: Planet[]) => {
      const selectedPlanet = celestialViewerSelectedPlanet();

      const selectedFound = planetArr.find(
        (planet) => planet.config.id === selectedPlanet?.id
      );

      if (selectedFound) {
        selectedIndicatorTickerRef.current = () => {
          setSelectedPlanetPosition({
            x:
              selectedFound.sprite.x -
              selectedFound.sprite.width / 2 -
              // rough character width of zx-spectrum mono font characters
              selectedPlanet.name.length * 7.75,
            y: selectedFound.sprite.y - selectedFound.sprite.height - 10,
          });
        };
        app.ticker?.add(selectedIndicatorTickerRef.current);
      }
    },
    [app.ticker, selectedPlanet]
  );

  useEffect(() => {
    try {
      app.ticker.remove(selectedIndicatorTickerRef.current);
    } catch (e) {
      //
    }

    setupTicker(planets);
  }, [selectedPlanet, planets, setupTicker, app.ticker]);

  useEffect(() => {
    planets.forEach((planet) => {
      containerRef.current.addChild(planet.sprite);
    });
  }, []);

  return <Container ref={containerRef} />;
};
