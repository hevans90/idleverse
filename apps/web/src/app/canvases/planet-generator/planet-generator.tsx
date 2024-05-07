import { useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { rgbToHex } from '@idleverse/theme';

import { useEffect, useRef, useState } from 'react';
import { DataTexture } from 'three';

import { RingConfig } from '@idleverse/models';
import {
  planetGenerationColorDrawerVar,
  planetGenerationRingDrawerVar,
  planetGeneratorConfigVar,
} from '@idleverse/state';
import { useResize } from '../_utils/use-resize.hook';
import { deepCompareRings } from './_utils/deep-compare-rings';
import { runTextureGenOnWorker } from './texture-generation/run-texture-gen-on-worker';
import { PlanetGeneratorBooleans } from './ui/booleans';
import { PlanetGeneratorColorDrawer } from './ui/color-drawer';
import { NameSeedMobile } from './ui/name-seed-mobile';
import { PlanetGeneratorRingDrawer } from './ui/ring-drawer';
import {
  PlanetGeneratorSliders,
  planetGenerationControlsHeight,
} from './ui/sliders';

import { Planet } from '../_rendering/planet';

export const PlanetGenerator = ({
  customSize,
}: {
  customSize?: { width: number; height: number };
}) => {
  const { width, height } = useResize('planet-gen');

  const containerRef = useRef<HTMLDivElement>();

  const { ui, seed, atmosphericDistance, textureResolution, radius } =
    useReactiveVar(planetGeneratorConfigVar);

  const {
    currentPalette: { water, sand, grass, forest },
    palettePresetName,
    currentPaletteId,
    terrainBias,
  } = useReactiveVar(planetGenerationColorDrawerVar);

  const { rings } = useReactiveVar(planetGenerationRingDrawerVar);

  const prevRingsRef = useRef<RingConfig[]>([]);

  const [ringDataTextures, setRingDataTextures] = useState<{
    [ringId: string]: DataTexture;
  }>(undefined);

  useEffect(() => {
    const { updates, additions, deletions } = deepCompareRings(
      [...prevRingsRef.current],
      [...rings]
    );

    // processing deletions first makes more sense
    deletions.forEach((id) => delete ringDataTextures[id]);

    const updatesToRegen = updates
      .filter(({ regenTexture }) => regenTexture === true)
      .map(({ config }) => config);

    [...updatesToRegen, ...additions].forEach(
      ({ type, id, resolution, colors: ringColors, terrainBias }) => {
        runTextureGenOnWorker(
          type === 'rocky'
            ? 'perlin'
            : type === 'banded'
            ? 'banded'
            : 'simplex',
          resolution,
          ringColors,
          terrainBias,
          id
        ).then((texture) =>
          setRingDataTextures((prev) => ({ ...prev, [id]: texture }))
        );
      }
    );

    prevRingsRef.current = [...rings];
  }, [JSON.stringify(rings)]);

  return (
    <>
      <Box
        ref={containerRef}
        position="relative"
        width={`${customSize?.width || width}px`}
        height={
          ui
            ? `${customSize?.height || height}px`
            : `${
                (customSize?.height || height) + planetGenerationControlsHeight
              }`
        }
      >
        <Planet
          data={{
            id: seed,
            atmospheric_distance: atmosphericDistance,
            texture_resolution: textureResolution,
            radius,
            terrain_bias: terrainBias,
            terrain_hex_palette: {
              id: currentPaletteId,
              name: palettePresetName,
              water: rgbToHex(water),
              sand: rgbToHex(sand),
              grass: rgbToHex(grass),
              forest: rgbToHex(forest),
            },
            rings: rings.map((ring) => ({
              ...ring,
              id: ring.id ?? '',
              inner_radius: ring.innerRadius,
              outer_radius: ring.outerRadius,
              terrain_bias: ring.terrainBias,
              colors: ring.colors.map((color) => rgbToHex(color)),
            })),
          }}
        />
      </Box>

      <PlanetGeneratorBooleans />

      {ui && (
        <>
          <PlanetGeneratorColorDrawer />
          <NameSeedMobile />

          <PlanetGeneratorRingDrawer />
          <PlanetGeneratorSliders />
        </>
      )}
    </>
  );
};
