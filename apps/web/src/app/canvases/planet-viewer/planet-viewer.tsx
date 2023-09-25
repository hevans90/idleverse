import { useQuery, useReactiveVar } from '@apollo/client';
import { Box, Flex } from '@chakra-ui/react';
import { PlanetByIdDocument, PlanetByIdQuery } from '@idleverse/galaxy-gql';
import { hexStringToNumber, hexToRGB } from '@idleverse/theme';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataTexture } from 'three';

import { Loading } from '../../components/loading';
import { CameraController } from '../planet-generator/camera-controller';
import { Pixelate } from '../planet-generator/pixelate';

import {
  colorsVar,
  galacticEmpireVar,
  myEmpireVar,
  planetVar,
} from '@idleverse/state';
import { colors } from '@idleverse/theme';

import { rgb } from '@idleverse/models';
import { GameUI } from '../../game-ui/game-ui';
import { useEmpire } from '../../hooks/use-my-empire';
import { useResize } from '../_utils/use-resize.hook';
import { Stars } from '../planet-generator/stars';
import { runTextureGenOnWorker } from '../planet-generator/texture-generation/run-texture-gen-on-worker';
import { World } from '../planet-generator/world';
import { PlanetActions } from './ui/planet-actions';
import { PlanetUI } from './ui/planet-ui';

export const PlanetViewer = () => {
  const [planetActionsActive, setPlanetActionsActive] = useState(false);
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<PlanetByIdQuery>(PlanetByIdDocument, {
    variables: { id },
  });

  useEffect(() => {
    const tid = setTimeout(() => setPlanetActionsActive(true), 200);
    return () => clearTimeout(tid);
  }, []);

  const { width, height } = useResize();

  const { primary } = useReactiveVar(colorsVar);

  const myEmpire = useReactiveVar(myEmpireVar);
  const galacticEmpire = useReactiveVar(galacticEmpireVar);

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

  useEmpire(data?.planet_by_pk?.celestial?.galactic_empire);

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
  }, [data, id]);

  if (loading) {
    return (
      <Loading width="100%" height="100%" text="Loading Planet data"></Loading>
    );
  }
  if (worldTextureGenerating) {
    return (
      <Loading width="100%" height="100%" text="Generating planetary surface" />
    );
  }
  if (ringTexturesGenerating) {
    return (
      <Loading width="100%" height="100%" text="Generating planetary rings" />
    );
  }

  if (data) {
    const { radius, atmospheric_distance, rings } = data.planet_by_pk;

    return (
      <Box position="relative" width={width} height={height}>
        <Suspense
          fallback={
            <Loading width="100%" height="100%" text="Rendering planet" />
          }
        >
          <Flex h="full" flexDir="column">
            <Box flexGrow="2" minW="0">
              <Canvas
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                gl={{ antialias: true }}
                camera={{
                  position: [0, 0, 10] as [number, number, number],
                  fov: 50,
                }}
              >
                <color attach="background" args={[0, 0, 0]} />
                <Stars
                  radius={40}
                  starCount={0.5}
                  starBrightness={0.2}
                  rotationSpeed={0.001}
                  colorVariation={1}
                />
                <Stars
                  radius={8}
                  starCount={0.1}
                  starBrightness={0.5}
                  rotationSpeed={0.005}
                  colorVariation={0.5}
                />

                <Stars rotationSpeed={0.1} />
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
                      terrainBias: terrain_bias as [
                        number,
                        number,
                        number,
                        number
                      ],
                      innerRadius: inner_radius,
                      outerRadius: outer_radius,
                      type: type as 'banded' | 'rocky',
                    })
                  )}
                />
                <CameraController />
                <Pixelate
                  bgColor={hexStringToNumber(colors[primary]['800'])}
                  pixelSize={4}
                />
              </Canvas>

              {myEmpire && (
                <>
                  <PlanetUI />
                  <GameUI empireId={galacticEmpire?.id} />
                </>
              )}
            </Box>

            <PlanetActions active={planetActionsActive} />
          </Flex>
        </Suspense>
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
