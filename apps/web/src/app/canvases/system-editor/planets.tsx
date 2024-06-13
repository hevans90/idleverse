import { useReactiveVar } from '@apollo/client';
import { celestialViewerSelectedPlanetVar, timeVar } from '@idleverse/state';
import { Container, useApp } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import {
  Graphics,
  Container as PixiContainer,
  Sprite,
  Text,
  TickerCallback,
} from 'pixi.js';
import { useCallback, useEffect, useRef } from 'react';
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

  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanetVar);

  const { selectedPlanetText, indicatorKey } = useSelectedPlanetIndicator({
    x: 0,
    y: 0,
  });

  const renderedPlanets = () => {
    const arr: Planet[] = [];
    planets.forEach(({ config, ...rest }) => {
      const rendered = containerRef.current?.getChildByName(
        config.id
      ) as Sprite;

      if (rendered) {
        arr.push({ ...rest, config, sprite: rendered });
      }
    });
    return arr;
  };

  const orbitalTickerRef = useRef<TickerCallback<unknown>>();
  const selectedIndicatorTickerRef = useRef<TickerCallback<unknown>>();

  const indicateAndFollow = useCallback(
    (renderedPlanet: Sprite) => {
      const indicator =
        (containerRef.current.getChildByName(indicatorKey) as Text) ??
        selectedPlanetText;

      indicator.text = selectedPlanet.name;
      indicator.scale = {
        x: 1 / viewportRef.current.scale.x,
        y: 1 / viewportRef.current.scale.y,
      };

      const positionIndicator = (indicator: Text) => {
        indicator.position.x = renderedPlanet?.x;
        indicator.position.y =
          renderedPlanet?.y - renderedPlanet?.height - indicator.height;
      };

      indicator.anchor.set(0.5, 0.5);
      positionIndicator(indicator);
      indicator.zIndex = 2;
      containerRef.current.addChild(indicator);

      selectedIndicatorTickerRef.current = (dt) => {
        const existingIndicator = containerRef.current.getChildByName(
          indicatorKey
        ) as Text;
        if (existingIndicator) {
          positionIndicator(existingIndicator);
        }
      };
      app.ticker.add(selectedIndicatorTickerRef.current);

      const snapDuration = 200;
      viewportRef.current.snap(
        renderedPlanet?.position.x,
        renderedPlanet?.position.y,
        {
          time: snapDuration,
          removeOnComplete: true,
        }
      );
      setTimeout(() => {
        viewportRef.current.follow(renderedPlanet);
      }, snapDuration);
    },
    [app.ticker, indicatorKey, selectedPlanet, selectedPlanetText, viewportRef]
  );

  useEffect(() => {
    if (!selectedPlanet) {
      viewportRef.current.plugins.remove('follow');
    }
    if (selectedPlanet && containerRef.current) {
      // check if exists

      const renderedPlanet = containerRef.current.getChildByName(
        selectedPlanet.id
      ) as Sprite;

      if (renderedPlanet) {
        indicateAndFollow(renderedPlanet);
      }
    }

    return () => {
      try {
        containerRef.current?.removeChild(selectedPlanetText);
        app.ticker?.remove(selectedIndicatorTickerRef.current);
      } catch (e) {
        console.warn(e);
      }
    };
  }, [selectedPlanet, indicatorKey, selectedPlanetText, indicateAndFollow]);

  useEffect(() => {
    planets.forEach((planet) => {
      // check if planet already rendered and update if so
      const alreadyRendered = containerRef.current.getChildByName(
        planet.config.id
      ) as Sprite;

      if (alreadyRendered) {
        // UPDATE EXISTING: texture, rings, etc
      } else {
        containerRef.current.addChild(planet.sprite);
      }
    });
    orbitalEllipses.forEach((ellipse) =>
      containerRef.current.addChild(ellipse)
    );

    orbitalTickerRef.current = (dt) => {
      timeVar(timeVar() + dt / 2);

      renderedPlanets().forEach((planet) => {
        planet.sprite.rotation += (1 / planet.config.radius) * 0.01;

        updatePlanetPosition(timeVar(), planet);
        centerPlanetDraw(planet, false);
      });
    };

    app.ticker.add(orbitalTickerRef.current);

    return () => {
      app.ticker?.remove(orbitalTickerRef.current);

      orbitalEllipses.forEach((ellipse) => {
        try {
          containerRef.current.removeChild(ellipse);
        } catch (e) {
          console.warn(e);
        }
      });
    };
  }, [planets, orbitalEllipses, selectedPlanet, indicateAndFollow]);

  return <Container sortableChildren={true} ref={containerRef} />;
};
