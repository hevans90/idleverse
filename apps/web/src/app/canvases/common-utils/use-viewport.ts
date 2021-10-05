import { Viewport } from 'pixi-viewport';
import { Application, Container } from 'pixi.js';
import { useEffect } from 'react';

/**
 * when the screen is resized, this effect will reset the viewport's screen dimensions & then re-center
 */
export const useViewport = (
  app: Application,
  size: { width: number; height: number },
  containerRef?: React.MutableRefObject<Container>
) => {
  useEffect(() => {
    const viewport: Viewport = app.stage.getChildByName(
      'viewport'
    ) as unknown as Viewport;

    if (containerRef) {
      containerRef.current.x = size.width / 2;
      containerRef.current.y = size.height / 2;
    }

    viewport.screenHeight = size.height;
    viewport.screenWidth = size.width;

    viewport.fitWorld(true);
  }, [app.stage, containerRef, size]);
};
