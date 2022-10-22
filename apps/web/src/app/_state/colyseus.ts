import { AssetCollection } from './models';
import { makeVarPersisted } from './utils';

export const colyseusSessionVar = makeVarPersisted<{
  roomId: string;
  clientId: string;
}>(undefined, 'colyseusSession');

export const colyseusAssetsVar = makeVarPersisted<AssetCollection>(
  {},
  'colyseusAssets'
);

export const colyseusGridVar = makeVarPersisted<boolean>(false, 'colyseusGrid');
