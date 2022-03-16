import { expose } from 'comlink';
import { textureGen } from './data-tex';

const worker = {
  textureGen,
};

export type RunTextureGenWorker = typeof worker;

expose(worker);
