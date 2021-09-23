import { useReactiveVar } from '@apollo/client';
import { useApp } from '@inlet/react-pixi';
import { addStats } from 'pixi-stats';
import { Viewport } from 'pixi-viewport';
import { Container, Graphics, UPDATE_PRIORITY } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import {
  animate,
  galaxyConfig,
  galaxyRotation,
  time,
} from '../_state/reactive-variables';
import { Star } from './graphics/star';
import {
  GalaxyConfig,
  GenerateCelestials,
  GetCelestialPosition,
} from './utils/generate';
import { useResize } from './utils/use-resize.hook';

export const Game = () => {
  const galaxy = useRef(new Container());

  const updateGalaxyRotation = (galaxy: Container) => (delta: number) => {
    galaxy.rotation += delta * galaxyRotation();
  };

  const app = useApp();
  const size = useResize();

  const [stars] = useState(GenerateCelestials(5000));

  const reactiveAnimate = useReactiveVar(animate);

  const reposition = (config: GalaxyConfig) =>
    stars.forEach((star, i) => {
      let _star = galaxy.current.getChildAt(i) as Graphics;
      let position = GetCelestialPosition(star, config);
      _star.x = position.x;
      _star.y = position.y;
    });

  const animatedRepositioningTicker = () => {
    const animConfig = {
      ...galaxyConfig(),
      curvature: galaxyConfig().curvature * Math.sin(time() * 0.01),
    };

    reposition(animConfig);
  };

  const repositioningTicker = () => reposition(galaxyConfig());

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

    galaxy.current.name = 'galaxy';

    viewport.addChild(galaxy.current);

    stars.forEach(star => {
      let _star = Star(GetCelestialPosition(star, galaxyConfig()));
      galaxy.current.addChild(_star);
    });

    galaxy.current.x = size.width / 2;
    galaxy.current.y = size.height / 2;

    app.ticker.add(updateGalaxyRotation(galaxy.current));

    app.ticker.add(delta => {
      time(time() + 1);
    });

    app.ticker.add(repositioningTicker);

    const stats = addStats(document, app);
    app.ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reactiveAnimate) {
      app.ticker.remove(repositioningTicker);
      app.ticker.add(animatedRepositioningTicker);
    } else {
      app.ticker.remove(animatedRepositioningTicker);
      app.ticker.add(repositioningTicker);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactiveAnimate]);

  // when the screen is resized, this effect will reset the viewport's screen dimensions & then re-center
  useEffect(() => {
    const viewport: Viewport = app.stage.getChildByName(
      'viewport'
    ) as unknown as Viewport;

    viewport.screenHeight = size.height;
    viewport.screenWidth = size.width;

    viewport.fitWorld(true);
  }, [app.stage, size]);

  return <></>;
};
