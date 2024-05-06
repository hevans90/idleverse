import { useReactiveVar } from '@apollo/client';
import {
  SystemFocus,
  celestialViewerSelectedPlanet,
  colorsVar,
  systemEditorFocusVar,
} from '@idleverse/state';
import { colors, hexStringToNumber } from '@idleverse/theme';
import { Container, Graphics } from '@pixi/react';
import { ISnapZoomOptions, Viewport } from 'pixi-viewport';
import { Graphics as PixiGraphics, Point } from 'pixi.js';
import { MutableRefObject, useCallback, useEffect } from 'react';

export const SystemEditor = ({
  viewportRef,

  worldRadii,
  center,
  isMobile,
}: {
  viewportRef: MutableRefObject<Viewport>;

  worldRadii: { [key in SystemFocus]: { inner: number; outer: number } };
  center: { x: number; y: number };
  isMobile: boolean;
}) => {
  const focus = useReactiveVar(systemEditorFocusVar);

  const outlinePalette = colors[colorsVar().secondary];

  const drawCelestialHighlight = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      g.beginFill(hexStringToNumber(outlinePalette['200']), 0.2);
      g.drawCircle(center.x, center.y, worldRadii.celestial.outer);
      g.alpha = 0;
      g.cursor = 'pointer';

      if (systemEditorFocusVar() === 'celestial') {
        g.alpha = 0.3;
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

      g.beginFill(hexStringToNumber(outlinePalette['200']), 0.2);
      g.drawCircle(center.x, center.y, outerRadius);
      g.beginHole();
      g.drawCircle(center.x, center.y, innerRadius);
      g.endHole();
      g.endFill();
      g.alpha = 0;

      if (systemEditorFocusVar() === name) {
        g.alpha = 0.3;
      }

      g.on('mouseenter', () => {
        if (systemEditorFocusVar() !== name) g.alpha = 0.3;
      });
      g.on('mouseleave', () => {
        if (systemEditorFocusVar() !== name) g.alpha = 0;
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
      viewportToCircle(worldRadii[focus].outer * 2, focus);
    }
  }, [focus, viewportToCircle, worldRadii]);

  useEffect(() => {
    systemEditorFocusVar(undefined);
  }, []);

  return (
    <Container>
      {/* Celestial circle */}
      <Graphics
        alpha={focus === 'celestial' ? 0.5 : 0.1}
        draw={drawCelestialHighlight}
        interactive={true}
        pointerdown={() => {
          viewportToCircle(worldRadii['celestial'].outer * 2, 'celestial');
          celestialViewerSelectedPlanet(null);
          systemEditorFocusVar('celestial');
        }}
        zIndex={2}
      />
      {/* Goldilocks ring */}
      <Graphics
        draw={(g) =>
          drawRing(g, {
            innerRadius: worldRadii['goldilocks-zone'].inner,
            outerRadius: worldRadii['goldilocks-zone'].outer,
            name: 'goldilocks-zone',
          })
        }
        pointerdown={() => {
          viewportToCircle(
            worldRadii['goldilocks-zone'].outer * 2,
            'goldilocks-zone'
          );
          celestialViewerSelectedPlanet(null);
          systemEditorFocusVar('goldilocks-zone');
        }}
        interactive={true}
        zIndex={2}
      />

      {/* Asteroid ring */}
      <Graphics
        draw={(g) =>
          drawRing(g, {
            innerRadius: worldRadii['asteroid-belt'].inner,
            outerRadius: worldRadii['asteroid-belt'].outer,
            name: 'asteroid-belt',
          })
        }
        pointerdown={() => {
          viewportToCircle(
            worldRadii['asteroid-belt'].outer * 2,
            'asteroid-belt'
          );
          celestialViewerSelectedPlanet(null);
          systemEditorFocusVar('asteroid-belt');
        }}
        interactive={true}
        zIndex={2}
      />
    </Container>
  );
};
