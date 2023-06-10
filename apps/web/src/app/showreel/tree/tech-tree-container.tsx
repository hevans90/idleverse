import { useReactiveVar } from '@apollo/client';
import { debugVar } from '../../_state/global-settings';
import { roleVar } from '../../_state/reactive-variables';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { TechTree } from './tech-tree';
import { TechTreeNodeEditor } from './ui/admin/tech-tree-node-editor';
import { DebugControls } from './ui/debug/debug-controls';
import { TreeSearch } from './ui/tree-search';
import { TreeSettings } from './ui/tree-settings';

export const TechTreeContainer = () => {
  const role = useReactiveVar(roleVar);
  const debug = useReactiveVar(debugVar);

  return (
    <PixiWrapper
      showGameUI={false}
      ui={
        <>
          <TreeSearch />
          <TreeSettings />
          {role === 'dev' && <TechTreeNodeEditor />}
          {debug && <DebugControls />}
        </>
      }
    >
      <TechTree />
    </PixiWrapper>
  );
};
