import { ResolverAssetsArray } from 'pixi.js';
import { assetLoader } from './asset-loader';

export const loadPlaceholders = async () => {
  const bundle: ResolverAssetsArray = [
    {
      name: '75x75-circle',
      srcs: '/placeholders/75x75-circle.png',
    },
    {
      name: '150x150',
      srcs: '/placeholders/150x150.png',
    },
  ];

  try {
    await assetLoader({ bundleName: 'placeholders', bundle });
  } catch (e) {
    console.error(e);
  }
};
