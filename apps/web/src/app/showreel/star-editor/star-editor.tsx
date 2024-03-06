import { useReactiveVar } from '@apollo/client';
import { PixelateFilter } from '@pixi/filter-pixelate';
import { useApp } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';

import { celestialSettingsVar } from './state/celestial.state';

import { Viewport } from 'pixi-viewport';
import fragment from './star.fs';

export const StarEditor = ({
  containerRef,
  viewportRef,
}: {
  containerRef: MutableRefObject<PIXI.Container>;
  viewportRef: MutableRefObject<Viewport>;
}) => {
  const app = useApp();
  const size = useResize();

  const tickerRef = useRef<(delta: number) => void>();
  const filterRef = useRef<PIXI.Filter>();

  const totalTime = useRef<number>(0);

  const { brightness, radius, color, coronalStrength, density } =
    useReactiveVar(celestialSettingsVar);

  const calculateOffset = useCallback(() => {
    const { x, y } = viewportRef.current.toScreen(
      viewportRef.current.worldWidth / 2,
      viewportRef.current.worldHeight / 2
    );
    return {
      x: x / 2,
      y: y / 2,
    };
  }, [viewportRef]);

  const calculateResolution = useCallback(() => {
    console.log(viewportRef.current.scale.x);
    console.log('initial', {
      x: (viewportRef.current.worldWidth / 2) * viewportRef.current.scale.x,
      y: (viewportRef.current.worldHeight / 2) * viewportRef.current.scale.x,
    });
    return {
      x: (viewportRef.current.worldWidth / 4) * viewportRef.current.scale.x,
      y: (viewportRef.current.worldHeight / 4) * viewportRef.current.scale.x,
    };
  }, [viewportRef]);

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

      viewportRef.current.on('zoomed-end', () => {
        filterRef.current.uniforms.u_resolution = calculateResolution();
        filterRef.current.uniforms.u_offset = calculateOffset();
      });
      viewportRef.current.on('wheel', () => {
        filterRef.current.uniforms.u_resolution = calculateResolution();
        filterRef.current.uniforms.u_offset = calculateOffset();
      });
      viewportRef.current.on('moved', (e) => {
        if (e.type !== 'wheel') {
          filterRef.current.uniforms.u_offset = calculateOffset();
        }
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
          new PixelateFilter(3),
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
