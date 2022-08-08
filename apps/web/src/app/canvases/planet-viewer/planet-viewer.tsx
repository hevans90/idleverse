import { useQuery, useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { PlanetByIdDocument, PlanetByIdQuery } from '@idleverse/galaxy-gql';
import { hexStringToNumber, hexToRGB, rgb } from '@idleverse/theme';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataTexture } from 'three';
import { Loading } from '../../components/loading';
import { planetVar } from '../../_state/planet-viewer';
import { CameraController } from '../planet-generator/camera-controller';
import { Pixelate } from '../planet-generator/pixelate';

import { colors } from '@idleverse/theme';
import { colorsVar } from '../../_state/colors';
import { runTextureGenOnWorker } from '../planet-generator/texture-generation/run-texture-gen-on-worker';
import { World } from '../planet-generator/world';
import { useResize } from '../_utils/use-resize.hook';

export const PlanetViewer = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<PlanetByIdQuery>(PlanetByIdDocument, {
    variables: { id },
  });

  const { width, height } = useResize();

  const { primary } = useReactiveVar(colorsVar);

  const [worldDataTexture, setWorldDataTexture] =
    useState<DataTexture>(undefined);

  const [ringDataTextures, setRingDataTextures] = useState<{
    [ringId: string]: DataTexture;
  }>(undefined);

  const [worldTextureGenerating, setWorldTextureGenerating] =
    useState<boolean>(false);
  const [ringTexturesGenerating, setRingTexturesGenerating] =
    useState<boolean>(false);

  useEffect(() => {
    if (!loading && data) {
      planetVar(data.planet_by_pk);
    }
  }, [loading, data]);

  useEffect(() => {
    if (data) {
      const {
        id: seed,
        terrain_bias,
        texture_resolution,
        terrain_hex_palette: { water, sand, grass, forest },
        rings,
      } = data.planet_by_pk;

      setWorldTextureGenerating(true);

      console.log(
        `%cTEXTURE gen running for PLANET (perlin)`,
        'background: #222; color: #F96444'
      );
      runTextureGenOnWorker(
        'perlin',
        texture_resolution,
        [hexToRGB(water), hexToRGB(sand), hexToRGB(grass), hexToRGB(forest)],
        terrain_bias as [number, number, number, number],
        seed
      ).then((texture) => {
        setWorldDataTexture(texture);
        setWorldTextureGenerating(false);
      });

      rings.forEach(
        ({ type, resolution, colors, terrain_bias, id: ring_seed }, index) => {
          setRingTexturesGenerating(true);
          runTextureGenOnWorker(
            type === 'rocky'
              ? 'perlin'
              : type === 'banded'
              ? 'banded'
              : 'simplex',
            resolution,
            (colors as string[]).map((hex) => hexToRGB(hex)) as [
              rgb,
              rgb,
              rgb,
              rgb
            ],
            terrain_bias as [number, number, number, number],
            ring_seed
          ).then((texture) => {
            setRingDataTextures((prev) => ({ ...prev, [id]: texture }));
            if (index === rings.length - 1) {
              setRingTexturesGenerating(false);
            }
          });
        }
      );
    }
  }, [data]);

  if (loading) {
    return (
      <Loading width="100%" height="100%" text="Loading Planet data"></Loading>
    );
  }
  if (worldTextureGenerating) {
    return (
      <Loading
        width="100%"
        height="100%"
        text="Generating planetary surface"
      ></Loading>
    );
  }
  if (ringTexturesGenerating) {
    return (
      <Loading
        width="100%"
        height="100%"
        text="Generating planetary rings"
      ></Loading>
    );
  }

  if (data) {
    const { radius, atmospheric_distance, rings } = data.planet_by_pk;

    return (
      <Box position="relative" width={width} height={height}>
        <Canvas>
          <Suspense fallback={null}>
            <World
              planetRadius={radius}
              worldTexture={worldDataTexture}
              ringTextures={ringDataTextures}
              atmosphere={true}
              rotate={true}
              atmosphericDistance={atmospheric_distance}
              rings={rings.map(
                ({
                  terrain_bias,
                  inner_radius,
                  outer_radius,
                  type,
                  rotation,
                  colors,
                  ...rest
                }) => ({
                  ...rest,
                  colors: colors.map((hex) => hexToRGB(hex)) as [
                    rgb,
                    rgb,
                    rgb,
                    rgb
                  ],
                  rotation: rotation as [x: number, y: number, z: number],
                  terrainBias: terrain_bias as [number, number, number, number],
                  innerRadius: inner_radius,
                  outerRadius: outer_radius,
                  type: type as 'banded' | 'rocky',
                })
              )}
            />
            <CameraController />
            <Pixelate
              bgColor={hexStringToNumber(colors[primary]['800'])}
              pixelSize={5}
            />
          </Suspense>
        </Canvas>
      </Box>
    );
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no planet here.
      </Box>
    );
  }
};
