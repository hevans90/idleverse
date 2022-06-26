/* eslint-disable react-hooks/exhaustive-deps */
import { useReactiveVar } from '@apollo/client';
import { CelestialByIdQuery } from '@idleverse/galaxy-gql';
import { hexStringToNumber, theme } from '@idleverse/theme';
import { useApp } from '@inlet/react-pixi';
import { PixelateFilter } from '@pixi/filter-pixelate';
import { Container, Graphics, Sprite } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { assetLoader } from '../../asset-loading/asset-loader';
import { celestialViewerPlanetDataUris } from '../../_state/celestial-viewer';
import { solarSystemConfigVar, timeVar } from '../../_state/reactive-variables';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import { sunSpriteConfig } from '../solar-system/graphics/config';
import {
  createAnimatedPlanetSprite,
  createRadialEllipse,
} from '../solar-system/graphics/graphics-utils';
import {
  createPlanet,
  drawPlanet,
  Planet,
  PlanetConfig,
  updatePlanetPosition,
} from '../solar-system/planets/planet';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport';

type CelestialViewerProps = {
  celestial: CelestialByIdQuery['celestial_by_pk'];
};

export const CelestialViewer = ({ celestial }: CelestialViewerProps) => {
  const app = useApp();

  const size = useResize();

  const planetDataUris = useReactiveVar(celestialViewerPlanetDataUris);

  const solarSystemContainerRef = useRef(new Container());

  useFpsTracker(app, size);

  useViewport(app, size, solarSystemContainerRef);

  useEffect(() => {
    solarSystemContainerRef.current.filters = [new PixelateFilter(1)];
    solarSystemContainerRef.current.x = size.width / 2;
    solarSystemContainerRef.current.y = size.height / 2;

    solarSystemContainerRef.current.sortableChildren = true;

    const systemOrigin = { x: 0, y: 0 };

    app.ticker.add(() => {
      timeVar(timeVar() + 1);
    });

    const sunSprite = createAnimatedPlanetSprite(sunSpriteConfig);
    const sunConfig: PlanetConfig = {
      origin: { x: systemOrigin.x, y: systemOrigin.y },
      orbit: { x: 0, y: 0, speed: 1 },
    };
    const sun: Planet = createPlanet({
      name: 'sun',
      config: sunConfig,
      sprite: sunSprite,
    });

    const planets: Planet[] = [sun];

    // load planet data uris in to pixi textures
    assetLoader(
      celestial.planets.map(({ id, name }) => ({
        name: `${name}_${id}`,
        url: planetDataUris.uris.find(({ seed }) => seed === id).uri,
      }))
    ).then((assetCollection) => {
      celestial.planets.forEach(({ id, name, radius }) => {
        const planetTexture = assetCollection?.[`${name}_${id}`]?.texture;

        const planetGraphic = new Graphics()
          .beginTextureFill({
            texture: planetTexture,
          })
          .drawCircle(0, 0, radius * 18)
          .endFill();

        const texture = app.renderer.generateTexture(planetGraphic);
        const sprite = new Sprite(texture);

        sprite.name = name;
        sprite.interactive = true;
        sprite.cursor = 'pointer';
        sprite.zIndex = 1;
        sprite.scale = { x: 0.6, y: 0.6 };

        const config: PlanetConfig = {
          origin: { x: 0, y: 0 },
          orbit: { x: 150 * radius, y: 100 * radius, speed: radius * 0.5 },
        };
        const planet: Planet = createPlanet({
          name,
          config,
          sprite,
          parent: sun,
        });

        planets.push(planet);
      });

      planets.forEach(({ sprite }) =>
        solarSystemContainerRef.current.addChild(sprite)
      );
      planets
        // all planets that have a parent i.e. not the central star, or other freely floating objects
        .filter((planet) => planet?.parent)
        .forEach(
          ({
            parent: {
              config: { origin },
            },
            config: { orbit },
          }) => {
            const radialCircle = createRadialEllipse(
              origin.x,
              origin.y,
              orbit.x,
              orbit.y,
              hexStringToNumber(theme.colors.gray['300'])
            );

            solarSystemContainerRef.current.addChild(radialCircle);
          }
        );
    });

    app.ticker.add(() => {
      // eslint-disable-next-line prefer-const
      let { simulationSpeed } = solarSystemConfigVar();

      planets.forEach((planet) =>
        updatePlanetPosition(timeVar(), planet, simulationSpeed)
      );
      planets.forEach((planet) => drawPlanet(planet, systemOrigin));
    });
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
