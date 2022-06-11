import { expose } from 'comlink';
import {
  generateColorBands,
  perlinTexture,
  simplexTexture,
} from './texture-generators';

const worker = {
  perlinTexture,
  simplexTexture,
  generateColorBands,
};

export type RunTextureGenWorker = typeof worker;

expose(worker);
