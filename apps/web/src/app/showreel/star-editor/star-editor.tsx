import { useReactiveVar } from '@apollo/client';
import { PixelateFilter } from '@pixi/filter-pixelate';
import { useApp } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useViewport } from '../../canvases/_utils/use-viewport.hook';
import { useStarField } from '../colyseus-poc/rendering/use-starfield';
import { celestialSettingsVar } from './state/celestial.state';

import fragment from './star.fs';

export const StarEditor = () => {
  const app = useApp();
  const size = useResize();
  const solarSystemContainerRef = useRef(new PIXI.Container());
  solarSystemContainerRef.current.filterArea = new PIXI.Rectangle(
    0,
    0,
    size.width,
    size.height
  );
  solarSystemContainerRef.current.zIndex = 2;

  const viewport = useViewport({
    app,
    size,
    containerRef: solarSystemContainerRef,
    clampDrag: true,
    clampZoom: { minScale: 0.1, maxScale: 10 },
  });

  const tickerRef = useRef<(delta: number) => void>();
  const filterRef = useRef<PIXI.Filter>();

  const totalTime = useRef<number>(0);

  const starfield = useStarField({ dimensions: size });

  const { brightness, radius, color } = useReactiveVar(celestialSettingsVar);

  const afterLoad = async () => {
    const bundle = await PIXI.Assets.loadBundle('noise');
    const perlin = bundle['perlin'];
    perlin.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    const aspectRatio = size.width / size.height;

    const u_resolution = {
      x: viewport.width / 2,
      y: viewport.height / 2,
    };

    const u_offset = {
      // gl_FragCoord begins from the top right rectangle of the first pixel, meaning we need some hacky offset
      x: size.width / 4 - aspectRatio,
      y: size.height / 4 - aspectRatio,
    };

    const u_color = [
      (color.r / 255).toFixed(1),
      (color.g / 255).toFixed(1),
      (color.b / 255).toFixed(1),
    ];

    const uniforms = {
      noiseSample: perlin,
      u_brightness: brightness * 0.5,
      u_radius: radius,
      u_time: 0,
      u_resolution,
      u_offset,
      u_color,
    };

    if (filterRef.current) {
      // this is MUCH more performant than creating a new filter on every run of this function
      filterRef.current.uniforms.u_radius = uniforms.u_radius;
      filterRef.current.uniforms.u_brightness = uniforms.u_brightness;
      filterRef.current.uniforms.u_resolution = u_resolution;
      filterRef.current.uniforms.u_offset = u_offset;
      filterRef.current.uniforms.u_color = u_color;
      console.log(filterRef.current.uniforms.u_color);
    } else {
      filterRef.current = new PIXI.Filter(null, fragment, uniforms);
      console.log(filterRef.current.uniforms.u_color);
    }

    tickerRef.current = (delta) => {
      filterRef.current.uniforms.u_time = totalTime.current;
      totalTime.current += delta / 60;
    };
  };

  useEffect(() => {
    if (viewport) {
      viewport?.on(
        'wheel',
        () =>
          (filterRef.current.uniforms.u_resolution = {
            x: viewport.width / 2,
            y: viewport.height / 2,
          })
      );
    }
  }, [viewport]);

  useEffect(() => {
    if (viewport) {
      app.ticker?.remove(tickerRef.current);

      const outline = new PIXI.Graphics();
      outline
        .lineStyle(3, new PIXI.Color({ r: 0, g: 0, b: 0, a: 0.00001 }))
        .drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);
      viewport.addChild(outline);

      afterLoad().then(() => {
        app.ticker?.remove(tickerRef.current);
        if (app.stage) {
          viewport.filterArea = app.renderer.screen;
          viewport.addChild(solarSystemContainerRef.current);
          viewport.addChild(starfield);
          solarSystemContainerRef.current.filters = [
            filterRef.current,
            new PixelateFilter(3),
          ];
          app.ticker.add(tickerRef.current);
        }
      });
    }

    return () => {
      app.ticker?.remove(tickerRef.current);
    };
  }, [size, viewport, brightness, radius, color]);

  return <></>;
};
