/* eslint-disable react-hooks/exhaustive-deps */
import { useReactiveVar } from '@apollo/client';
import {
  Celestial,
  GalaxyConfig,
  generateCelestials,
  getCelestialPosition,
} from '@idleverse/galaxy-gen';
import { useApp } from '@inlet/react-pixi';
import { Viewport } from 'pixi-viewport';
import { Container, Graphics, TickerCallback } from 'pixi.js';
import { useEffect, useRef } from 'react';
import {
  animateVar,
  galaxyConfigVar,
  galaxyRotationVar,
  timeVar,
} from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { Star } from './graphics/star';
import { fpsTracker } from './utils/fps-counter';

export const GalaxyGenerator = () => {
  const galaxyConfig = useReactiveVar(galaxyConfigVar);

  const galaxyContainer = useRef(new Container());

  const updateGalaxyRotation = (galaxy: Container) => (delta: number) => {
    galaxy.rotation += delta * galaxyRotationVar();
  };

  const app = useApp();

  const size = useResize(true);

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
    // create viewport
    const viewport = new Viewport({
      screenWidth: size.width,
      screenHeight: size.height,
      worldWidth: size.width,
      worldHeight: size.height,

      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      interaction: app.renderer.plugins.interaction,
    });

    // add the viewport to the stage
    app.stage.addChild(viewport);
    viewport.name = 'viewport';

    // activate plugins
    viewport.drag().pinch().wheel().decelerate();

    viewport.clampZoom({ minWidth: 300, maxWidth: 2000 });
    viewport.clamp({ direction: 'all' });

    galaxyContainer.current.name = 'galaxy';

    viewport.addChild(galaxyContainer.current);

    galaxyContainer.current.x = size.width / 2;
    galaxyContainer.current.y = size.height / 2;

    app.ticker.add(updateGalaxyRotation(galaxyContainer.current));

    app.ticker.add((delta) => {
      timeVar(timeVar() + 1);
    });

    fpsTracker(app);

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
      const _star = Star(getCelestialPosition(star, galaxyConfigVar()));
      galaxyContainer.current.addChild(_star);
    });
  }, [galaxyConfig.stars, galaxyConfig.seed]);

  // when the screen is resized, this effect will reset the viewport's screen dimensions & then re-center
  useEffect(() => {
    const viewport: Viewport = app.stage.getChildByName(
      'viewport'
    ) as unknown as Viewport;

    viewport.screenHeight = size.height;
    viewport.screenWidth = size.width;

    viewport.fitWorld(true);
  }, [app.stage, size]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
