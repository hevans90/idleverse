import { makeVar } from '@apollo/client';
import { AssetCollection } from './models';

export const planetResourcesVar = makeVar<AssetCollection>(null);

export const userAvatarResourcesVar = makeVar<AssetCollection>(null);

export const treeIconResourcesVar = makeVar<AssetCollection>(null);
