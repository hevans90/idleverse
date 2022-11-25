import { ResourcesQuery } from '@idleverse/galaxy-gql';
import { treeIconResourcesVar } from '../_state/pixi-resources';
import { assetLoader } from './asset-loader';

import * as PIXI from 'pixi.js';

export const loadTechTree = async (data: ResourcesQuery) => {
  const addOptions: PIXI.IAddOptions[] = data.resource_type.map(
    ({ image_url: url }) => ({
      url,
      name: url,
    })
  );

  try {
    treeIconResourcesVar(await assetLoader(addOptions));
  } catch (e) {
    console.error(e);
  }
};
