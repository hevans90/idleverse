import { makeVar } from '@apollo/client';
import { ColyseusShip, RoomState } from '@idleverse/colyseus-shared';
import { Room } from 'colyseus.js';
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

export const colyseusTrackingDistanceVar = makeVar<number>(undefined);
export const colyseusTrackingTargetVar = makeVar<{
  x: number;
  y: number;
  name: string;
}>(undefined);

export const colyseusTrackingEnabledVar = makeVarPersisted<boolean>(
  true,
  'colyseusTrackingTarget'
);

export const colyseusGridVar = makeVarPersisted<boolean>(false, 'colyseusGrid');

export const colyseusRoomVar = makeVar<Room<RoomState>>(undefined);
export const colyseusRoomDimensionsVar = makeVar<{
  width: number;
  height: number;
  columns: number;
  rows: number;
}>(undefined);

export const colyseusShipsVar = makeVar<ColyseusShip[]>([]);
