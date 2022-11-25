import * as PIXI from 'pixi.js';
import { planetSpriteConfigs } from '../canvases/celestial-viewer/utils/static-sprite-configs';

import { planetResourcesVar } from '../_state/pixi-resources';
import { assetLoader } from './asset-loader';

export const loadPlanets = async () => {
  const addOptions: PIXI.IAddOptions[] = planetSpriteConfigs.map(
    ({ url, name }) => ({
      url,
      name,
    })
  );

  try {
    planetResourcesVar(await assetLoader(addOptions));
  } catch (e) {
    console.error(e);
  }
};
