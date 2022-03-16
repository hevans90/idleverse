import * as THREE from 'three';

import SimplexNoise from 'simplex-noise';

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

export const simplexTexture = (resolution = { width: 512, height: 512 }) => {
  console.time('simplex generation');
  const { width, height } = resolution;

  const size = width * height;
  const data = new Uint8Array(4 * size);

  const simplex = new SimplexNoise();

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
  tileSize: number,
  resolution = { width: 512, height: 512 }
) => {
  console.time('perlin generation');
  const { width, height } = resolution;

  const size = width * height;
  const data = new Uint8Array(4 * size);

  const perlin = generatePerlinNoise(width, height);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const perlinValue = perlin[x + y * width];

      // water
      if (perlinValue > 0) {
        data[(x + y * width) * 4 + 0] = 1;
        data[(x + y * width) * 4 + 1] = 1;
        data[(x + y * width) * 4 + 2] = 180;
        data[(x + y * width) * 4 + 3] = 255;
      }
      // sand
      if (perlinValue > 0.5) {
        data[(x + y * width) * 4 + 0] = 249;
        data[(x + y * width) * 4 + 1] = 209;
        data[(x + y * width) * 4 + 2] = 107;
        data[(x + y * width) * 4 + 3] = 255;
      }
      // grass
      if (perlinValue > 0.6) {
        data[(x + y * width) * 4 + 0] = 50;
        data[(x + y * width) * 4 + 1] = 245;
        data[(x + y * width) * 4 + 2] = 50;
        data[(x + y * width) * 4 + 3] = 255;
      }
      // forest
      if (perlinValue > 0.65) {
        data[(x + y * width) * 4 + 0] = 1;
        data[(x + y * width) * 4 + 1] = 200;
        data[(x + y * width) * 4 + 2] = 1;
        data[(x + y * width) * 4 + 3] = 255;
      }
    }
  }

  console.timeEnd('perlin generation');
  return { data, width, height };
};
