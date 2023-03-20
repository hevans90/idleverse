import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { GameUIBottomBar } from '../../canvases/galaxy-generator/ui/bottom-bar';
import { GravitySimulation } from './gravity-simulation';
import {
  galaxySimControlsHeight,
  GravitySimulationControls,
} from './ui/gravity-simulation-controls';

const GravitySimulationContainer = () => {
  return (
    <PixiWrapper
      showGameUI={false}
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

export default GravitySimulationContainer;
