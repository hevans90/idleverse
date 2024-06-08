import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import {
  celestialViewerPlanetDataUris,
  celestialViewerSelectedPlanet,
} from '@idleverse/state';
import { hexStringToNumber, hexToRGB, useUiBackground } from '@idleverse/theme';
import { useApp } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Assets, Graphics } from 'pixi.js';
import { useEffect, useState } from 'react';
import { Planet, PlanetConfig } from '../celestial-viewer/models';
import { useGenerateDataUris } from '../celestial-viewer/use-generate-data-uris';
import {
  build2DPlanet,
  createPlanet,
} from '../celestial-viewer/utils/drawing-utils';
import { createRadialEllipse } from '../celestial-viewer/utils/graphics-utils';
import { runPixelDataGenOnWorker } from '../planet-generator/texture-generation/run-texture-gen-on-worker';
import { Planets } from './planets';

export const PlanetContainer = ({
  canvasRef,
  viewportRef,
  center,
  planets,
}: {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  viewportRef: React.MutableRefObject<Viewport>;
  center: { x: number; y: number };
  planets: PlanetByIdQuery[];
}) => {
  const app = useApp();

  const { rawBorder } = useUiBackground();

  const [texturesGenerating, setTexturesGenerating] = useState(true);

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
        planet_by_pk: {
          id,
          texture_resolution: textureResolution,
          terrain_hex_palette: { water, sand, grass, forest },
          terrain_bias,
        },
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
  }, [planets]);

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

    const pixiAssetBundleKey = 'editor';

    Assets.addBundle(
      pixiAssetBundleKey,
      planets.map(({ planet_by_pk: { id, name } }) => ({
        name,
        srcs: celestialViewerPlanetDataUris().uris.find(
          ({ seed }) => seed === id
        ).uri,
      }))
    );

    const bundle: { name: string }[] = await Assets.loadBundle(
      pixiAssetBundleKey
    );

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

    planets.forEach(({ planet_by_pk: { id, name, radius, orbital_radius } }) =>
      tempPlanets.push(
        build2DPlanet({
          planetTexture: bundle?.[name],
          radius,
          app,
          name,
          id,
          selectionFunction: () => {
            celestialViewerSelectedPlanet({
              name,
              id,
            });
          },
          sun,
          orbitalRadius: orbital_radius,
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

  return localPlanets.length ? (
    <Planets
      planets={localPlanets}
      orbitalEllipses={localOrbitalEllipses}
      viewportRef={viewportRef}
    />
  ) : null;
};
