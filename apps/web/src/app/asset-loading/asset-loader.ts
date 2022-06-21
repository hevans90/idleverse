import * as PIXI from 'pixi.js';
import { LoaderResource } from 'pixi.js';
import { AssetCollection } from '../_state/models';

export const assetLoader = async (
  addOptions: PIXI.IAddOptions[],
  loadType: LoaderResource.LOAD_TYPE = LoaderResource.LOAD_TYPE.IMAGE
): Promise<AssetCollection> =>
  new Promise<AssetCollection>((resolve, reject) => {
    addOptions.forEach(({ name }, index, arr) => {
      if (PIXI.Loader.shared.resources[name]) {
        arr.splice(index, 1);
        // console.log(name, 'ALREADY LOADED, skipping');
      } else {
        // console.log(name, 'BEING ADDED');
      }
    });

    const paths = addOptions.map((props) => ({
      ...props,
      crossOrigin: 'anonymous',
      loadType,
    }));

    PIXI.Loader.shared
      .add(paths)
      .load((_, resourcesLoaded) => resolve(resourcesLoaded));

    PIXI.Loader.shared.onError.add((e) => {
      console.error(e);
      reject('Failed to load resources.');
    });
    PIXI.Loader.shared.onProgress.add((loader, resource) => {
      // console.log(loader.progress, resource.name)
    });
  });
