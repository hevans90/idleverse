import { useQuery, useReactiveVar } from '@apollo/client';
import { Box, Theme, useTheme } from '@chakra-ui/react';
import {
  TerrainHexPalettesDocument,
  TerrainHexPalettesQuery,
} from '@idleverse/galaxy-gql';
import { hexStringToNumber } from '@idleverse/theme';
import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { DataTexture } from 'three';
import { Loading } from '../../components/loading';
import { RingConfig } from '../../_state/models';
import {
  planetGenerationColorDrawerVar,
  planetGenerationRingDrawerVar,
  planetGenerationTerrainDrawerVar,
  planetGeneratorConfigVar,
} from '../../_state/planet-generation';

import { useResize } from '../_utils/use-resize.hook';
import { CameraController } from './camera-controller';
import { Pixelate } from './pixelate';
import { runTextureGenOnWorker } from './texture-generation/run-texture-gen-on-worker';
import { PlanetGeneratorBooleans } from './ui/booleans';
import { PlanetGeneratorColorDrawer } from './ui/color-drawer';
import { PlanetGeneratorRingDrawer } from './ui/ring-drawer';
import {
  planetGenerationControlsHeight,
  PlanetGeneratorSliders,
} from './ui/sliders';
import { PlanetGeneratorTerrainDrawer } from './ui/terrain-drawer';
import { World } from './world';
import { deepCompareRings } from './_utils/deep-compare-rings';

export const PlanetGenerator = ({
  customSize,
}: {
  customSize?: { width: number; height: number };
}) => {
  const { data: colorPalettes, loading: colorPalettesLoading } =
    useQuery<TerrainHexPalettesQuery>(TerrainHexPalettesDocument);

  const { width, height } = useResize('planet-gen');

  const containerRef = useRef<HTMLDivElement>();

  const { colors } = useTheme<Theme>();

  const {
    ui,
    seed,
    pixelSize,
    atmosphere,
    rotate,
    atmosphericDistance,
    textureResolution,
    radius,
  } = useReactiveVar(planetGeneratorConfigVar);

  const {
    currentPalette: { water, sand, grass, forest },
  } = useReactiveVar(planetGenerationColorDrawerVar);

  const { terrainBias } = useReactiveVar(planetGenerationTerrainDrawerVar);
  const { rings } = useReactiveVar(planetGenerationRingDrawerVar);

  const prevRingsRef = useRef<RingConfig[]>([]);

  const [worldDataTexture, setWorldDataTexture] =
    useState<DataTexture>(undefined);

  const [ringDataTextures, setRingDataTextures] = useState<{
    [ringId: string]: DataTexture;
  }>(undefined);

  useEffect(() => {
    console.log(
      `%cTEXTURE gen running for PLANET (perlin)`,
      'background: #222; color: #F96444'
    );
    runTextureGenOnWorker(
      'perlin',
      textureResolution,
      [water, sand, grass, forest],
      terrainBias,
      seed
    ).then((texture) => setWorldDataTexture(texture));
  }, [textureResolution, water, sand, grass, forest, terrainBias, seed]);

  useEffect(() => {
    const { updates, additions, deletions } = deepCompareRings(
      [...prevRingsRef.current],
      [...rings]
    );

    // processing deletions first makes more sense
    deletions.forEach((id) => delete ringDataTextures[id]);

    const updatesToRegen = updates
      .filter(({ regenTexture }) => regenTexture === true)
      .map(({ config }) => config);

    [...updatesToRegen, ...additions].forEach(
      ({ type, id, resolution, colors: ringColors, terrainBias }) => {
        runTextureGenOnWorker(
          type === 'rocky'
            ? 'perlin'
            : type === 'banded'
            ? 'banded'
            : 'simplex',
          resolution,
          ringColors,
          terrainBias,
          id
        ).then((texture) =>
          setRingDataTextures((prev) => ({ ...prev, [id]: texture }))
        );
      }
    );

    prevRingsRef.current = [...rings];
  }, [JSON.stringify(rings)]);

  if (colorPalettesLoading)
    return <Loading text="Loading Color Palettes"></Loading>;

  return (
    <>
      <Box
        ref={containerRef}
        position="relative"
        width={`${customSize?.width || width}px`}
        height={
          ui
            ? `${customSize?.height || height}px`
            : `${
                (customSize?.height || height) + planetGenerationControlsHeight
              }`
        }
      >
        <Canvas>
          <Suspense fallback={null}>
            <World
              planetRadius={radius}
              worldTexture={worldDataTexture}
              ringTextures={ringDataTextures}
              atmosphere={atmosphere}
              rotate={rotate}
              atmosphericDistance={atmosphericDistance}
              rings={rings}
            />
            <CameraController />
            <Pixelate
              bgColor={hexStringToNumber(colors.gray['800'])}
              pixelSize={pixelSize}
            />
          </Suspense>
          <Stats className="planet-gen-stats" parent={containerRef} />
        </Canvas>
      </Box>

      <PlanetGeneratorBooleans />

      {ui && (
        <>
          <PlanetGeneratorColorDrawer paletteData={colorPalettes} />

          <PlanetGeneratorTerrainDrawer />
          <PlanetGeneratorRingDrawer />
          <PlanetGeneratorSliders />
        </>
      )}
    </>
  );
};
