import { wrap } from 'comlink';
import { DataTexture } from 'three';
import { rgb } from '../../../_state/models';

export const worker = new Worker(new URL('./worker.ts', import.meta.url));

const { textureGen, simplexTexture, perlinTexture } =
  wrap<import('./worker').RunTextureGenWorker>(worker);

export const runTextureGenOnWorker = async (
  type: 'regular' | 'simplex' | 'perlin',
  resolution: number,
  colors: [rgb, rgb, rgb, rgb],
  terrainBias: [number, number, number, number],
  tileSize = 10,
  seed: string
) => {
  const { data, height, width } =
    type === 'simplex'
      ? await simplexTexture({ width: resolution, height: resolution })
      : type === 'perlin'
      ? await perlinTexture(
          { width: resolution, height: resolution },
          colors,
          terrainBias,
          seed
        )
      : await textureGen();

  const texture = new DataTexture(data, width, height);
  texture.needsUpdate = true;

  return texture;
};
