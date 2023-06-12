import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { StarEditor } from './star-editor';

export const StarEditorContainer = () => {
  return (
    <PixiWrapper showGameUI={false} ui={<></>}>
      <StarEditor />
    </PixiWrapper>
  );
};
