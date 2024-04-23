/* eslint-disable react-hooks/exhaustive-deps */
import { useReactiveVar } from '@apollo/client';
import { CelestialByIdQuery } from '@idleverse/galaxy-gql';
import { hexStringToNumber, useUiBackground } from '@idleverse/theme';
import { useApp } from '@pixi/react';
import { Assets, Container, TickerCallback } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';

import {
  createAnimatedPlanetSprite,
  createRadialEllipse,
} from './utils/graphics-utils';

import {
  celestialViewerPlanetDataUris,
  celestialViewerSelectedPlanet,
  solarSystemConfigVar,
  timeVar,
} from '@idleverse/state';
import { useStarField } from '../../showreel/colyseus-poc/rendering/use-starfield';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport.hook';
import { Planet, PlanetConfig } from './models';
import { useSelectedPlanet } from './use-selected-planet';
import {
  buildPlanet,
  centerPlanetDraw,
  createPlanet,
  updatePlanetPosition,
} from './utils/drawing-utils';
import { sunSpriteConfig } from './utils/static-sprite-configs';

type CelestialViewerProps = {
  celestial: CelestialByIdQuery['celestial_by_pk'];
};

export const CelestialViewer = ({ celestial }: CelestialViewerProps) => {
  const app = useApp();

  const size = useResize();

  const starfield = useStarField({ dimensions: size });

  const { rawBorder } = useUiBackground();

  const selectedIndicatorTickerRef = useRef<TickerCallback<unknown>>();

  const [selectedPlanetPosition, setSelectedPlanetPosition] = useState<{
    x: number;
    y: number;
  }>(null);

  const [planets, setPlanets] = useState<Planet[]>([]);

  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanet);
  const planetDataUris = useReactiveVar(celestialViewerPlanetDataUris);

  const solarSystemContainerRef = useRef(new Container());

  const viewport = useViewport({
    app,
    size,
    containerRef: solarSystemContainerRef,
    clampDrag: true,
  });

  useSelectedPlanet({
    container: solarSystemContainerRef.current,
    x: selectedPlanetPosition?.x,
    y: selectedPlanetPosition?.y,
    viewport,
  });

  useFpsTracker(app);

  useEffect(() => {
    if (app.renderer !== null) {
      // solarSystemContainerRef.current.filters = [new PixelateFilter(1)];
      solarSystemContainerRef.current.x = size.width / 2;
      solarSystemContainerRef.current.y = size.height / 2;

      solarSystemContainerRef.current.sortableChildren = true;

      const systemOrigin = { x: 0, y: 0 };

      app.ticker.add((dt) => {
        timeVar(timeVar() + dt);
      });

      const sunSprite = createAnimatedPlanetSprite(sunSpriteConfig);
      const sunConfig: PlanetConfig = {
        id: celestial.id,
        radius: 100,
        origin: { x: systemOrigin.x, y: systemOrigin.y },
        orbit: { x: 0, y: 0, speed: 0 },
      };
      const sun: Planet = createPlanet({
        name: celestial.name,
        config: sunConfig,
        sprite: sunSprite,
      });

      const tempPlanets: Planet[] = [sun];

      // load planet data uris in to pixi textures

      const bundleKey = `celestial_${celestial.id}`;

      Assets.addBundle(
        bundleKey,
        celestial.planets.map(({ id, name }) => ({
          name,
          srcs: planetDataUris.uris.find(({ seed }) => seed === id).uri,
        }))
      );

      Assets.loadBundle(bundleKey).then((bundle) => {
        celestial.planets.forEach(({ id, name, radius }) =>
          tempPlanets.push(
            buildPlanet({
              planetTexture: bundle?.[name],
              radius,
              app,
              name,
              id,
              selectionFunction: () => {
                celestialViewerSelectedPlanet({
                  name,
                  id,
                });
              },
              sun,
            })
          )
        );

        // select first planet
        if (celestial.planets.length) {
          celestialViewerSelectedPlanet({
            name: celestial.planets[0].name,
            id: celestial.planets[0].id,
          });
        }

        tempPlanets.forEach(({ sprite }) =>
          solarSystemContainerRef.current.addChild(sprite)
        );
        tempPlanets
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
                hexStringToNumber(rawBorder)
              );

              solarSystemContainerRef.current.addChild(radialCircle);
            }
          );

        if (selectedPlanet) {
          setupTicker(tempPlanets);
        }
      });

      app.ticker.add(() => {
        tempPlanets.forEach((planet) => {
          if (planet.name !== celestial.name) {
            planet.sprite.rotation += (1 / planet.config.radius) * 0.01;
          }
          updatePlanetPosition(
            timeVar(),
            planet,
            solarSystemConfigVar().simulationSpeed
          );
          centerPlanetDraw(planet, planet.name === celestial.name);
        });

        setPlanets(tempPlanets);
      });
    }

    solarSystemContainerRef.current.addChild(starfield);
  }, [app?.renderer]);

  useEffect(() => {
    try {
      app.ticker.remove(selectedIndicatorTickerRef.current);
    } catch (e) {
      //
    }

    setupTicker(planets);
  }, [selectedPlanet]);

  const setupTicker = (planetArr: Planet[]) => {
    const selectedFound = planetArr.find(
      (planet) => planet.config.id === selectedPlanet?.id
    );

    if (selectedFound) {
      selectedIndicatorTickerRef.current = () => {
        setSelectedPlanetPosition({
          x:
            selectedFound.sprite.x -
            selectedFound.sprite.width / 2 -
            // rough character width of zx-spectrum mono font characters
            selectedPlanet.name.length * 7.75,
          y: selectedFound.sprite.y - selectedFound.sprite.height - 10,
        });
      };
      app.ticker?.add(selectedIndicatorTickerRef.current);
    }
  };

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
