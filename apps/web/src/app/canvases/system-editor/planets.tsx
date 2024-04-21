import { useReactiveVar } from '@apollo/client';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import {
  celestialViewerPlanetDataUris,
  celestialViewerSelectedPlanet,
} from '@idleverse/state';
import { hexToRGB } from '@idleverse/theme';
import { useApp } from '@pixi/react';
import { Assets } from 'pixi.js';
import { useEffect, useState } from 'react';
import { loadPlanets } from '../../asset-loading/load-planets';
import { DataUriGenerator } from '../celestial-viewer/data-uri-generator';
import { Planet } from '../celestial-viewer/models';
import { buildPlanet } from '../celestial-viewer/utils/drawing-utils';
import { runPixelDataGenOnWorker } from '../planet-generator/texture-generation/run-texture-gen-on-worker';

export const Planets = ({
  celestialId,
  planets,
  canvasRef,
}: {
  celestialId?: string;
  planets: PlanetByIdQuery[];
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
}) => {
  const app = useApp();

  const [pixelDataGenerating, setPixelDataGenerating] = useState(true);
  const [texturesGenerating, setTexturesGenerating] = useState(true);
  const [celestialSpritesLoading, setCelestialSpritesLoading] = useState(true);

  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanet);

  const planetDataUris = useReactiveVar(celestialViewerPlanetDataUris);

  const [pixelData, setPixelData] = useState<
    {
      seed: string;
      data: Uint8Array;
      width: number;
      height: number;
    }[]
  >(null);

  useEffect(() => {
    loadPlanets().then(() => setCelestialSpritesLoading(false));
  }, []);

  // generate pixel data for each planet
  useEffect(() => {
    celestialViewerSelectedPlanet(null);

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
      setPixelDataGenerating(false);
    });
  }, [planets, selectedPlanet]);

  const onDataURIGenerationfinished = async (data: {
    celestialId: string;
    uris: {
      seed: string;
      uri: string;
    }[];
  }) => {
    const tempPlanets: Planet[] = [];
    setTexturesGenerating(false);

    const pixiAssetBundleKey = celestialId ?? 'editor';

    Assets.addBundle(
      pixiAssetBundleKey,
      planets.map(({ planet_by_pk: { id, name } }) => ({
        name,
        srcs: planetDataUris.uris.find(({ seed }) => seed === id).uri,
      }))
    );

    const bundle: { name: string }[] = await Assets.loadBundle(
      pixiAssetBundleKey
    );

    planets.forEach(({ planet_by_pk: { id, name, radius } }) =>
      tempPlanets.push(
        buildPlanet(bundle?.[name], radius, app, name, id, () => {
          celestialViewerSelectedPlanet({
            name,
            id,
          });
        })
      )
    );
  };

  if (!pixelDataGenerating && texturesGenerating) {
    return (
      <DataUriGenerator
        canvasRef={canvasRef}
        celestialId={celestialId ?? 'editor'}
        input={pixelData}
        onGenerationFinished={(data) => onDataURIGenerationfinished(data)}
      />
    );
  }
};
