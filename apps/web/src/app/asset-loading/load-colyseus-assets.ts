import { ResolverAssetsArray } from 'pixi.js';
import { spaceshipSpriteConfig } from '../showreel/colyseus-poc/utils/sprite-configs';

import { assetLoader } from './asset-loader';

export const loadColyseusAssets = async () => {
  const bundle: ResolverAssetsArray = [spaceshipSpriteConfig].map(
    ({ url: srcs, name }) => ({
      srcs,
      name,
    })
  );

  try {
    await assetLoader({ bundleName: 'colyseus', bundle });
  } catch (e) {
    console.error(e);
  }
};
