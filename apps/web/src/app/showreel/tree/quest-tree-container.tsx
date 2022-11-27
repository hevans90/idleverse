import { useReactiveVar } from '@apollo/client';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { roleVar } from '../../_state/reactive-variables';
import { QuestTree } from './quest-tree';
import { TreeSearch } from './ui/tree-search';
import { TreeSettings } from './ui/tree-settings';

export const QuestTreeContainer = () => {
  const role = useReactiveVar(roleVar);

  return (
    <PixiWrapper
      showGameUI={false}
      ui={
        <>
          <TreeSearch />
          <TreeSettings />
          {/* {role === 'dev' && <TechTreeNodeEditor />} */}
        </>
      }
    >
      <QuestTree />
    </PixiWrapper>
  );
};
