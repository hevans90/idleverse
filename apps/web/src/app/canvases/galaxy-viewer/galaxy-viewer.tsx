/* eslint-disable react-hooks/exhaustive-deps */
import { useApp } from '@inlet/react-pixi';
import { Viewport } from 'pixi-viewport';
import { Container, Graphics } from 'pixi.js';
import { useEffect, useRef } from 'react';
import {
  galaxyConfigVar,
  galaxyRotationVar,
} from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { Star } from '../galaxy-generator/graphics/star';
import { fpsTracker } from '../galaxy-generator/utils/fps-counter';
import {
  Celestial,
  GalaxyConfig,
  generateCelestials,
  getCelestialPosition,
} from '../galaxy-generator/utils/generate-galaxy';

type GalaxyViewerProps = {
  galaxyConfig: GalaxyConfig;
};

export const GalaxyViewer = ({ galaxyConfig }: GalaxyViewerProps) => {
  const app = useApp();

  const galaxyContainer = useRef(new Container());
  const stars = useRef<Celestial[]>(null);

  const updateGalaxyRotation = (galaxy: Container) => (delta: number) => {
    galaxy.rotation += delta * galaxyRotationVar();
  };

  const size = useResize(false);

  const reposition = () =>
    stars.current.forEach((star, i) => {
      const _star = galaxyContainer.current.getChildAt(i) as Graphics;
      const position = getCelestialPosition(star, galaxyConfig);
      _star.x = position.x;
      _star.y = position.y;
    });

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

    fpsTracker(app);

    stars.current = generateCelestials(galaxyConfig.stars, galaxyConfig.seed);

    stars.current.forEach((star) => {
      const _star = Star(getCelestialPosition(star, galaxyConfigVar()));
      galaxyContainer.current.addChild(_star);
    });

    reposition();

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

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
