import { useReactiveVar } from '@apollo/client';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { roleVar } from '../../_state/reactive-variables';
import { ResearchTree } from './tree';
import { TreeNodeEditor } from './ui/admin/tree-node-editor';
import { TreeSearch } from './ui/tree-search';
import { TreeSettings } from './ui/tree-settings';

export const TreeContainer = () => {
  const role = useReactiveVar(roleVar);

  return (
    <PixiWrapper
      showGameUI={false}
      ui={
        <>
          <TreeSearch />
          <TreeSettings />
          {role === 'dev' && <TreeNodeEditor />}
        </>
      }
    >
      <ResearchTree />
    </PixiWrapper>
  );
};
