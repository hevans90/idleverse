import { GameUIBottomBar } from '../../canvases/galaxy-generator/ui/bottom-bar';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { GravitySimulation } from './gravity-simulation';
import {
  galaxySimControlsHeight,
  GravitySimulationControls,
} from './ui/gravity-simulation-controls';

export const GravitySimulationContainer = () => {
  return (
    <PixiWrapper
      ui={
        <>
          <GravitySimulationControls />
          <GameUIBottomBar bottom={galaxySimControlsHeight} />
        </>
      }
    >
      <GravitySimulation />
    </PixiWrapper>
  );
};
