/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@chakra-ui/react';
import {
  GalaxyConfig,
  generateCelestials,
  getCelestialPosition,
} from '@idleverse/galaxy-gen';
import { Application, Container } from 'pixi.js';
import { useEffect } from 'react';
import { galaxyRotationVar } from '../../_state/reactive-variables';
import { Star } from '../galaxy-generator/graphics/star';

type GalaxyThumbnailProps = {
  galaxyConfig: GalaxyConfig;
  thumbnailNumber: number;
};

export const GalaxyThumbnail = ({
  galaxyConfig,
  thumbnailNumber,
}: GalaxyThumbnailProps) => {
  const divId = `thumbnail-${thumbnailNumber}`;

  useEffect(() => {
    const gameElement = document.getElementById(divId);
    const app = new Application({
      transparent: true,
      resizeTo: gameElement,
    });

    const galaxyContainer = new Container();
    app.stage.addChild(galaxyContainer);

    const celestials = generateCelestials(
      galaxyConfig.stars,
      galaxyConfig.seed
    );

    celestials.forEach((celestial, i) => {
      galaxyContainer.addChild(
        Star({
          ...getCelestialPosition(celestial, galaxyConfig),
        })
      );
    });

    app.ticker.add((delta: number) => {
      app.screen.height = gameElement.clientHeight
        ? gameElement.clientHeight
        : 0;
      app.screen.width = gameElement.clientWidth ? gameElement.clientWidth : 0;
      galaxyContainer.rotation += delta * galaxyRotationVar();
      galaxyContainer.x = app.screen.width * 0.5;
      galaxyContainer.y = app.screen.height * 0.5;
      galaxyContainer.width = app.screen.width * 0.9;
      galaxyContainer.height = app.screen.height * 0.9;
    });

    document.getElementById(divId).appendChild(app.view);

    return () => app.destroy(true, true);
  }, []);

  return <Box id={divId} width="20vw" height="20vw"></Box>;
};
