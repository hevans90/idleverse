/* eslint-disable react/jsx-no-useless-fragment */
import { useReactiveVar } from '@apollo/client';
import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';
import {
  planetGenerationColorDrawerVar,
  planetGenerationTerrainDrawerVar,
} from '../../../_state/planet-generation';
import { ExpandingUI } from '../../../components/expanding-ui';

export const PlanetGeneratorTerrainDrawer = () => {
  const { currentHexPalette } = useReactiveVar(planetGenerationColorDrawerVar);
  const drawerState = useReactiveVar(planetGenerationTerrainDrawerVar);

  return (
    <ExpandingUI
      icon={null}
      title="Terrain"
      titlePosition="before"
      stackProps={{
        left: 0,
        top: '40%',
        borderLeftWidth: 0,
      }}
      panelOpen={drawerState.panelOpen}
      onPanelOpenChange={() =>
        planetGenerationTerrainDrawerVar({
          ...drawerState,
          panelOpen: !drawerState.panelOpen,
        })
      }
    >
      <Box padding={3} w="100%" minWidth="275px">
        <RangeSlider
          defaultValue={drawerState.terrainBias}
          min={0}
          max={1}
          step={0.01}
          onChangeEnd={(val: [number, number, number, number]) =>
            planetGenerationTerrainDrawerVar({
              ...drawerState,
              terrainBias: val,
            })
          }
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb
            boxSize={6}
            index={0}
            bgColor={currentHexPalette?.water}
          />
          <RangeSliderThumb
            boxSize={6}
            index={1}
            bgColor={currentHexPalette?.sand}
          />
          <RangeSliderThumb
            boxSize={6}
            index={2}
            bgColor={currentHexPalette?.grass}
          />
          <RangeSliderThumb
            boxSize={6}
            index={3}
            bgColor={currentHexPalette?.forest}
          />
        </RangeSlider>
      </Box>
    </ExpandingUI>
  );
};
