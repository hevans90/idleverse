import { GameConfig } from '../canvases/isometric-tiles/models/game-config';
import { makeVarPersisted } from './utils';

export const gameConfigVar = makeVarPersisted<GameConfig>(
  undefined,
  'isometricGameConfig'
);
