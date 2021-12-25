import { useQuery } from '@apollo/client';
import { UserInfoDocument, UserInfoQuery } from '@idleverse/galaxy-gql';
import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { AssetCollection } from '../_state/models';
import { userAvatarResourcesVar, usersVar } from '../_state/reactive-variables';

/**
 * Preload user information
 */
export const useUserPreload = () => {
  const { data, loading } = useQuery<UserInfoQuery>(UserInfoDocument);

  useEffect(() => {
    if (!loading) {
      usersVar(data.user_info);

      loadUserAvatars(
        data.user_info.map(({ id: name, avatar_url: url }) => ({ name, url }))
      )
        .then((assetCollection) => userAvatarResourcesVar(assetCollection))
        .catch((e) => console.error(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user_info.length, loading]);
};

export const loadUserAvatars = async (
  userPaths: PIXI.IAddOptions[]
): Promise<AssetCollection> =>
  new Promise<AssetCollection>((res, rej) => {
    const paths = userPaths.map((props) => ({
      ...props,
      crossOrigin: '',
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
