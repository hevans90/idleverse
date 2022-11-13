import * as PIXI from 'pixi.js';
import { spaceshipSpriteConfig } from '../showreel/colyseus-poc/utils/sprite-configs';
import { colyseusAssetsVar } from '../_state/colyseus';

import { assetLoader } from './asset-loader';

export const loadColyseusAssets = async () => {
  const addOptions: PIXI.IAddOptions[] = [spaceshipSpriteConfig].map(
    ({ url, name }) => ({
      url,
      name,
    })
  );

  try {
    colyseusAssetsVar(await assetLoader(addOptions));
  } catch (e) {
    console.error(e);
  }
};
