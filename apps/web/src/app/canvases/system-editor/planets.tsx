import { timeVar } from '@idleverse/state';
import { Container, useApp } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Graphics, Container as PixiContainer, TickerCallback } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Planet } from '../celestial-viewer/models';
import { useSelectedPlanet } from '../celestial-viewer/use-selected-planet';
import {
  centerPlanetDraw,
  updatePlanetPosition,
} from '../celestial-viewer/utils/drawing-utils';

export const Planets = ({
  planets,
  orbitalEllipses,
  viewportRef,
}: {
  planets: Planet[];
  orbitalEllipses: Graphics[];
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

  const orbitalTickerRef = useRef<TickerCallback<unknown>>();
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
    orbitalEllipses.forEach((ellipse) =>
      containerRef.current.addChild(ellipse)
    );

    orbitalTickerRef.current = (dt) => {
      timeVar(timeVar() + dt);

      planets.forEach((planet) => {
        planet.sprite.rotation += (1 / planet.config.radius) * 0.01;

        updatePlanetPosition(timeVar(), planet, 10);
        centerPlanetDraw(planet, false);
      });
    };

    app.ticker.add(orbitalTickerRef.current);

    return () => {
      app.ticker.remove(orbitalTickerRef.current);
    };
  }, []);

  return <Container sortableChildren={true} ref={containerRef} />;
};
