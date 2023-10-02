import { useQuery, useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import {
  CelestialByIdDocument,
  CelestialByIdQuery,
} from '@idleverse/galaxy-gql';
import { hexToRGB } from '@idleverse/theme';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { celestialVar, celestialViewerSelectedPlanet } from '@idleverse/state';
import { loadPlanets } from '../../asset-loading/load-planets';
import { Loading } from '../../components/loading';
import { useEmpire } from '../../hooks/use-my-empire';
import { PixiWrapper } from '../_utils/pixi-wrapper';
import { runPixelDataGenOnWorker } from '../planet-generator/texture-generation/run-texture-gen-on-worker';
import { CelestialViewer } from './celestial-viewer';
import { DataUriGenerator } from './data-uri-generator';
import { InfoBox } from './ui/info-box';

export const CelestialViewerContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<CelestialByIdQuery>(
    CelestialByIdDocument,
    {
      variables: { id },
    }
  );

  const [pixelDataGenerating, setPixelDataGenerating] = useState(true);
  const [texturesGenerating, setTexturesGenerating] = useState(true);
  const [celestialSpritesLoading, setCelestialSpritesLoading] = useState(true);

  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanet);

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
    if (data) {
      celestialVar(data.celestial_by_pk);

      // if a previously selected planet isn't a part of this system, wipe it to avoid bugs
      if (
        selectedPlanet &&
        !data.celestial_by_pk.planets.find(({ id }) => id === selectedPlanet.id)
      ) {
        celestialViewerSelectedPlanet(null);
      }

      const pixelDataToGenerate: Promise<{
        seed: string;
        data: Uint8Array;
        width: number;
        height: number;
      }>[] = [];
      data?.celestial_by_pk?.planets.forEach(
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
  }, [id, data, selectedPlanet]);

  useEmpire(data?.celestial_by_pk?.galactic_empire);

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

        <DataUriGenerator
          celestialId={id}
          input={pixelData}
          onGenerationFinished={() => setTexturesGenerating(false)}
        />
      </>
    );
  } else if (data.celestial_by_pk) {
    return (
      <PixiWrapper
        ui={
          <>
            <InfoBox
              {...data.celestial_by_pk}
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
        <CelestialViewer celestial={data.celestial_by_pk} />
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
