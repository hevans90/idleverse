import { RingConfig } from '@idleverse/state';
import { deepCompareRings } from './deep-compare-rings';

const config1: RingConfig = {
  id: 'a',
  type: 'rocky',
  innerRadius: 2.5,
  outerRadius: 3.5,
  resolution: 1024,
  colors: [
    { r: 10, g: 15, b: 20 },
    { r: 10, g: 15, b: 20 },
    { r: 10, g: 15, b: 20 },
    { r: 255, g: 255, b: 255 },
  ],
  terrainBias: [0.6, 0.65, 0.7, 0.8],
  rotation: [0, 0, 0],
};

const config2: RingConfig = {
  id: 'b',
  type: 'banded',
  innerRadius: 5,
  outerRadius: 5.5,
  resolution: 128,
  colors: [
    { r: 100, g: 150, b: 200 },
    { r: 100, g: 150, b: 200 },
    { r: 100, g: 150, b: 200 },
    { r: 255, g: 255, b: 255 },
  ],
  terrainBias: [0.6, 0.65, 0.7, 0.8],
  rotation: [0, 0, 0],
};

describe('deepCompareRings', () => {
  it('should return empty arrays if both arrays passed are empty', () => {
    expect(deepCompareRings([], [])).toEqual({
      additions: [],
      deletions: [],
      updates: [],
    });
  });
  it('should handle one config change', () => {
    expect(
      deepCompareRings(
        [config1, config2],
        [config1, { ...config2, innerRadius: 10 }]
      )
    ).toEqual({
      additions: [],
      deletions: [],
      updates: [
        {
          props: ['innerRadius'],
          config: { ...config2, innerRadius: 10 },
          regenTexture: false,
        },
      ],
    });
  });
  it('should handle multiple config changes', () => {
    expect(
      deepCompareRings(
        [config1, config2],
        [
          {
            ...config1,
            type: 'banded',
            innerRadius: 0.5,
            outerRadius: 1,
            colors: [
              config1.colors[0],
              config1.colors[1],
              config1.colors[2],
              { r: 200, g: 200, b: 200 },
            ],
          },
          { ...config2, innerRadius: 10 },
        ]
      )
    ).toEqual({
      additions: [],
      deletions: [],
      updates: [
        {
          props: ['type', 'innerRadius', 'outerRadius', 'colors'],
          config: {
            ...config1,
            type: 'banded',
            innerRadius: 0.5,
            outerRadius: 1,
            colors: [
              config1.colors[0],
              config1.colors[1],
              config1.colors[2],
              { r: 200, g: 200, b: 200 },
            ],
          },
          regenTexture: true,
        },
        {
          props: ['innerRadius'],
          config: { ...config2, innerRadius: 10 },
          regenTexture: false,
        },
      ],
    });
  });

  it('should handle a single addition', () => {
    expect(deepCompareRings([config1], [config1, config2])).toEqual({
      additions: [config2],
      deletions: [],
      updates: [],
    });
  });

  it('should handle a single deletion', () => {
    expect(deepCompareRings([config1, config2], [config1])).toEqual({
      additions: [],
      deletions: [config2.id],
      updates: [],
    });
  });
});
