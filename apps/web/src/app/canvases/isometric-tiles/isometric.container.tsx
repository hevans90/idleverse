import { useQuery } from '@apollo/client';
import { Box, Theme, useTheme } from '@chakra-ui/react';
import {
  TerrainHexPalettesDocument,
  TerrainHexPalettesQuery,
} from '@idleverse/galaxy-gql';
import { hexStringToNumber, hexToRGB } from '@idleverse/theme';
import { Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { assetLoader } from '../../asset-loading/asset-loader';
import { Loading } from '../../components/loading';
import { AssetCollection } from '../../_state/models';
import { planetSurfaceVar } from '../../_state/planet-surface';
import { runPixelDataGenOnWorker } from '../planet-generator/texture-generation/run-texture-gen-on-worker';
import { useResize } from '../_utils/use-resize.hook';
import { IsometricTiles } from './isometric-tiles';

export const IsometricContainer = () => {
  const size = useResize();
  const { colors } = useTheme<Theme>();

  const [assetsLoading, setAssetsLoading] = useState<boolean>(true);
  const [mapGenerating, setMapGenerating] = useState<boolean>(true);

  const [assetCollection, setAssetCollection] = useState<AssetCollection>();

  const { data: colorPalettes, loading: colorPalettesLoading } =
    useQuery<TerrainHexPalettesQuery>(TerrainHexPalettesDocument);

  useEffect(() => {
    assetLoader([{ name: 'dirt', url: 'isometric-tiles/dirt_tile.png' }]).then(
      (collection) => {
        setAssetCollection(collection);
        setAssetsLoading(false);
      }
    );
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

  if (
    !assetsLoading &&
    !colorPalettesLoading &&
    !mapGenerating &&
    assetCollection
  ) {
    return (
      <Box position="relative">
        <Stage
          {...size}
          options={{
            backgroundColor: hexStringToNumber(colors.gray['800']),
            antialias: true,
          }}
        >
          <IsometricTiles
            assetCollection={assetCollection}
            colors={{
              tileColor: `${hexStringToNumber(colors.gray['300'])}`,
              hoverColor: `${hexStringToNumber(colors.teal['600'])}`,
              selectedColor: `${hexStringToNumber(colors.gray['600'])}`,
            }}
          />
        </Stage>
        {/* UI with absolute positioning */}
      </Box>
    );
  }
};
