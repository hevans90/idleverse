import { useQuery, useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import {
  CelestialByNameDocument,
  CelestialByNameQuery,
  CelestialByNameQueryVariables,
} from '@idleverse/galaxy-gql';
import { hexToRGB } from '@idleverse/theme';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  celestialVar,
  celestialViewerSelectedPlanetVar,
} from '@idleverse/state';
import { loadPlanets } from '../../asset-loading/load-planets';
import { Loading } from '../../components/loading';
import { useEmpire } from '../../hooks/use-my-empire';
import { PixiWrapper } from '../_utils/pixi-wrapper';
import { runPixelDataGenOnWorker } from '../planet-generator/texture-generation/run-texture-gen-on-worker';
import { CelestialViewer } from './celestial-viewer';
import { DataUriGenerator } from './data-uri-generator';
import { InfoBox } from './ui/info-box';

export const CelestialViewerContainer = () => {
  const { name } = useParams<{ name: string }>();

  const dataURICanvasRef = useRef<HTMLCanvasElement>(null);

  const { data, loading } = useQuery<
    CelestialByNameQuery,
    CelestialByNameQueryVariables
  >(CelestialByNameDocument, {
    variables: { name },
  });

  const [pixelDataGenerating, setPixelDataGenerating] = useState(true);
  const [texturesGenerating, setTexturesGenerating] = useState(true);
  const [celestialSpritesLoading, setCelestialSpritesLoading] = useState(true);

  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanetVar);

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

  useEffect(() => {
    if (data?.celestial?.[0]) {
      celestialVar(data.celestial[0]);

      // if a previously selected planet isn't a part of this system, wipe it to avoid bugs
      if (
        selectedPlanet &&
        !data.celestial[0].planets.find(({ id }) => id === selectedPlanet.id)
      ) {
        celestialViewerSelectedPlanetVar(null);
      }

      const pixelDataToGenerate: Promise<{
        seed: string;
        data: Uint8Array;
        width: number;
        height: number;
      }>[] = [];
      data.celestial[0]?.planets.forEach(
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
        setPixelDataGenerating(false);
      });
    }
  }, [name, data, selectedPlanet]);

  useEmpire(data?.celestial[0]?.galactic_empire);

  if (loading) {
    return (
      <Loading
        width="100%"
        height="100%"
        text="Loading Celestial data"
      ></Loading>
    );
  }
  if (celestialSpritesLoading) {
    return (
      <Loading width="100%" height="100%" text="Loading sprites"></Loading>
    );
  }
  if (pixelDataGenerating) {
    return (
      <Loading
        width="100%"
        height="100%"
        text="Generating raw planet landscapes"
      ></Loading>
    );
  }
  if (!pixelDataGenerating && texturesGenerating) {
    return (
      <>
        <Loading
          width="100%"
          height="100%"
          text="Generating planet textures"
        ></Loading>

        <canvas ref={dataURICanvasRef} />
        <DataUriGenerator
          canvasRef={dataURICanvasRef}
          celestialId={data?.celestial?.[0].id}
          input={pixelData}
          onGenerationFinished={() => setTexturesGenerating(false)}
        />
      </>
    );
  } else if (data.celestial?.[0]) {
    return (
      <PixiWrapper
        ui={
          <>
            <InfoBox
              {...data.celestial[0]}
              position="absolute"
              bottom={0}
              left={0}
              borderBottom="unset"
              borderLeft="unset"
            />
            {/* <GameUIBottomBar bottom={0} /> */}
          </>
        }
      >
        <CelestialViewer celestial={data.celestial[0]} />
      </PixiWrapper>
    );
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no celestial.
      </Box>
    );
  }
};
