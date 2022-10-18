import { makeVar } from '@apollo/client';
import { AssetCollection } from './models';

export const colyseusAssetsVar = makeVar<AssetCollection>(null);
