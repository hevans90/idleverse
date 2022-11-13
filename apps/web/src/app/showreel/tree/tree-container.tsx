import { useReactiveVar } from '@apollo/client';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { technologiesVar } from '../../_state/technologies';
import { ResearchTree } from './tree';

export const TreeContainer = () => {
  const technologies = useReactiveVar(technologiesVar);

  return (
    <PixiWrapper
      showGameUI={false}
      ui={
        <>
          <></>
        </>
      }
    >
      <ResearchTree technologies={technologies} />
    </PixiWrapper>
  );
};
