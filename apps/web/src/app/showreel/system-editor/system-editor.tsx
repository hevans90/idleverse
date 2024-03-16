import { useReactiveVar } from '@apollo/client';
import {
  SystemFocus,
  colorsVar,
  systemEditorConfigVar,
  systemEditorFocusVar,
} from '@idleverse/state';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { Container, Graphics } from '@pixi/react';
import { Viewport } from 'pixi-viewport';
import { Graphics as PixiGraphics, Point } from 'pixi.js';
import { MutableRefObject, useCallback, useEffect, useMemo } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';

export const SystemEditor = ({
  viewportRef,
  worldSize,
  celestialRadius,
}: {
  viewportRef: MutableRefObject<Viewport>;
  worldSize: { width: number; height: number };
  celestialRadius: number;
}) => {
  const size = useResize();

  const center = useMemo(
    () => ({
      x: worldSize.width / 2,
      y: worldSize.height / 2,
    }),
    [worldSize]
  );

  const zoomXBuffer = 500;

  const worldRadii = useMemo(() => {
    const map: { [key in SystemFocus]: number } = {
      celestial: celestialRadius * 500,
      'goldilocks-zone': worldSize.width / 2,
      'asteroid-belt': worldSize.width - worldSize.width / 10,
    };
    return map;
  }, [celestialRadius, worldSize.width]);

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

      g.beginFill(hexStringToNumber(outlinePalette['200']), 0.5);
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
          viewportRef.current.snapZoom({
            center: new Point(center.x, center.y),
            removeOnComplete: true,
            removeOnInterrupt: true,
            time: 1000,
            width: width * 2,
          });

          // viewportRef.current.plugins.remove('snap');
        }, delay);
      }
    },
    [config, center, size]
  );

  useEffect(() => {
    if (focus) {
      viewportToCircle(worldRadii[focus] * 2, focus);
    }
  }, [focus]);

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
