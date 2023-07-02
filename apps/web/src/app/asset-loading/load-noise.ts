import { ResolverAssetsArray } from 'pixi.js';
import { assetLoader } from './asset-loader';

export const loadNoise = async () => {
  const bundle: ResolverAssetsArray = [
    {
      name: 'perlin',
      srcs: '/noise/noise.png',
    },
    {
      name: 'perlin-bw',
      srcs: '/noise/noise-bw.png',
    },
  ];

  try {
    await assetLoader({ bundleName: 'noise', bundle });
  } catch (e) {
    console.error(e);
  }
};
