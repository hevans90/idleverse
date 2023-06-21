import { PixiWrapper } from '../../canvases/_utils/pixi-wrapper';
import { StarEditor } from './star-editor';
import { CelestialSettings } from './ui/celestial-settings';

export const StarEditorContainer = () => {
  return (
    <PixiWrapper
      showGameUI={false}
      ui={
        <>
          <CelestialSettings />
        </>
      }
    >
      <StarEditor />
    </PixiWrapper>
  );
};
