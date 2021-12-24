/* eslint-disable react-hooks/exhaustive-deps */
import {
  Celestial,
  ClaimedCelestialAttributes,
  GalaxyConfig,
  generateCelestialsWithClaimed,
  getCelestialPositionAndId,
} from '@idleverse/galaxy-gen';
import { useApp } from '@inlet/react-pixi';
import { Container, Graphics } from 'pixi.js';
import { useEffect, useRef } from 'react';
import {
  galaxyConfigVar,
  galaxyRotationVar,
} from '../../_state/reactive-variables';
import { useResize } from '../common-utils/use-resize.hook';
import { useViewport } from '../common-utils/use-viewport';
import {
  claimStar,
  Star,
  unclaimStar,
} from '../galaxy-generator/graphics/star';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import {
  claimedCelestials,
  diffOwnedCelestials,
} from './utils/diff-owned-celestials';

type GalaxyViewerProps = {
  galaxyConfig: GalaxyConfig;
  claimedCelestials: claimedCelestials;
};

export const GalaxyViewer = ({
  galaxyConfig,
  claimedCelestials,
}: GalaxyViewerProps) => {
  const app = useApp();

  const claimedCelestialsRef = useRef<claimedCelestials>(claimedCelestials);

  const galaxyContainer = useRef(new Container());
  const stars = useRef<(Celestial & ClaimedCelestialAttributes)[]>(null);

  const updateGalaxyRotation = (galaxy: Container) => (delta: number) => {
    galaxy.rotation += delta * galaxyRotationVar();
  };

  const size = useResize(false);

  const reposition = () =>
    stars.current.forEach((star, i) => {
      const _star = galaxyContainer.current.getChildAt(i) as Graphics;
      const position = getCelestialPositionAndId(star, galaxyConfig);
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

    stars.current = generateCelestialsWithClaimed(
      galaxyConfig.stars,
      galaxyConfig.seed,
      claimedCelestialsRef.current.map((x) => x.id)
    );

    stars.current.forEach((star) => {
      const { x, y, id } = getCelestialPositionAndId(star, galaxyConfigVar());

      const _star = Star({
        x,
        y,
        id,
        isClaimed: star.isClaimed,
      });

      galaxyContainer.current.addChild(_star);
    });

    reposition();
  }, []);

  useEffect(() => {
    const findStar = (id: string) =>
      stars.current.find(({ hashedConstants }) => id === hashedConstants);

    const { additions, deletions } = diffOwnedCelestials(
      claimedCelestialsRef.current,
      claimedCelestials
    );

    additions?.forEach(({ id }) =>
      claimStar(
        getCelestialPositionAndId(findStar(id), galaxyConfigVar()),
        galaxyContainer.current
      )
    );
    deletions?.forEach(({ id }) =>
      unclaimStar(
        getCelestialPositionAndId(findStar(id), galaxyConfigVar()),
        galaxyContainer.current
      )
    );
  }, [claimedCelestials]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
