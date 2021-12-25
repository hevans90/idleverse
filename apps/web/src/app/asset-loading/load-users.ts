import { UserInfoQuery } from '@idleverse/galaxy-gql';
import * as PIXI from 'pixi.js';
import { LoaderResource } from 'pixi.js';
import { AssetCollection } from '../_state/models';
import { userAvatarResourcesVar, usersVar } from '../_state/reactive-variables';

export const loadUserInfo = async (data: UserInfoQuery) => {
  usersVar(data.user_info);

  try {
    const assetCollection = await loadUserAvatars(
      data.user_info.map(({ id: name, avatar_url: url }) => ({ name, url }))
    );

    userAvatarResourcesVar(assetCollection);
  } catch (e) {
    console.error(e);
  }
};

const loadUserAvatars = async (
  userPaths: PIXI.IAddOptions[]
): Promise<AssetCollection> =>
  new Promise<AssetCollection>((res, rej) => {
    const paths = userPaths.map((props) => ({
      ...props,
      crossOrigin: 'anonymous',
      loadType: LoaderResource.LOAD_TYPE.IMAGE,
    }));

    PIXI.Loader.shared
      .add(paths)
      .load((_, resourcesLoaded) => res(resourcesLoaded));

    PIXI.Loader.shared.onError.add((e) => {
      console.error(e);
      rej('Failed to load resources.');
    });
    PIXI.Loader.shared.onProgress.add((loader, resource) =>
      console.log(loader.progress, resource.name)
    );
  });
