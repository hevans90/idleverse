import { useReactiveVar } from '@apollo/client';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import {
  celestialViewerPlanetsVar,
  celestialViewerSelectedPlanetVar,
  colorPalettesVar,
  selfVar,
  systemEditorConfigVar,
  systemEditorNewPlanetVar,
} from '@idleverse/state';

import { useEffect } from 'react';
import { generateNewPlanet } from '../../planet-generator/generate-planet-input-vars';
import { update3DPlanetRenderer } from '../_utils/3d-rendering-updates';

export const useEditablePlanets = () => {
  const { mode, formingPoints } = useReactiveVar(systemEditorConfigVar);

  const { id: userId } = useReactiveVar(selfVar);
  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanetVar);
  const palettes = useReactiveVar(colorPalettesVar);

  const planets = useReactiveVar(celestialViewerPlanetsVar);

  const creatingNewPlanet = useReactiveVar(systemEditorNewPlanetVar);

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
