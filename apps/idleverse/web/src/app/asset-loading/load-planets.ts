import * as PIXI from 'pixi.js';
import { spriteConfigs } from '../canvases/solar-system/graphics/config';
import { planetResourcesVar } from '../_state/reactive-variables';
import { assetLoader } from './asset-loader';

export const loadPlanets = async () => {
  const addOptions: PIXI.IAddOptions[] = spriteConfigs.map(({ url, name }) => ({
    url,
    name,
  }));

  try {
    planetResourcesVar(await assetLoader(addOptions));
  } catch (e) {
    console.error(e);
  }
};
