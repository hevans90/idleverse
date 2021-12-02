export const ts = 60;
export const ts1_3 = ts / 8;
export const ts1_2 = ts / 2;
export const ts2_3 = (7 * ts) / 8;
export const rls = 2;
export const tileConfigRegex = /(\w)(\d*)(?:-(\d+))?/;
export const debug = { enabled: false };

export const rotationConstants = {
  0: { tile: { sin: 0, cos: 1 }, occupant: { i: 0, j: 0 } },
  1: { tile: { sin: 1, cos: 0 }, occupant: { i: -1, j: 0 } },
  2: { tile: { sin: 0, cos: -1 }, occupant: { i: -1, j: -1 } },
  3: { tile: { sin: -1, cos: 0 }, occupant: { i: 0, j: -1 } },
};
