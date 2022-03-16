import { expose } from 'comlink';
import {
  textureGen,
  simplexTexture,
  perlinTexture,
} from './texture-generators';

const worker = {
  perlinTexture,
  simplexTexture,
  textureGen,
};

export type RunTextureGenWorker = typeof worker;

expose(worker);
