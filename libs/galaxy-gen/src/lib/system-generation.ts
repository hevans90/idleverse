import { randomPointInAnnulus } from './random-point-in-annulus';

type SystemFociTuple = typeof SYSTEM_FOCI;

export type SystemFocus = SystemFociTuple[number];

export const SYSTEM_FOCI = [
  'celestial',
  'goldilocks-zone',
  'asteroid-belt',
] as const;

export const CELESTIAL_RADIUS = 0.25;

export const WORLD_SIZE = { width: 8000, height: 8000 };
export const CENTER = {
  x: WORLD_SIZE.width / 2,
  y: WORLD_SIZE.height / 2,
};

export const WORLD_RADII: {
  [key in SystemFocus]: { inner: number; outer: number };
} = {
  celestial: { inner: 0, outer: CELESTIAL_RADIUS * (WORLD_SIZE.width / 3) },
  'goldilocks-zone': {
    inner: WORLD_SIZE.width / 2 - WORLD_SIZE.width / 6,
    outer: WORLD_SIZE.width / 2,
  },
  'asteroid-belt': {
    inner: WORLD_SIZE.width - WORLD_SIZE.width / 4,
    outer: WORLD_SIZE.width - WORLD_SIZE.width / 8,
  },
};

export const randomGoldilocksRadii = () =>
  randomPointInAnnulus({
    dimensions: {
      innerRadius: WORLD_RADII['goldilocks-zone'].inner,
      outerRadius: WORLD_RADII['goldilocks-zone'].outer,
    },
    center: CENTER,
  }).radius;
