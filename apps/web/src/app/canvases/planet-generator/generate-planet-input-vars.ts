import { PlanetCreationInput, RingInsertInput } from '@idleverse/galaxy-gql';
import { RingConfig } from '@idleverse/models';
import {
  planetGenerationColorDrawerVar,
  planetGenerationRingDrawerVar,
  planetGenerationTerrainDrawerVar,
  planetGeneratorConfigVar,
} from '@idleverse/state';
import { rgbToHex } from '@idleverse/theme';

const mapFromRingConfigToRingInsertInput = ({
  colors,
  innerRadius,
  outerRadius,
  resolution,
  rotation,
  terrainBias,
  type,
}: RingConfig): RingInsertInput => ({
  colors: colors.map((rgb) => rgbToHex(rgb)),
  inner_radius: innerRadius,
  outer_radius: outerRadius,
  resolution,
  rotation,
  terrain_bias: terrainBias,
  type,
});

export const generatePlanetInsertionVars = (
  celestialId: string,
  ownerId: string
): PlanetCreationInput => {
  const {
    seed: id,
    name,
    radius,
    atmosphericDistance,
    textureResolution,
  } = planetGeneratorConfigVar();

  const { currentPaletteId } = planetGenerationColorDrawerVar();
  const { terrainBias } = planetGenerationTerrainDrawerVar();
  const { rings } = planetGenerationRingDrawerVar();

  return {
    id,
    celestial_id: celestialId,
    radius,
    name,
    owner_id: ownerId,
    rings: {
      data: rings.map((ring) => mapFromRingConfigToRingInsertInput(ring)),
    },
    terrain_bias: terrainBias,
    terrain_hex_palette_id: currentPaletteId,
    texture_resolution: textureResolution,
    atmospheric_distance: atmosphericDistance,
  };
};
