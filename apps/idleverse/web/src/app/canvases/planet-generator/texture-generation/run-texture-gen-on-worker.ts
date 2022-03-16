import { wrap } from 'comlink';
import { DataTexture } from 'three';

const worker = new Worker(new URL('./worker.ts', import.meta.url));

const { textureGen, simplexTexture, perlinTexture } =
  wrap<import('./worker').RunTextureGenWorker>(worker);

export const runTextureGenOnWorker = async (
  type: 'regular' | 'simplex' | 'perlin',
  tileSize = 10
) => {
  const { data, height, width } =
    type === 'simplex'
      ? await simplexTexture()
      : type === 'perlin'
      ? await perlinTexture(tileSize)
      : await textureGen();

  const texture = new DataTexture(data, width, height);
  texture.needsUpdate = true;

  return texture;
};
