/* eslint-disable react-hooks/exhaustive-deps */
import { useReactiveVar } from '@apollo/client';
import {
  Celestial,
  GalaxyConfig,
  generateCelestials,
  getCelestialPosition,
} from '@idleverse/galaxy-gen';
import { colors } from '@idleverse/theme';
import { useApp } from '@saitonakamura/react-pixi';
import { Container, Graphics, TickerCallback } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { colorsVar } from '../../_state/colors';
import {
  animateVar,
  galaxyConfigVar,
  galaxyRotationVar,
  timeVar,
} from '../../_state/reactive-variables';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport.hook';
import { Star } from './graphics/star';
import { useFpsTracker } from './utils/fps-counter';

export const GalaxyGenerator = () => {
  const galaxyConfig = useReactiveVar(galaxyConfigVar);

  const galaxyContainer = useRef(new Container());

  const updateGalaxyRotation = (galaxy: Container) => (delta: number) => {
    galaxy.rotation += delta * galaxyRotationVar();
  };

  const app = useApp();

  const size = useResize('galaxy-gen');

  const stars = useRef<Celestial[]>(null);

  const reactiveAnimate = useReactiveVar(animateVar);

  const reposition = (config: GalaxyConfig) => {
    stars.current.forEach((star, i) => {
      const _star = galaxyContainer.current.getChildAt(i) as Graphics;
      const position = getCelestialPosition(star, config);
      _star.x = position.x;
      _star.y = position.y;
    });
  };

  const animatedRepositioningTickerRef = useRef<TickerCallback<unknown>>(() => {
    const animConfig = {
      ...galaxyConfigVar(),
      curvature: galaxyConfigVar().curvature * Math.sin(timeVar() * 0.01),
    };

    reposition(animConfig);
  });

  const repositioningTickerRef = useRef<TickerCallback<unknown>>(() =>
    reposition(galaxyConfigVar())
  );

  useEffect(() => {
    galaxyContainer.current.name = 'galaxy';

    galaxyContainer.current.x = size.width / 2;
    galaxyContainer.current.y = size.height / 2;

    app.ticker.add(updateGalaxyRotation(galaxyContainer.current));

    app.ticker.add((delta) => {
      timeVar(timeVar() + 1);
    });

    /**
     * NOTE: we don't need to manually destroy anything in a return function, as react-pixi seems to do this automatically.
     *
     * In fact, if you try and destroy in a return here it will throw errors as it tried to double-delete.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reactiveAnimate) {
      app.ticker.add(animatedRepositioningTickerRef.current);
    } else {
      app.ticker.add(repositioningTickerRef.current);
    }

    return () => {
      try {
        if (reactiveAnimate) {
          app.ticker.remove(repositioningTickerRef.current);
        } else {
          app.ticker.remove(animatedRepositioningTickerRef.current);
        }
      } catch (e) {
        console.warn('Tried to remove ticker functions that did not exist.');
      }
    };
  }, [reactiveAnimate]);

  useEffect(() => {
    galaxyContainer.current.removeChildren();

    stars.current = generateCelestials(galaxyConfig.stars, galaxyConfig.seed);

    stars.current.forEach((star) => {
      const _star = Star({
        ...getCelestialPosition(star, galaxyConfigVar()),
        claimedCol: colors[colorsVar().secondary]['300'],
        unclaimedCol: colors[colorsVar().secondary]['200'],
      });
      galaxyContainer.current.addChild(_star);
    });
  }, [galaxyConfig.stars, galaxyConfig.seed]);

  useViewport({ app, size, containerRef: galaxyContainer, clampDrag: true });
  useFpsTracker(app);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
