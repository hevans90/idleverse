import * as PIXI from 'pixi.js';
import { LoaderResource } from 'pixi.js';
import { AssetCollection } from '../_state/models';

export const assetLoader = async (
  addOptions: PIXI.IAddOptions[],
  loadType: LoaderResource.LOAD_TYPE = LoaderResource.LOAD_TYPE.IMAGE
): Promise<AssetCollection> =>
  new Promise<AssetCollection>((resolve, reject) => {
    const paths = addOptions
      .map((props) => ({
        ...props,
        crossOrigin: 'anonymous',
        loadType,
      }))
      .filter(({ name }) => {
        const alreadyLoaded = PIXI.Loader.shared.resources[name];

        if (alreadyLoaded) {
          console.log(name, 'ALREADY LOADED, skipping');
        }

        return !alreadyLoaded;
      });

    PIXI.Loader.shared
      .add(paths)
      .load((_, resourcesLoaded) => resolve(resourcesLoaded));

    PIXI.Loader.shared.onError.add((e) => {
      console.error(e);
      reject('Failed to load resources.');
    });
    console.log('PIXI Asset Loader run started...');
    PIXI.Loader.shared.onProgress.add((loader, resource) => {
      console.log(loader.progress, resource.name);
    });
  });
