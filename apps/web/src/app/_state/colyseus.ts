import { makeVar } from '@apollo/client';
import {
  ColyseusCelestial,
  ColyseusShip,
  RoomState,
} from '@idleverse/colyseus-shared';
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

export const colyseusRoomVar = makeVar<Room<RoomState>>(undefined);
export const colyseusRoomDimensionsVar = makeVar<{
  width: number;
  height: number;
  columns: number;
  rows: number;
}>(undefined);

export const colyseusShipsVar = makeVar<ColyseusShip[]>([]);
export const colyseusCelestialsVar = makeVar<ColyseusCelestial[]>([]);

export const colyseusGameSettingsVar = makeVarPersisted<{
  panelOpen: boolean;
  grid: boolean;
  boundingBoxes: boolean;
  avatars: boolean;
}>(
  { panelOpen: false, grid: false, boundingBoxes: false, avatars: true },
  'colyseusGameSettings'
);
