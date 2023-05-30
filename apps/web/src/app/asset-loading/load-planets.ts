import { planetSpriteConfigs } from '../canvases/celestial-viewer/utils/static-sprite-configs';

import { ResolverAssetsArray } from 'pixi.js';
import { assetLoader } from './asset-loader';

export const loadPlanets = async () => {
  const bundle: ResolverAssetsArray = planetSpriteConfigs.map(
    ({ url: srcs, name }) => ({
      srcs,
      name,
    })
  );

  try {
    await assetLoader({ bundleName: 'planets', bundle });
  } catch (e) {
    console.error(e);
  }
};
