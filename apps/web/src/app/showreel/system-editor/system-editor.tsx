import { colorsVar } from '@idleverse/state';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { Container, Graphics, useApp } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Graphics as PixiGraphics, Point } from 'pixi.js';
import { MutableRefObject, useCallback } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';

export const SystemEditor = ({
  viewportRef,
  worldSize,
  starRadius,
}: {
  viewportRef: MutableRefObject<Viewport>;
  worldSize: { width: number; height: number };
  starRadius: number;
}) => {
  const size = useResize();
  const app = useApp();

  const outlinePalette = colors[colorsVar().secondary];

  const draw = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      g.beginFill(hexStringToNumber(outlinePalette['200']), 0.5);
      g.drawCircle(worldSize.width / 2, worldSize.height / 2, starRadius * 200);
      g.alpha = 0;
      g.cursor = 'pointer';

      g.on('mouseenter', () => (g.alpha = 0.4));
      g.on('mouseleave', () => (g.alpha = 0));

      g.endFill();
    },
    [starRadius, outlinePalette, worldSize.width, worldSize.height]
  );

  const focusStar = useCallback(() => {
    if (viewportRef.current) {
      let delay = 0;

      const currentCenter = viewportRef.current.center;

      if (
        currentCenter.x !== worldSize.width / 2 ||
        currentCenter.y !== worldSize.height / 2
      ) {
        delay = 350;
        viewportRef.current.snap(worldSize.width / 2, worldSize.height / 2, {
          removeOnComplete: true,
          time: delay,
        });
      }

      setTimeout(() => {
        viewportRef.current.snapZoom({
          center: new Point(worldSize.width / 2, worldSize.height / 2),
          removeOnComplete: true,
          removeOnInterrupt: true,
          time: 1000,
          width: size.width / 2,
        });
        viewportRef.current.plugins.remove('snap');
      }, delay);
    }
  }, []);

  return (
    <Container>
      <Graphics
        draw={draw}
        interactive={true}
        pointerdown={focusStar}
        zIndex={2}
      />
    </Container>
  );
};
