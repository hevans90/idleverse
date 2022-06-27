/* eslint-disable react-hooks/exhaustive-deps */
import { useReactiveVar } from '@apollo/client';
import { CelestialByIdQuery } from '@idleverse/galaxy-gql';
import { hexStringToNumber, theme } from '@idleverse/theme';
import { useApp } from '@inlet/react-pixi';
import { PixelateFilter } from '@pixi/filter-pixelate';
import { Container, Graphics, Matrix, Sprite, TickerCallback } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { assetLoader } from '../../asset-loading/asset-loader';
import {
  celestialViewerPlanetDataUris,
  celestialViewerSelectedPlanet,
} from '../../_state/celestial-viewer';
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
import { useSelectedPlanet } from './use-selected-planet';

type CelestialViewerProps = {
  celestial: CelestialByIdQuery['celestial_by_pk'];
};

export const CelestialViewer = ({ celestial }: CelestialViewerProps) => {
  const app = useApp();

  const size = useResize();

  const selectedIndicatorTickerRef = useRef<TickerCallback<unknown>>();

  const [selectedPlanetPosition, setSelectedPlanetPosition] = useState<{
    x: number;
    y: number;
  }>(null);

  const [planets, setPlanets] = useState<Planet[]>([]);

  const selectedPlanet = useReactiveVar(celestialViewerSelectedPlanet);
  const planetDataUris = useReactiveVar(celestialViewerPlanetDataUris);

  const solarSystemContainerRef = useRef(new Container());

  useSelectedPlanet(
    solarSystemContainerRef.current,
    selectedPlanet?.name,
    selectedPlanetPosition?.x,
    selectedPlanetPosition?.y
  );

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
      id: celestial.id,
      radius: 100,
      origin: { x: systemOrigin.x, y: systemOrigin.y },
      orbit: { x: 0, y: 0, speed: 1 },
    };
    const sun: Planet = createPlanet({
      name: celestial.name,
      config: sunConfig,
      sprite: sunSprite,
    });

    const tempPlanets: Planet[] = [sun];

    // load planet data uris in to pixi textures
    assetLoader(
      celestial.planets.map(({ id, name }) => ({
        name: `${name}_${id}`,
        url: planetDataUris.uris.find(({ seed }) => seed === id).uri,
      }))
    ).then((assetCollection) => {
      celestial.planets.forEach(({ id, name, radius }) => {
        const planetTexture = assetCollection?.[`${name}_${id}`]?.texture;

        const radiusFactor = 28;

        const planetGraphic = new Graphics()
          .beginTextureFill({
            texture: planetTexture,
            matrix: new Matrix(1, 0, 0, 1, 0, radius * radiusFactor),
          })
          .drawCircle(0, 0, radius * radiusFactor)
          .endFill();

        const texture = app.renderer.generateTexture(planetGraphic);
        const sprite = new Sprite(texture);

        sprite.name = name;
        sprite.interactive = true;
        sprite.cursor = 'pointer';
        sprite.zIndex = 1;
        sprite.scale = { x: 0.3, y: 0.3 };
        sprite.anchor.set(0.5, 0.5);

        const config: PlanetConfig = {
          id,
          radius,
          origin: { x: 0, y: 0 },
          orbit: {
            x: Math.random() > 0.2 ? 200 * radius : 100 * radius,
            y: Math.random() > 0.2 ? 200 * radius : 100 * radius,
            speed: 1 / radius,
          },
        };
        const planet: Planet = createPlanet({
          name,
          config,
          sprite,
          parent: sun,
        });

        tempPlanets.push(planet);
      });

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
              hexStringToNumber(theme.colors.gray['700'])
            );

            solarSystemContainerRef.current.addChild(radialCircle);
          }
        );

      if (selectedPlanet) {
        setupTicker(tempPlanets);
      }
    });

    app.ticker.add(() => {
      // eslint-disable-next-line prefer-const
      let { simulationSpeed } = solarSystemConfigVar();

      tempPlanets.forEach((planet) => {
        if (planet.name !== 'sun') {
          planet.sprite.rotation += (1 / planet.config.radius) * 0.01;
        }
        updatePlanetPosition(timeVar(), planet, simulationSpeed);
        drawPlanet(planet, systemOrigin, planet.name === celestial.name);
      });

      setPlanets(tempPlanets);
    });
  }, []);

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
      app.ticker.add(selectedIndicatorTickerRef.current);
    }
  };

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
