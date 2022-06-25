import { UserInfoQuery } from '@idleverse/galaxy-gql';
import { userAvatarResourcesVar, usersVar } from '../_state/reactive-variables';
import { assetLoader } from './asset-loader';

export const loadUserInfo = async (data: UserInfoQuery) => {
  usersVar(data.user_info);

  const local = window.location.origin.includes('localhost');

  // localhost has CORS issues with AUTH0's profile picture API :(
  if (!local) {
    try {
      const assetCollection = await assetLoader(
        data.user_info.map(({ id: name, avatar_url: url }) => ({ name, url }))
      );

      userAvatarResourcesVar(assetCollection);
    } catch (e) {
      console.error(e);
    }
  }
};
