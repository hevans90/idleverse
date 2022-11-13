import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { Tree } from './tree';

export const TreeContainer = () => {
  //

  return (
    <PixiWrapper
      showGameUI={false}
      ui={
        <>
          <></>
        </>
      }
    >
      <Tree />
    </PixiWrapper>
  );
};
