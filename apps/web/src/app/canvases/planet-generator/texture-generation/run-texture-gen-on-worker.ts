import { rgb } from '@idleverse/models';
import { wrap } from 'comlink';
import { DataTexture } from 'three';

export const worker = new Worker(new URL('./worker.ts', import.meta.url));

const { simplexTexture, perlinTexture, generateColorBands } =
  wrap<import('./worker').RunTextureGenWorker>(worker);

export const runDataGenOnWorker = async (
  type: 'banded' | 'simplex' | 'perlin',
  resolution: number,
  colors: [rgb, rgb, rgb, rgb],
  terrainBias: [number, number, number, number],
  seed: string
) => {
  const { data, height, width } =
    type === 'simplex'
      ? await simplexTexture({ width: resolution, height: resolution }, seed)
      : type === 'perlin'
      ? await perlinTexture(
          { width: resolution, height: resolution },
          colors,
          terrainBias,
          seed
        )
      : await generateColorBands(
          { width: resolution, height: resolution },
          colors,
          terrainBias
        );

  return { data, height, width };
};

export const runPixelDataGenOnWorker = async (
  type: 'banded' | 'simplex' | 'perlin',
  resolution: number,
  colors: [rgb, rgb, rgb, rgb],
  terrainBias: [number, number, number, number],
  seed: string
) => {
  const { data, width, height } = await runDataGenOnWorker(
    type,
    resolution,
    colors,
    terrainBias,
    seed
  );

  return {
    seed,
    data,
    width,
    height,
  };
};

export const runTextureGenOnWorker = async (
  type: 'banded' | 'simplex' | 'perlin',
  resolution: number,
  colors: [rgb, rgb, rgb, rgb],
  terrainBias: [number, number, number, number],
  seed: string
) => {
  const { data, width, height } = await runDataGenOnWorker(
    type,
    resolution,
    colors,
    terrainBias,
    seed
  );

  const texture = new DataTexture(data, width, height);
  texture.needsUpdate = true;

  return texture;
};
