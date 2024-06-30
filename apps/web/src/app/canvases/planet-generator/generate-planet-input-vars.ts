import { generateCelestialName } from '@idleverse/galaxy-gen';
import { PlanetCreationInput, RingInsertInput } from '@idleverse/galaxy-gql';
import { RingConfig } from '@idleverse/models';
import {
  colorPalettesVar,
  planetGenerationColorDrawerVar,
  planetGenerationPresets,
  planetGenerationRingDrawerVar,
  planetGeneratorConfigVar,
} from '@idleverse/state';
import { rgbToHex } from '@idleverse/theme';
import { v4 as uuidv4 } from 'uuid';

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

export const generateNewPlanet = (): PlanetCreationInput => {
  const { appearance, config, rings } = planetGenerationPresets[0];

  const colorPalettes = colorPalettesVar();

  const currentPalette = colorPalettes.find(
    ({ name }) => name === appearance.palettePresetName
  );

  return {
    id: uuidv4(),
    celestial_id: '',
    owner_id: '',
    radius: config.radius,
    name: generateCelestialName(),
    rings: {
      data: rings.map((ring) => mapFromRingConfigToRingInsertInput(ring)),
    },
    terrain_bias: appearance.terrainBias,
    terrain_hex_palette_id: currentPalette.id,
    texture_resolution: config.textureResolution,
    atmospheric_distance: config.atmosphericDistance,
    orbital_radius: config.orbitalRadius,
  };
};

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
