import { ResourcesQuery } from '@idleverse/galaxy-gql';

import { assetLoader } from './asset-loader';

import { ResolverAssetsArray } from 'pixi.js';

export const loadTechTree = async (data: ResourcesQuery) => {
  const bundle: ResolverAssetsArray = data.resource_type.map(
    ({ image_url: srcs }) => ({
      srcs,
      name: srcs,
    })
  );

  try {
    await assetLoader({ bundleName: 'tech-tree', bundle });
  } catch (e) {
    console.error(e);
  }
};
