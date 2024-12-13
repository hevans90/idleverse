const digrams =
  'ABOUSEITILETSTONLONUTHNO' +
  'LEXEGEZACEBISOUSESARMAINDIREAERATENBERALAVETIEDORQUANTEISRION';

const rotatel = (x: number) => {
  let tmp = (x & 255) * 2;
  if (tmp > 255) tmp -= 255;
  return tmp;
};

const twist = (x: number) => 256 * rotatel(x / 256) + rotatel(x & 255);

const next = (seeds: number[]) => seeds.map((seed) => twist(seed));

const tweakseed = (seeds: number[]) => {
  const tmp = seeds.reduce((total, seed) => (total += seed), 0);

  return seeds.map((seed, index, arr) => arr[index + 1] || tmp & 65535);
};

const makename = (pairs: string, seeds: number[]) => {
  const name: string[] = [];
  let pair = [0, 0, 0, 0];
  const longname = seeds[0] & 64;

  pair = pair.map(() => {
    seeds = tweakseed(seeds);
    return 2 * ((seeds[2] / 256) & 31);
  });

  pair.forEach((value, index, arr) => {
    if (longname || index < arr.length - 1) {
      name.push(pairs[value]);
      name.push(pairs[value + 1]);
    }
  });

  return name
    .join('')
    .toLowerCase()
    .replace(/^\w/, (letter) => letter.toUpperCase());
};

const genNames = (amount: number) => {
  const names: string[] = [];

  let seeds = [Math.random() * 1000, Math.random() * 100, Math.random() * 5000];
  const pairs = digrams.substring(24);

  for (let i = 0; i < amount; ++i) {
    names.push(makename(pairs, seeds));
    seeds = tweakseed(next(seeds));
  }

  return names;
};

export const generateCelestialName = () =>
  genNames(100)[Math.floor(Math.random() * 100)];
