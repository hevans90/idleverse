import seedRandom from 'seedrandom';

export const generatePerlinNoise = (
  width: number,
  height: number,
  seed: string,
  options: { octaveCount: number; amplitude: number; persistence: number } = {
    octaveCount: 4,
    amplitude: 0.1,
    persistence: 0.2,
  }
) => {
  const octaveCount = options.octaveCount;
  let amplitude = options.amplitude;
  const persistence = options.persistence;
  const whiteNoise = generateWhiteNoise(width, height, seed);

  const smoothNoiseList = new Array(octaveCount);
  let i: number;

  for (i = 0; i < octaveCount; ++i) {
    smoothNoiseList[i] = generateSmoothNoise(i);
  }
  const perlinNoise: number[] = new Array(width * height);
  let totalAmplitude = 0;

  // blend noise together
  for (i = octaveCount - 1; i >= 0; --i) {
    amplitude *= persistence;
    totalAmplitude += amplitude;

    for (let j = 0; j < perlinNoise.length; ++j) {
      perlinNoise[j] = perlinNoise[j] || 0;
      perlinNoise[j] += smoothNoiseList[i][j] * amplitude;
    }
  }

  // normalization
  for (i = 0; i < perlinNoise.length; ++i) {
    perlinNoise[i] /= totalAmplitude;
  }

  return perlinNoise;

  function generateSmoothNoise(octave) {
    const noise = new Array(width * height);
    const samplePeriod = Math.pow(2, octave);
    const sampleFrequency = 1 / samplePeriod;
    let noiseIndex = 0;

    for (let y = 0; y < height; ++y) {
      const sampleY0 = Math.floor(y / samplePeriod) * samplePeriod;
      const sampleY1 = (sampleY0 + samplePeriod) % height;
      const vertBlend = (y - sampleY0) * sampleFrequency;

      for (let x = 0; x < width; ++x) {
        const sampleX0 = Math.floor(x / samplePeriod) * samplePeriod;
        const sampleX1 = (sampleX0 + samplePeriod) % width;
        const horizBlend = (x - sampleX0) * sampleFrequency;

        // blend top two corners
        const top = interpolate(
          whiteNoise[sampleY0 * width + sampleX0],
          whiteNoise[sampleY1 * width + sampleX0],
          vertBlend
        );
        // blend bottom two corners
        const bottom = interpolate(
          whiteNoise[sampleY0 * width + sampleX1],
          whiteNoise[sampleY1 * width + sampleX1],
          vertBlend
        );
        // final blend
        noise[noiseIndex] = interpolate(top, bottom, horizBlend);
        noiseIndex += 1;
      }
    }
    return noise;
  }
};

const generateWhiteNoise = (width: number, height: number, seed: string) => {
  const pseudoRandomGenerator = seedRandom(seed);

  const noise = new Array(width * height);
  for (let i = 0; i < noise.length; ++i) {
    noise[i] = pseudoRandomGenerator();
  }
  return noise;
};

const interpolate = (x0, x1, alpha) => x0 * (1 - alpha) + alpha * x1;
