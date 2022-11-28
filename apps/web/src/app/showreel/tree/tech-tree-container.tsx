import { useReactiveVar } from '@apollo/client';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { roleVar } from '../../_state/reactive-variables';
import { TechTree } from './tech-tree';
import { TechTreeNodeEditor } from './ui/admin/tech-tree-node-editor';
import { TreeSearch } from './ui/tree-search';
import { TreeSettings } from './ui/tree-settings';

export const TechTreeContainer = () => {
  const role = useReactiveVar(roleVar);

  return (
    <PixiWrapper
      showGameUI={false}
      ui={
        <>
          <TreeSearch />
          <TreeSettings />
          {role === 'dev' && <TechTreeNodeEditor />}
        </>
      }
    >
      <TechTree />
    </PixiWrapper>
  );
};
