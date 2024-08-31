import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import {
  PlanetAppearanceConfig,
  PlanetGenerationConfig,
} from '@idleverse/models';
import {
  celestialViewerPlanetsVar,
  celestialViewerSelectedPlanetVar,
  colorPalettesVar,
  planetGenerationColorDrawerVar,
  planetGeneratorConfigVar,
  selfVar,
} from '@idleverse/state';
import { isEqual } from 'lodash';
import { generatePlanetInsertionVars } from '../../planet-generator/generate-planet-input-vars';

/**
 * When creating or updating planets, call this function and it will do all the hard work.
 */
export const runPlanetDiffLogic = ({
  planet,
  mode,
}: {
  planet: PlanetByIdQuery['planet_by_pk'];
  mode: 'new' | 'edit';
}) => {
  const currentConfig = planetGeneratorConfigVar();
  const { id: userId } = selfVar();
  const { panelOpen, ...appearance } = planetGenerationColorDrawerVar();
  const selectedPlanet = celestialViewerSelectedPlanetVar();
  const palettes = colorPalettesVar();

  const { celestial_id, rings, terrain_hex_palette_id, ...newCreationInput } =
    generatePlanetInsertionVars('', userId);

  const editedIndex = celestialViewerPlanetsVar().findIndex(
    ({ id }) => id === currentConfig.seed
  );

  if (mode === 'new') {
    createPlanet({ appearance, config: currentConfig, userId });
  }

  if (mode === 'edit' && editedIndex !== undefined && editedIndex >= 0) {
    // before
    const { celestial, ...planetBeforeEditing } =
      celestialViewerPlanetsVar()[editedIndex];

    // after
    const planetAfterEditing = {
      ...newCreationInput,
      rings: rings.data,
      terrain_hex_palette: palettes.find(
        ({ id }) => id === terrain_hex_palette_id
      ),
    };

    const same = isEqual(planetAfterEditing, planetBeforeEditing);

    if (!same) {
      updatePlanet({
        editedIndex,
        appearance,
        config: currentConfig,
      });
      if (selectedPlanet) {
        // update the name for our global selected planet var
        celestialViewerSelectedPlanetVar({
          name: currentConfig.name,
          id: currentConfig.seed,
        });
      }
    }
  }
};

export const updatePlanet = ({
  editedIndex,
  appearance,
  config,
}: {
  editedIndex: number;
  appearance: PlanetAppearanceConfig;
  config: PlanetGenerationConfig;
}) => {
  celestialViewerPlanetsVar(
    celestialViewerPlanetsVar().map((element, index) =>
      index === editedIndex
        ? {
            ...element,
            name: config.name,
            orbital_radius: config.orbitalRadius,
            radius: config.radius,
            atmospheric_distance: config.atmosphericDistance,
            terrain_bias: appearance.terrainBias,
            terrain_hex_palette: colorPalettesVar().find(
              ({ name }) => name === appearance.palettePresetName
            ),
            texture_resolution: config.textureResolution,

            // add more props here to change 2D renders
          }
        : element
    )
  );
  celestialViewerSelectedPlanetVar({
    name: config.name,
    id: config.seed,
  });
};

export const createPlanet = ({
  appearance,
  config,
  userId,
}: {
  appearance: PlanetAppearanceConfig;
  config: PlanetGenerationConfig;
  userId: string;
}) => {
  celestialViewerPlanetsVar([
    ...celestialViewerPlanetsVar(),
    {
      id: config.seed,
      owner_id: userId,
      name: config.name,
      orbital_radius: config.orbitalRadius,
      radius: config.radius,
      atmospheric_distance: config.atmosphericDistance,
      terrain_bias: appearance.terrainBias,
      terrain_hex_palette: colorPalettesVar().find(
        ({ name }) => name === appearance.palettePresetName
      ),
      texture_resolution: config.textureResolution,
      rings: [],
      celestial: null,
    },
  ]);
  celestialViewerSelectedPlanetVar({
    name: config.name,
    id: config.seed,
  });
};
