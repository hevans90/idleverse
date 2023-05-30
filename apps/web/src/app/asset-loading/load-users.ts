import { UserInfoQuery } from '@idleverse/galaxy-gql';
import { ResolverAssetsArray } from 'pixi.js';
import { assetLoader } from './asset-loader';

export const loadUserInfo = async (data: UserInfoQuery) => {
  const local = window.location.origin.includes('localhost');

  // localhost has CORS issues with AUTH0's profile picture API :(
  if (!local) {
    const bundle: ResolverAssetsArray = data.user_info.map(
      ({ id, avatar_url: srcs }) => ({
        srcs,
        name: id,
      })
    );

    try {
      await assetLoader({ bundleName: 'user-avatars', bundle });
    } catch (e) {
      console.error(e);
    }
  }
};
