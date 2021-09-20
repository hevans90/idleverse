import { useApp } from '@inlet/react-pixi';
import { addStats } from 'pixi-stats';
import { Viewport } from 'pixi-viewport';
import { Container, UPDATE_PRIORITY } from 'pixi.js';
import { useEffect, useState } from 'react';
import { Star } from './graphics/star';
import { InitializeCelestials } from './utils/generate';
import { useResize } from './utils/use-resize.hook';

export const Game = () => {
  const app = useApp();

  const size = useResize();

  const [starPositions] = useState(
    InitializeCelestials(size.width, size.height, 5000)
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

    // activate plugins
    viewport.drag().pinch().wheel().decelerate();

    viewport.clampZoom({ minWidth: 300, maxWidth: 2000 });
    viewport.clamp({ direction: 'all' });

    const galaxy = new Container();
    viewport.addChild(galaxy);
    viewport.name = 'viewport';

    starPositions.forEach((starPosition) =>
      galaxy.addChild(Star(starPosition))
    );

    galaxy.x = size.width / 2;
    galaxy.y = size.height / 2;

    app.ticker.add((delta) => {
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

    console.log(viewport);
  }, [app.stage, size]);

  return <></>;
};
