import { useReactiveVar } from '@apollo/client';
import { randomGoldilocksRadii } from '@idleverse/galaxy-gen';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import { RingConfig, RingKey, rgb } from '@idleverse/models';
import {
  celestialViewerGenerationVar,
  celestialViewerPlanetsVar,
  celestialViewerSelectedPlanetVar,
  colorPalettesVar,
  planetGenerationColorDrawerVar,
  planetGenerationRingDrawerVar,
  planetGeneratorConfigVar,
  selfVar,
  systemEditorNewPlanetVar,
} from '@idleverse/state';
import { hexToRGB } from '@idleverse/theme';
import { useEffect } from 'react';
import { generateNewPlanet } from '../../planet-generator/generate-planet-input-vars';

export const useEditablePlanets = () => {
  const { mode, formingPoints } = useReactiveVar(celestialViewerGenerationVar);

  const { id: userId } = useReactiveVar(selfVar);
  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanetVar);
  const palettes = useReactiveVar(colorPalettesVar);

  const planets = useReactiveVar(celestialViewerPlanetsVar);

  const creatingNewPlanet = useReactiveVar(systemEditorNewPlanetVar);

  useEffect(() => {
    if (!celestialViewerPlanetsVar().length) {
      celestialViewerPlanetsVar([
        {
          celestial: null,
          orbital_radius: randomGoldilocksRadii(),
          owner_id: userId,
          atmospheric_distance: 1,
          rings: [],
          texture_resolution: 128,
          name: 'terran',
          id: 'showreel-planet',
          radius: 1,
          terrain_bias: [0, 0.65, 0.73, 0.82],
          terrain_hex_palette: palettes?.[0],
        },
        {
          celestial: null,
          orbital_radius: randomGoldilocksRadii(),
          owner_id: userId,
          atmospheric_distance: 1,
          rings: [],
          texture_resolution: 256,
          name: 'desert',
          id: 'showreel-planet2',
          radius: 0.5,
          terrain_bias: [0, 0.5, 0.62, 0.9],
          terrain_hex_palette: palettes?.[1],
        },
      ]);
    }
  }, []);

  /**
   * Update all our global reactive vars when a change is made to a planet
   */
  // useEffect(() => {
  //   // find our planet
  //   const currentConfig = planetGeneratorConfigVar();

  //   const editedPlanetIndex = planets.findIndex(
  //     ({ id }) => id === currentConfig.seed
  //   );

  //   if (editedPlanetIndex !== undefined && editedPlanetIndex >= 0) {
  //     const {
  //       celestial_id,
  //       rings,
  //       terrain_hex_palette_id,
  //       ...newCreationInput
  //     } = generatePlanetInsertionVars('', userId);

  //     const planetAfterEditing = {
  //       ...newCreationInput,
  //       rings: rings.data,
  //       terrain_hex_palette: palettes.find(
  //         ({ id }) => id === terrain_hex_palette_id
  //       ),
  //     };

  //     const { celestial, ...planetBeforeEditing } = planets[editedPlanetIndex];

  //     const same = isEqual(planetAfterEditing, planetBeforeEditing);

  //     if (!same) {
  //       celestialViewerPlanetsVar(
  //         planets.map((element, index) =>
  //           index === editedPlanetIndex
  //             ? {
  //                 ...element,
  //                 name: currentConfig.name,
  //                 // add other props here to change 2D renders
  //               }
  //             : element
  //         )
  //       );
  //       if (selectedPlanet) {
  //         celestialViewerSelectedPlanetVar({
  //           name: currentConfig.name,
  //           id: currentConfig.seed,
  //         });
  //       }
  //     }
  //   }
  // }, [userId, planets, palettes, selectedPlanet]);

  /**
   * Set the vars to power our 3D planet renderer
   */
  useEffect(() => {
    if (selectedPlanet) {
      const planet = planets.find(({ id }) => id === selectedPlanet.id);
      if (planet) {
        update3DPlanetRenderer(planet);
      }
    }

    if (creatingNewPlanet) {
      const {
        celestial_id,
        rings,
        terrain_hex_palette_id,
        ...newCreationInput
      } = generateNewPlanet();

      const newPlanet = {
        celestial: null,
        ...newCreationInput,
        rings: rings.data,
        terrain_hex_palette: palettes.find(
          ({ id }) => id === terrain_hex_palette_id
        ),
      };

      update3DPlanetRenderer(newPlanet as PlanetByIdQuery['planet_by_pk']);
    }
  }, [selectedPlanet, planets, creatingNewPlanet, palettes, userId]);
};

const update3DPlanetRenderer = (planet: PlanetByIdQuery['planet_by_pk']) => {
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
