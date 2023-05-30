import { Assets, ResolverAssetsArray } from 'pixi.js';

export const assetLoader = async ({
  bundleName,
  bundle,
  background = true,
}: {
  bundleName: string;
  bundle: ResolverAssetsArray;
  background?: boolean;
}) => {
  Assets.addBundle(bundleName, bundle);
  if (background) {
    await Assets.backgroundLoadBundle(bundleName);
  } else {
    await Assets.loadBundle(bundleName);
  }
};
