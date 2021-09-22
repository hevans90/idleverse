import { useReactiveVar } from '@apollo/client';
import { useApp } from '@inlet/react-pixi';
import { addStats } from 'pixi-stats';
import { Viewport } from 'pixi-viewport';
import { Container, Graphics, Text, UPDATE_PRIORITY } from 'pixi.js';
import { useEffect, useState } from 'react';
import {
  galaxyConfig,
  galaxySlidersConfig,
} from '../_state/reactive-variables';
import { Star } from './graphics/star';
import { GenerateCelestials, GetCelestialPosition } from './utils/generate';
import { useResize } from './utils/use-resize.hook';

export const Game = () => {
  const _galaxyConfig = useReactiveVar(galaxyConfig);

  const app = useApp();

  const size = useResize();

  const [stars] = useState(GenerateCelestials(5000));

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

    const galaxy = new Container();
    viewport.addChild(galaxy);
    galaxy.name = 'galaxy';

    stars.forEach(star => {
      let _star = Star(GetCelestialPosition(star, _galaxyConfig));
      galaxy.addChild(_star);
    });

    galaxySlidersConfig.forEach((slider, i) => {
      let sliderText = new Text(
        `${slider.name}: ${_galaxyConfig[slider.name]}`,
        {
          fontFamily: 'consolas',
          fontSize: 24,
          fill: 0xffffff,
        }
      );
      sliderText.x = 50;
      sliderText.y = 100 + i * 40;
      app.stage.addChild(sliderText);
      sliderText.name = slider.name;
    });

    galaxy.x = size.width / 2;
    galaxy.y = size.height / 2;

    app.ticker.add(delta => {
      // rotate the container!
      // use delta to create frame-independent transform
      galaxy.rotation -= 0.001 * delta;
    });

    const stats = addStats(document, app);

    app.ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when the screen is resized, this effect will reset the viewport's screen dimensions & then re-center
  useEffect(() => {
    const viewport: Viewport = app.stage.getChildByName(
      'viewport'
    ) as unknown as Viewport;

    viewport.screenHeight = size.height;
    viewport.screenWidth = size.width;

    viewport.fitWorld(true);
  }, [app.stage, size]);

  useEffect(
    () => {
      galaxySlidersConfig.forEach((slider, i) => {
        let sliderText = app.stage.getChildByName(slider.name) as Text;
        sliderText.text = `${slider.name}: ${_galaxyConfig[slider.name]}`;
      });
      
      console.log(_galaxyConfig)

      let viewport = app.stage.getChildByName('viewport') as Viewport;
      let galaxy = viewport.getChildByName('galaxy') as Container;
      stars.forEach((star, i) => {
        let _star = galaxy.getChildAt(i) as Graphics;
        let position = GetCelestialPosition(star, _galaxyConfig);
        _star.x = position.x;
        _star.y = position.y;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_galaxyConfig]
  );

  return <></>;
};
