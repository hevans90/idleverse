import { useReactiveVar } from '@apollo/client';
import { celestialViewerSelectedPlanet, timeVar } from '@idleverse/state';
import { Container, useApp } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import {
  Graphics,
  Container as PixiContainer,
  Sprite,
  Text,
  TickerCallback,
} from 'pixi.js';
import { useEffect, useRef } from 'react';
import { Planet } from '../celestial-viewer/models';
import { useSelectedPlanetIndicator } from '../celestial-viewer/use-selected-planet';
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

  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanet);

  const { selectedPlanetText, indicatorKey } = useSelectedPlanetIndicator({
    x: 0,
    y: 0,
  });

  const orbitalTickerRef = useRef<TickerCallback<unknown>>();
  const selectedIndicatorTickerRef = useRef<TickerCallback<unknown>>();

  useEffect(() => {
    if (!selectedPlanet) {
      viewportRef.current.plugins.remove('follow');
    }
    if (selectedPlanet && containerRef.current) {
      // check if exists
      const planet = containerRef.current.getChildByName(
        selectedPlanet.name
      ) as Sprite;
      const indicator =
        (containerRef.current.getChildByName(indicatorKey) as Text) ??
        selectedPlanetText;

      indicator.text = selectedPlanet.name;
      indicator.scale = {
        x: 1 / viewportRef.current.scale.x,
        y: 1 / viewportRef.current.scale.y,
      };

      const positionIndicator = (indicator: Text) => {
        indicator.position.x = planet?.x;
        indicator.position.y = planet?.y - planet.height - indicator.height;
      };

      indicator.anchor.set(0.5, 0.5);
      positionIndicator(indicator);
      indicator.zIndex = 2;
      containerRef.current.addChild(indicator);

      selectedIndicatorTickerRef.current = (dt) => {
        const existingIndicator = containerRef.current.getChildByName(
          indicatorKey
        ) as Text;
        positionIndicator(existingIndicator);
      };
      app.ticker.add(selectedIndicatorTickerRef.current);

      const snapDuration = 200;
      viewportRef.current.snap(planet.position.x, planet.position.y, {
        time: snapDuration,
        removeOnComplete: true,
      });
      setTimeout(() => {
        viewportRef.current.follow(planet);
      }, snapDuration);
    }

    return () => {
      try {
        containerRef.current?.removeChild(selectedPlanetText);
        app.ticker?.remove(selectedIndicatorTickerRef.current);
      } catch (e) {
        console.warn(e);
      }
    };
  }, [selectedPlanet, indicatorKey]);

  useEffect(() => {
    planets.forEach((planet) => {
      containerRef.current.addChild(planet.sprite);
    });
    orbitalEllipses.forEach((ellipse) =>
      containerRef.current.addChild(ellipse)
    );

    orbitalTickerRef.current = (dt) => {
      timeVar(timeVar() + dt / 2);

      planets.forEach((planet) => {
        planet.sprite.rotation += (1 / planet.config.radius) * 0.01;

        updatePlanetPosition(timeVar(), planet);
        centerPlanetDraw(planet, false);
      });
    };

    app.ticker.add(orbitalTickerRef.current);

    return () => {
      app.ticker?.remove(orbitalTickerRef.current);
    };
  }, []);

  return <Container sortableChildren={true} ref={containerRef} />;
};