import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import { RingConfig, RingKey, rgb } from '@idleverse/models';
import {
  planetGenerationColorDrawerVar,
  planetGenerationRingDrawerVar,
  planetGeneratorConfigVar,
} from '@idleverse/state';
import { hexToRGB } from '@idleverse/theme';

export const update3DPlanetRenderer = (
  planet: PlanetByIdQuery['planet_by_pk']
) => {
  planetGeneratorConfigVar({
    ...planetGeneratorConfigVar(),
    atmosphericDistance: planet.atmospheric_distance,
    name: planet.name,
    orbitalRadius: planet.orbital_radius,
    seed: planet.id,
    textureResolution: planet.texture_resolution,
    radius: planet.radius,
  });

  planetGenerationColorDrawerVar({
    panelOpen: false,
    terrainBias: planet.terrain_bias as [number, number, number, number],
    palettePresetName: planet.terrain_hex_palette.name,
  });

  planetGenerationRingDrawerVar({
    panelOpen: false,
    rings: planet.rings.map(
      (ring) =>
        ({
          ...ring,
          id: ring?.id ?? '',
          type: ring.type as RingKey,
          rotation: ring.rotation as [x: number, y: number, z: number],
          innerRadius: ring.inner_radius,
          outerRadius: ring.outer_radius,
          terrainBias: ring.terrain_bias as [number, number, number, number],
          colors: ring.colors.map((color) => hexToRGB(color)) as [
            rgb,
            rgb,
            rgb,
            rgb
          ],
        } as RingConfig)
    ),
  });
};
