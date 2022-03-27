import SimplexNoise from 'simplex-noise';
import * as THREE from 'three';
import { rgb } from '../../../_state/models';
import { generatePerlinNoise } from './perlin';

export const textureGen = (resolution = { width: 512, height: 512 }) => {
  console.time('basic generation');
  const { width, height } = resolution;

  const size = width * height;
  const data = new Uint8Array(4 * size);
  const color = new THREE.Color(0xffffff);

  const r = Math.floor(color.r * 255);
  const g = Math.floor(color.g * 255);
  const b = Math.floor(color.b * 255);

  for (let i = 0; i < size; i++) {
    const stride = i * 4;

    data[stride] = r; // red
    data[stride + 1] = g; // green
    data[stride + 2] = b; // blue
    data[stride + 3] = 255; // alpha
  }

  console.timeEnd('basic generation');
  return { data, width, height };
};

export const simplexTexture = (
  resolution = { width: 512, height: 512 },
  seed: string
) => {
  console.time('simplex generation');
  const { width, height } = resolution;

  const size = width * height;
  const data = new Uint8Array(4 * size);

  const simplex = new SimplexNoise(seed);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const r = simplex.noise2D(x, y);
      const g = simplex.noise2D(x / 2, y / 2);
      data[(x + y * width) * 4 + 0] = r * 255;
      data[(x + y * width) * 4 + 1] = (r + g) * 200;
      data[(x + y * width) * 4 + 2] = 0;
      data[(x + y * width) * 4 + 3] = 255;
    }
  }
  console.timeEnd('simplex generation');
  return { data, width, height };
};

export const perlinTexture = (
  resolution = { width: 512, height: 512 },
  colors: [rgb, rgb, rgb, rgb],
  terrainBias: [number, number, number, number],
  seed: string
) => {
  console.time('perlin generation');
  const { width, height } = resolution;

  const size = width * height;
  const data = new Uint8Array(4 * size);

  const perlin = generatePerlinNoise(width, height, seed);

  const [col1, col2, col3, col4] = colors;

  const [bias1, bias2, bias3, bias4] = terrainBias;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const perlinValue = perlin[x + y * width];

      if (perlinValue > bias1) {
        data[(x + y * width) * 4 + 0] = col1.r;
        data[(x + y * width) * 4 + 1] = col1.g;
        data[(x + y * width) * 4 + 2] = col1.b;
        data[(x + y * width) * 4 + 3] = 255;
      }

      if (perlinValue > bias2) {
        data[(x + y * width) * 4 + 0] = col2.r;
        data[(x + y * width) * 4 + 1] = col2.g;
        data[(x + y * width) * 4 + 2] = col2.b;
        data[(x + y * width) * 4 + 3] = 255;
      }

      if (perlinValue > bias3) {
        data[(x + y * width) * 4 + 0] = col3.r;
        data[(x + y * width) * 4 + 1] = col3.g;
        data[(x + y * width) * 4 + 2] = col3.b;
        data[(x + y * width) * 4 + 3] = 255;
      }

      if (perlinValue > bias4) {
        data[(x + y * width) * 4 + 0] = col4.r;
        data[(x + y * width) * 4 + 1] = col4.g;
        data[(x + y * width) * 4 + 2] = col4.b;
        data[(x + y * width) * 4 + 3] = 255;
      }
    }
  }

  console.timeEnd('perlin generation');
  return { data, width, height };
};
