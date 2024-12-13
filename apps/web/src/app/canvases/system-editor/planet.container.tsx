import { useReactiveVar } from '@apollo/client';
import {
  celestialViewerPlanetsVar,
  celestialViewerSelectedPlanetVar,
  planetGeneratorConfigVar,
  systemEditorNewPlanetVar,
  systemEditorOrbitalEditInProgressVar,
} from '@idleverse/state';
import { hexStringToNumber, hexToRGB, useUiBackground } from '@idleverse/theme';
import { useApp } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Assets, Graphics, Texture } from 'pixi.js';
import { useEffect, useState } from 'react';
import { Planet, PlanetConfig } from '../celestial-viewer/models';
import { useGenerateDataUris } from '../celestial-viewer/use-generate-data-uris';
import {
  build2DPlanet,
  createPlanet,
} from '../celestial-viewer/utils/drawing-utils';
import { createRadialEllipse } from '../celestial-viewer/utils/graphics-utils';
import { runPixelDataGenOnWorker } from '../planet-generator/texture-generation/run-texture-gen-on-worker';
import { OrbitalDash } from './editing/orbital-dash';
import { Planets } from './planets';

export const PlanetContainer = ({
  canvasRef,
  viewportRef,
  center,
}: {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  viewportRef: React.MutableRefObject<Viewport>;
  center: { x: number; y: number };
}) => {
  const app = useApp();

  const { rawBorder } = useUiBackground();

  const [texturesGenerating, setTexturesGenerating] = useState(true);

  const creatingNewPlanet = useReactiveVar(systemEditorNewPlanetVar);
  const orbitalEditInProgress = useReactiveVar(
    systemEditorOrbitalEditInProgressVar
  );

  const { orbitalRadius } = useReactiveVar(planetGeneratorConfigVar);

  const planets = useReactiveVar(celestialViewerPlanetsVar);

  const [localOrbitalEllipses, setLocalOrbitalEllipses] = useState<Graphics[]>(
    []
  );
  const [localPlanets, setLocalPlanets] = useState<Planet[]>([]);

  const [pixelData, setPixelData] = useState<
    {
      seed: string;
      data: Uint8Array;
      width: number;
      height: number;
    }[]
  >(null);

  // generate pixel data for each planet
  useEffect(() => {
    const pixelDataToGenerate: Promise<{
      seed: string;
      data: Uint8Array;
      width: number;
      height: number;
    }>[] = [];
    planets.forEach(
      ({
        id,
        texture_resolution: textureResolution,
        terrain_hex_palette: { water, sand, grass, forest },
        terrain_bias,
      }) =>
        pixelDataToGenerate.push(
          runPixelDataGenOnWorker(
            'perlin',
            textureResolution,
            [
              hexToRGB(water),
              hexToRGB(sand),
              hexToRGB(grass),
              hexToRGB(forest),
            ],
            terrain_bias as [number, number, number, number],
            id
          )
        )
    );

    Promise.all(pixelDataToGenerate).then((values) => {
      setPixelData(values);
    });
  }, [JSON.stringify(planets)]);

  const onDataURIGenerationfinished = async (data: {
    celestialId: string;
    uris: {
      seed: string;
      uri: string;
    }[];
  }) => {
    const orbitalEllipses: Graphics[] = [];
    const tempPlanets: Planet[] = [];
    setTexturesGenerating(false);

    const textures: { [planetName: string]: Texture } = {};

    for (let i = 0; i < planets.length; i++) {
      const planet = planets[i];
      const dataUri = data.uris.find(({ seed }) => seed === planet.id).uri;
      if (dataUri) {
        textures[planet.name] = await Assets.load(dataUri);
      }
    }

    const celestialConfig: PlanetConfig = {
      id: 'celestial',
      radius: 100,
      origin: center,
      orbit: { x: 0, y: 0, speed: 0 },
    };
    const sun: Planet = createPlanet({
      name: 'celestial',
      config: celestialConfig,
    });

    planets.forEach(
      ({ id, name, radius, orbital_radius, texture_resolution }) =>
        tempPlanets.push(
          build2DPlanet({
            planetTexture: textures[name],
            radius,
            app,
            name,
            id,
            selectionFunction: () => {
              celestialViewerSelectedPlanetVar({
                name,
                id,
              });
            },
            sun,
            orbitalRadius: orbital_radius,
            textureResolution: texture_resolution,
          })
        )
    );

    tempPlanets
      // all planets that have a parent i.e. not the central star, or other freely floating objects
      .filter((planet) => planet?.parent)
      .forEach(
        ({
          parent: {
            config: { origin },
          },
          config: { orbit },
        }) => {
          const radialEllipse = createRadialEllipse({
            thickness: 5,
            x: origin.x,
            y: origin.y,
            width: orbit.x,
            height: orbit.y,
            color: hexStringToNumber(rawBorder),
          });

          orbitalEllipses.push(radialEllipse);
        }
      );

    setLocalPlanets(tempPlanets);
    setLocalOrbitalEllipses(orbitalEllipses);
  };

  useGenerateDataUris({
    canvasRef,
    celestialId: 'showreel-celestial',
    input: pixelData,
    onGenerationFinished: onDataURIGenerationfinished,
  });

  return (
    <>
      {creatingNewPlanet || orbitalEditInProgress ? (
        <OrbitalDash center={center} radius={orbitalRadius} />
      ) : null}
      {localPlanets.length ? (
        <Planets
          planets={localPlanets}
          orbitalEllipses={localOrbitalEllipses}
          viewportRef={viewportRef}
        />
      ) : null}
    </>
  );
};
