/* eslint-disable react-hooks/exhaustive-deps */
import {
  GalaxyConfig,
  generateCelestials,
  getCelestialPosition,
} from '@idleverse/galaxy-gen';
import { colors } from '@idleverse/theme';
import { useApp } from '@pixi/react';
import { Container } from 'pixi.js';
import { useEffect } from 'react';
import { colorsVar } from '../../_state/colors';
import { galaxyRotationVar } from '../../_state/reactive-variables';
import { Star } from '../galaxy-generator/graphics/star';

type GalaxyThumbnailProps = {
  galaxyConfig: GalaxyConfig;
};

export const GalaxyThumbnail = ({ galaxyConfig }: GalaxyThumbnailProps) => {
  const app = useApp();

  useEffect(() => {
    const galaxyContainer = new Container();
    app.stage.addChild(galaxyContainer);

    const celestials = generateCelestials(
      galaxyConfig.stars > 500 ? 500 : galaxyConfig.stars,
      galaxyConfig.seed
    );

    celestials.forEach((celestial, i) => {
      galaxyContainer.addChild(
        Star({
          ...getCelestialPosition(celestial, galaxyConfig),
          claimedCol: colors[colorsVar().secondary]['300'],
          unclaimedCol: colors[colorsVar().secondary]['200'],
        })
      );
    });

    app.ticker.add((delta: number) => {
      galaxyContainer.rotation += delta * galaxyRotationVar();
      galaxyContainer.x = app.screen.width * 0.5;
      galaxyContainer.y = app.screen.height * 0.5;
      galaxyContainer.width = app.screen.width * 0.9;
      galaxyContainer.height = app.screen.height * 0.9;
    });
  }, []);

  return <></>;
};
