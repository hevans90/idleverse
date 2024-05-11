import { PixelateFilter } from '@pixi/filter-pixelate';
import { useApp } from '@pixi/react';
import * as PIXI from 'pixi.js';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { CelestialGenerationConfig } from '@idleverse/models';
import { Viewport } from 'pixi-viewport';
import { clearInterval } from 'timers';
import fragment from './star.fs';

export const StarRenderer = ({
  containerRef,
  viewportRef,
  starRadius,
  config,
  size,
}: {
  containerRef: MutableRefObject<PIXI.Container>;
  viewportRef: MutableRefObject<Viewport>;
  config: CelestialGenerationConfig;
  size: { width: number; height: number };
  starRadius?: number;
}) => {
  const app = useApp();

  const tickerRef = useRef<(delta: number) => void>();
  const filterRef = useRef<PIXI.Filter>();

  const [snapIntervalTimer, setSnapIntervalTimer] =
    useState<ReturnType<typeof setInterval>>(null);

  const totalTime = useRef<number>(0);

  const { brightness, radius, color, coronalStrength, density } = config;

  const calculateOffset = useCallback(() => {
    if (!viewportRef.current) {
      return;
    }
    const { x, y } = viewportRef.current.toScreen(
      viewportRef.current.worldWidth / 2,
      viewportRef.current.worldHeight / 2
    );
    return {
      x: x / 2,
      y: y / 2,
    };
  }, [viewportRef]);

  const calculateResolution = useCallback(
    () => ({
      x:
        (((starRadius ?? 1) * viewportRef.current?.worldWidth) / 4) *
        viewportRef.current?.scale.x,
      y:
        (((starRadius ?? 1) * viewportRef.current?.worldHeight) / 4) *
        viewportRef.current?.scale.x,
    }),
    []
  );

  const afterLoad = async () => {
    const bundle = await PIXI.Assets.loadBundle('noise');
    const perlin = bundle['perlin-bw'];
    perlin.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    const u_resolution = calculateResolution();

    const u_color = [
      (color.r / 255).toFixed(1),
      (color.g / 255).toFixed(1),
      (color.b / 255).toFixed(1),
    ];

    if (filterRef.current) {
      // this is MUCH more performant than creating a new filter on every run of this function
      filterRef.current.uniforms.u_radius = radius;
      filterRef.current.uniforms.u_brightness = brightness * 0.5;

      filterRef.current.uniforms.u_density = density;
      filterRef.current.uniforms.u_resolution = u_resolution;
      filterRef.current.uniforms.u_coronal_strength = coronalStrength;
      filterRef.current.uniforms.u_offset = calculateOffset();
      filterRef.current.uniforms.u_color = u_color;
    } else {
      filterRef.current = new PIXI.Filter(null, fragment, {
        noiseSample: perlin,
        u_brightness: brightness * 0.5,

        u_density: density,
        u_coronal_strength: coronalStrength,
        u_radius: radius,
        u_time: 0,
        u_resolution,
        u_offset: calculateOffset(),
        u_color,
      });

      viewportRef.current.on('moved', (e) => {
        filterRef.current.uniforms.u_resolution = calculateResolution();
        filterRef.current.uniforms.u_offset = calculateOffset();
      });

      viewportRef.current.on('snap-zoom-start', (e) => {
        setSnapIntervalTimer(
          setInterval(() => {
            filterRef.current.uniforms.u_resolution = calculateResolution();
            filterRef.current.uniforms.u_offset = calculateOffset();
          }, 10)
        );
      });
      viewportRef.current.on('snap-zoom-end', (e) => {
        clearInterval(snapIntervalTimer);
        setSnapIntervalTimer(null);
      });
    }

    tickerRef.current = (delta) => {
      filterRef.current.uniforms.u_time = totalTime.current;
      totalTime.current += delta / 60;
    };
  };

  useEffect(() => {
    if (viewportRef.current) {
      app.ticker?.remove(tickerRef.current);
      afterLoad().then(() => {
        app.ticker?.remove(tickerRef.current);
        containerRef.current.filters = [
          filterRef.current,
          new PixelateFilter(0.1),
        ];
        app.ticker.add(tickerRef.current);
      });
    }

    return () => {
      app.ticker?.remove(tickerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    size,
    brightness,
    radius,
    color,
    coronalStrength,
    density,
    viewportRef.current,
  ]);

  return <></>;
};
