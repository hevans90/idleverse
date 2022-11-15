import { useReactiveVar } from '@apollo/client';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { technologiesVar } from '../../_state/technologies';
import { ResearchTree } from './tree';
import { TreeSearch } from './ui/search';

export const TreeContainer = () => {
  const technologies = useReactiveVar(technologiesVar);

  return (
    <PixiWrapper showGameUI={false} ui={<TreeSearch />}>
      <ResearchTree technologies={technologies} />
    </PixiWrapper>
  );
};
