import { wrap } from 'comlink';
import { DataTexture } from 'three';
import { textureColorMap } from './texture-generators';

const worker = new Worker(new URL('./worker.ts', import.meta.url));

const { textureGen, simplexTexture, perlinTexture } =
  wrap<import('./worker').RunTextureGenWorker>(worker);

export const runTextureGenOnWorker = async (
  type: 'regular' | 'simplex' | 'perlin',
  resolution: number,
  colors: textureColorMap,
  tileSize = 10
) => {
  const { data, height, width } =
    type === 'simplex'
      ? await simplexTexture({ width: resolution, height: resolution })
      : type === 'perlin'
      ? await perlinTexture(
          tileSize,
          { width: resolution, height: resolution },
          colors
        )
      : await textureGen();

  const texture = new DataTexture(data, width, height);
  texture.needsUpdate = true;

  return texture;
};
