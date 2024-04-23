import { useReactiveVar } from '@apollo/client';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import {
  celestialViewerPlanetDataUris,
  celestialViewerSelectedPlanet,
  planetGenerationColorDrawerVar,
} from '@idleverse/state';
import { hexToRGB } from '@idleverse/theme';
import { useApp } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Assets } from 'pixi.js';
import { useEffect, useState } from 'react';
import { Planet } from '../celestial-viewer/models';
import { useGenerateDataUris } from '../celestial-viewer/use-generate-data-uris';
import { buildPlanet } from '../celestial-viewer/utils/drawing-utils';
import { runPixelDataGenOnWorker } from '../planet-generator/texture-generation/run-texture-gen-on-worker';
import { Planets } from './planets';

export const PlanetContainer = ({
  canvasRef,
  viewportRef,
}: {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  viewportRef: React.MutableRefObject<Viewport>;
}) => {
  const app = useApp();

  const [texturesGenerating, setTexturesGenerating] = useState(true);

  const { currentHexPalette, terrainBias } = useReactiveVar(
    planetGenerationColorDrawerVar
  );

  const [planets, setPlanets] = useState<PlanetByIdQuery[]>([
    {
      planet_by_pk: {
        celestial: null,
        owner_id: '1',
        atmospheric_distance: 1,
        rings: [],
        texture_resolution: 1024,
        name: 'nice',
        id: 'showreel-planet',
        radius: 1,
        terrain_bias: terrainBias,
        terrain_hex_palette: {
          ...currentHexPalette,
          name: 'nice',
          id: '1',
        },
      },
    },
  ]);

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

    planets.forEach(({ planet_by_pk: { id, name, radius } }) =>
      tempPlanets.push(
        buildPlanet({
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
        })
      )
    );

    setLocalPlanets(tempPlanets);
  };

  useGenerateDataUris({
    canvasRef,
    celestialId: 'showreel-celestial',
    input: pixelData,
    onGenerationFinished: onDataURIGenerationfinished,
  });

  return localPlanets.length ? (
    <Planets planets={localPlanets} viewportRef={viewportRef} />
  ) : null;
};
