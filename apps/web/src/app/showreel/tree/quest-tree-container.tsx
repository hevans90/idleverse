import { useReactiveVar } from '@apollo/client';
import { roleVar } from '../../_state/reactive-variables';
import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { QuestTree } from './quest-tree';
import { TreeSearch } from './ui/tree-search';
import { TreeSettings } from './ui/tree-settings';

const QuestTreeContainer = () => {
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

export default QuestTreeContainer;
