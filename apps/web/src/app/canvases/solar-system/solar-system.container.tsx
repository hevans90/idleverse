import { Stage } from '@inlet/react-pixi';
import { animateVar } from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { SolarSystem } from './solar-system';

export const SolarSystemContainer = () => {
  const size = useResize();

  return (
    <Stage
      {...size}
      options={{
        backgroundColor: 0x2d3239,
        antialias: true,
      }}
      onUnmount={() => animateVar(false)}
    >
      <SolarSystem />
    </Stage>
  );
};
