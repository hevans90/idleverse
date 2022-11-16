import { useReactiveVar } from '@apollo/client';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { technologiesVar } from '../../_state/technologies';
import { ResearchTree } from './tree';
import { TreeSearch } from './ui/search';
import { TreeSettings } from './ui/settings';

export const TreeContainer = () => {
  const technologies = useReactiveVar(technologiesVar);

  return (
    <PixiWrapper
      showGameUI={false}
      ui={
        <>
          <TreeSearch />
          <TreeSettings />
        </>
      }
    >
      <ResearchTree technologies={technologies} />
    </PixiWrapper>
  );
};
