import * as THREE from 'three';

export const textureGen = () => {
  // create a buffer with color data

  const width = 512;
  const height = 512;

  const size = width * height;
  const data = new Uint8Array(4 * size);
  const color = new THREE.Color(0xffffff);

  const r = Math.floor(color.r * 255);
  const g = Math.floor(color.g * 255);
  const b = Math.floor(color.b * 255);

  for (let i = 0; i < size; i++) {
    const stride = i * 4;

    data[stride] = r;
    data[stride + 1] = g;
    data[stride + 2] = b;
    data[stride + 3] = 255;
  }

  return { data, width, height };
};
