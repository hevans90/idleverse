import { Container, useApp } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Container as PixiContainer, TickerCallback } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Planet } from '../celestial-viewer/models';
import { useSelectedPlanet } from '../celestial-viewer/use-selected-planet';

export const Planets = ({
  planets,
  viewportRef,
}: {
  planets: Planet[];
  viewportRef: React.MutableRefObject<Viewport>;
}) => {
  const app = useApp();
  const containerRef = useRef<PixiContainer>();

  const [selectedPlanetPosition, setSelectedPlanetPosition] = useState<{
    x: number;
    y: number;
  }>(null);

  const selectedPlanet = useSelectedPlanet({
    container: containerRef.current,
    x: selectedPlanetPosition?.x,
    y: selectedPlanetPosition?.y,
    viewport: viewportRef.current,
  });

  const selectedIndicatorTickerRef = useRef<TickerCallback<unknown>>();

  const setupTicker = useCallback(
    (planetArr: Planet[]) => {
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
