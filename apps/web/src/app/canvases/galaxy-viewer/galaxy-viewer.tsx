/* eslint-disable react-hooks/exhaustive-deps */
import {
  Celestial,
  ClaimedCelestialAttributes,
  GalaxyConfig,
  generateCelestialsWithClaimed,
  getCelestialPosition,
} from '@idleverse/galaxy-gen';
import { CelestialsByGalaxyIdSubscription } from '@idleverse/galaxy-gql';
import { useApp } from '@inlet/react-pixi';
import { Container, Graphics } from 'pixi.js';
import { useEffect, useRef } from 'react';
import {
  galaxyConfigVar,
  galaxyRotationVar,
} from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { useViewport } from '../common-utils/use-viewport';
import { Star } from '../galaxy-generator/graphics/star';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';

type GalaxyViewerProps = {
  galaxyConfig: GalaxyConfig;
  claimedCelestials: CelestialsByGalaxyIdSubscription['galaxy_by_pk']['celestials'];
};

export const GalaxyViewer = ({
  galaxyConfig,
  claimedCelestials,
}: GalaxyViewerProps) => {
  const app = useApp();

  const galaxyContainer = useRef(new Container());
  const stars = useRef<(Celestial & ClaimedCelestialAttributes)[]>(null);

  const updateGalaxyRotation = (galaxy: Container) => (delta: number) => {
    galaxy.rotation += delta * galaxyRotationVar();
  };

  const size = useResize(false);

  const reposition = () =>
    stars.current.forEach((star, i) => {
      const _star = galaxyContainer.current.getChildAt(i) as Graphics;
      const position = getCelestialPosition(star, galaxyConfig);
      _star.x = position.x;
      _star.y = position.y;
    });

  useViewport(app, size, galaxyContainer, true);

  useFpsTracker(app, size);

  useEffect(() => {
    galaxyContainer.current.name = 'galaxy';

    galaxyContainer.current.x = size.width / 2;
    galaxyContainer.current.y = size.height / 2;

    app.ticker.add(updateGalaxyRotation(galaxyContainer.current));

    //todo draw dynamic
    stars.current = generateCelestialsWithClaimed(
      galaxyConfig.stars,
      galaxyConfig.seed,
      claimedCelestials.map((x) => x.id)
    );

    stars.current.forEach((star) => {
      const _star = Star({
        ...getCelestialPosition(star, galaxyConfigVar()),
        isClaimed: star.isClaimed,
      });
      galaxyContainer.current.addChild(_star);
    });

    reposition();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
