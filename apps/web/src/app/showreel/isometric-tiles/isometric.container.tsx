import { useQuery, useReactiveVar } from '@apollo/client';
import {
  TerrainHexPalettesDocument,
  TerrainHexPalettesQuery,
} from '@idleverse/galaxy-gql';
import { colors, hexStringToNumber, hexToRGB } from '@idleverse/theme';
import * as PIXI from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { colorsVar } from '../../_state/colors';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { runPixelDataGenOnWorker } from '../../canvases/planet-generator/texture-generation/run-texture-gen-on-worker';
import { Loading } from '../../components/loading';

import { planetSurfaceVar } from '../../_state/planet-surface';
import { IsometricTiles } from './isometric-tiles';

export const IsometricContainer = () => {
  const { primary, secondary } = useReactiveVar(colorsVar);

  const initialisingRef = useRef<boolean>(false);
  const [assetsLoading, setAssetsLoading] = useState<boolean>(true);
  const [mapGenerating, setMapGenerating] = useState<boolean>(true);

  const { data: colorPalettes, loading: colorPalettesLoading } =
    useQuery<TerrainHexPalettesQuery>(TerrainHexPalettesDocument);

  useEffect(() => {
    if (initialisingRef.current === false) {
      initialisingRef.current = true;
      PIXI.Assets.load('isometric-tiles/dirt_tile.png').then((collection) => {
        setAssetsLoading(false);
        initialisingRef.current = false;
      });
    }
  }, []);

  useEffect(() => {
    if (!assetsLoading && colorPalettes && !colorPalettesLoading) {
      const { water, sand, grass, forest } =
        colorPalettes.terrain_hex_palette[0];

      const resolution = 256;

      runPixelDataGenOnWorker(
        'perlin',
        resolution,
        [hexToRGB(water), hexToRGB(sand), hexToRGB(grass), hexToRGB(forest)],
        [0, 0.1, 0.3, 0.5],
        uuidv4()
      ).then((pixelData) => {
        const baseTexture = new PIXI.BaseTexture(
          new PIXI.BufferResource(pixelData.data, {
            width: resolution,
            height: resolution,
          })
        );

        planetSurfaceVar({
          palette: {
            water: hexToRGB(water),
            sand: hexToRGB(sand),
            grass: hexToRGB(grass),
            forest: hexToRGB(forest),
          },
          pixelData,
          baseTexture,
        });
        setMapGenerating(false);
      });
    }
  }, [assetsLoading, colorPalettes, colorPalettesLoading]);

  if (assetsLoading) {
    return <Loading text="Loading assets"></Loading>;
  }

  if (!assetsLoading && colorPalettesLoading) {
    return <Loading text="Loading color palettes"></Loading>;
  }

  if (!assetsLoading && !colorPalettesLoading && mapGenerating) {
    return <Loading text="Generating map"></Loading>;
  }

  if (!assetsLoading && !colorPalettesLoading && !mapGenerating) {
    return (
      <PixiWrapper>
        <IsometricTiles
          colors={{
            tileColor: `${hexStringToNumber(colors[primary]['300'])}`,
            hoverColor: `${hexStringToNumber(colors[secondary]['600'])}`,
            selectedColor: `${hexStringToNumber(colors[primary]['600'])}`,
          }}
        />
      </PixiWrapper>
    );
  }
};
