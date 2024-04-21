import { useReactiveVar } from '@apollo/client';
import {
  SystemFocus,
  colorsVar,
  systemEditorConfigVar,
  systemEditorFocusVar,
} from '@idleverse/state';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { Container, Graphics } from '@pixi/react';
import { ISnapZoomOptions, Viewport } from 'pixi-viewport';
import { Graphics as PixiGraphics, Point } from 'pixi.js';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { useResize } from '../_utils/use-resize.hook';

export const SystemEditor = ({
  viewportRef,
  worldSize,
  worldRadii,
  center,
  isMobile,
}: {
  viewportRef: MutableRefObject<Viewport>;
  worldSize: { width: number; height: number };
  worldRadii: { [key in SystemFocus]: number };
  center: { x: number; y: number };
  isMobile: boolean;
}) => {
  const size = useResize();

  const config = useReactiveVar(systemEditorConfigVar);
  const focus = useReactiveVar(systemEditorFocusVar);

  const outlinePalette = colors[colorsVar().secondary];

  const drawCelestialHighlight = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      g.beginFill(hexStringToNumber(outlinePalette['200']), 0.5);
      g.drawCircle(center.x, center.y, worldRadii.celestial);
      g.alpha = 0.1;
      g.cursor = 'pointer';

      if (systemEditorFocusVar() === 'celestial') {
        g.alpha = 0.4;
      }

      g.on('mouseenter', () => {
        if (systemEditorFocusVar() !== 'celestial') g.alpha = 0.3;
      });
      g.on('mouseleave', () => {
        if (systemEditorFocusVar() !== 'celestial') g.alpha = 0.1;
      });

      g.endFill();
    },
    [outlinePalette, center, worldRadii.celestial]
  );

  const drawRing = useCallback(
    (
      g: PixiGraphics,
      {
        innerRadius,
        outerRadius,
        name,
      }: { innerRadius: number; outerRadius: number; name: SystemFocus }
    ) => {
      g.clear();

      g.beginFill(hexStringToNumber(outlinePalette['200']), 0.3);
      g.drawCircle(center.x, center.y, outerRadius);
      g.beginHole();
      g.drawCircle(center.x, center.y, innerRadius);
      g.endHole();
      g.endFill();
      g.alpha = 0.1;

      if (systemEditorFocusVar() === name) {
        g.alpha = 0.4;
      }

      g.on('mouseenter', () => {
        if (systemEditorFocusVar() !== name) g.alpha = 0.3;
      });
      g.on('mouseleave', () => {
        if (systemEditorFocusVar() !== name) g.alpha = 0.1;
      });

      g.cursor = 'pointer';
      g.name = name;
    },
    [outlinePalette, center]
  );

  const viewportToCircle = useCallback(
    (width: number, focus: SystemFocus) => {
      if (viewportRef.current) {
        let delay = 0;

        const currentCenter = viewportRef.current.center;

        if (currentCenter.x !== center.x || currentCenter.y !== center.y) {
          delay = 350;
          viewportRef.current.snap(center.x, center.y, {
            // removeOnComplete: true,
            time: delay,
          });
        }

        setTimeout(() => {
          let zoomOptions: ISnapZoomOptions = {
            center: new Point(center.x, center.y),
            removeOnComplete: true,
            removeOnInterrupt: true,
            time: 1000,
          };

          zoomOptions = isMobile
            ? { ...zoomOptions, width: width + 200 }
            : { ...zoomOptions, height: width + 200 };

          viewportRef.current.snapZoom(zoomOptions);

          // viewportRef.current.plugins.remove('snap');
        }, delay);
      }
    },
    [viewportRef, center.x, center.y, isMobile]
  );

  useEffect(() => {
    if (focus) {
      viewportToCircle(worldRadii[focus] * 2, focus);
    }
  }, [focus, viewportToCircle, worldRadii]);

  useEffect(() => {
    systemEditorFocusVar(undefined);
  }, []);

  return (
    <Container>
      <Graphics
        alpha={focus === 'celestial' ? 0.5 : 0.1}
        draw={drawCelestialHighlight}
        interactive={true}
        pointerdown={() => {
          viewportToCircle(worldRadii['celestial'] * 2, 'celestial');

          systemEditorFocusVar('celestial');
        }}
        zIndex={2}
      />
      <Graphics
        draw={(g) =>
          drawRing(g, {
            innerRadius: worldSize.width / 3,
            outerRadius: worldRadii['goldilocks-zone'],
            name: 'goldilocks-zone',
          })
        }
        pointerdown={() => {
          viewportToCircle(
            worldRadii['goldilocks-zone'] * 2,
            'goldilocks-zone'
          );
          systemEditorFocusVar('goldilocks-zone');
        }}
        interactive={true}
        zIndex={2}
      />
      <Graphics
        draw={(g) =>
          drawRing(g, {
            innerRadius: center.x + worldSize.width / 10,
            outerRadius: worldRadii['asteroid-belt'],
            name: 'asteroid-belt',
          })
        }
        pointerdown={() => {
          viewportToCircle(worldRadii['asteroid-belt'] * 2, 'asteroid-belt');
          systemEditorFocusVar('asteroid-belt');
        }}
        interactive={true}
        zIndex={2}
      />
    </Container>
  );
};
