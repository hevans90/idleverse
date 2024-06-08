import { rgb } from '@idleverse/models';
import { hexStringToNumber, hexToRGB, useUiBackground } from '@idleverse/theme';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { PlanetByIdQuery } from '@idleverse/galaxy-gql';
import { Suspense, useEffect, useState } from 'react';
import { DataTexture } from 'three';
import { Loading } from '../../components/loading';
import { CameraController } from '../planet-generator/camera-controller';
import { Pixelate } from '../planet-generator/pixelate';
import { Stars } from '../planet-generator/stars';
import { runTextureGenOnWorker } from '../planet-generator/texture-generation/run-texture-gen-on-worker';
import { World } from '../planet-generator/world';

type PlanetData = Pick<
  PlanetByIdQuery['planet_by_pk'],
  | 'atmospheric_distance'
  | 'terrain_bias'
  | 'terrain_hex_palette'
  | 'texture_resolution'
  | 'id'
  | 'rings'
  | 'radius'
>;

export const Planet = ({
  data,
  stars = true,
}: {
  data: PlanetData;
  stars?: boolean;
}) => {
  const { rawBgDarker } = useUiBackground();

  const [worldDataTexture, setWorldDataTexture] =
    useState<DataTexture>(undefined);

  const [ringDataTextures, setRingDataTextures] = useState<{
    [ringId: string]: DataTexture;
  }>(undefined);

  useEffect(() => {
    if (data) {
      const {
        id: seed,
        terrain_bias,
        texture_resolution,
        terrain_hex_palette: { water, sand, grass, forest },
        rings,
      } = data;

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
      });

      rings.forEach(
        ({ type, resolution, colors, terrain_bias, id: ring_seed }, index) => {
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
            setRingDataTextures((prev) => ({
              ...prev,
              [ring_seed]: texture,
            }));
          });
        }
      );
    }
  }, [data]);

  return (
    <Suspense
      fallback={<Loading width="100%" height="100%" text="Rendering planet" />}
    >
      <Canvas
        gl={{ antialias: true }}
        camera={{
          position: [0, 0, 10] as [number, number, number],
          fov: 50,
        }}
      >
        {stars && <Stars rotationSpeed={0.1} />}

        <World
          planetRadius={data.radius}
          worldTexture={worldDataTexture}
          ringTextures={ringDataTextures}
          atmosphere={true}
          rotate={true}
          atmosphericDistance={data.atmospheric_distance}
          rings={data.rings.map(
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
        <Pixelate bgColor={hexStringToNumber(rawBgDarker)} pixelSize={4} />
        <OrbitControls
          minPolarAngle={Math.PI / 16}
          maxPolarAngle={Math.PI - Math.PI / 16}
          minDistance={5}
          maxDistance={100}
        />
      </Canvas>
    </Suspense>
  );
};
