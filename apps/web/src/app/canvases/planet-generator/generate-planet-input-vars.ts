import { PlanetCreationInput, RingInsertInput } from '@idleverse/galaxy-gql';
import { RingConfig } from '@idleverse/models';
import {
  colorPalettesVar,
  planetGenerationColorDrawerVar,
  planetGenerationRingDrawerVar,
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
  celestialId?: string,
  ownerId?: string
): PlanetCreationInput => {
  const {
    seed: id,
    name,
    radius,
    atmosphericDistance,
    textureResolution,
    orbitalRadius,
  } = planetGeneratorConfigVar();

  const colorPalettes = colorPalettesVar();
  const { palettePresetName, terrainBias } = planetGenerationColorDrawerVar();

  const { rings } = planetGenerationRingDrawerVar();

  const currentPalette = colorPalettes.find(
    ({ name }) => name === palettePresetName
  );

  if (!currentPalette) {
    throw new Error(`Palette '${palettePresetName}' not found =(`);
  }

  return {
    id,
    celestial_id: celestialId ?? undefined,
    radius,
    name,
    owner_id: ownerId ?? undefined,
    rings: {
      data: rings.map((ring) => mapFromRingConfigToRingInsertInput(ring)),
    },
    terrain_bias: terrainBias,
    terrain_hex_palette_id: currentPalette.id,
    texture_resolution: textureResolution,
    atmospheric_distance: atmosphericDistance,
    orbital_radius: orbitalRadius,
  };
};
