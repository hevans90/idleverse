/* eslint-disable react-hooks/exhaustive-deps */
import {
  Celestial,
  ClaimedCelestialAttributes,
  GalaxyConfig,
  generateCelestialsWithClaimed,
  getCelestialIdHash,
  getCelestialPosition,
} from '@idleverse/galaxy-gen';
import { colors } from '@idleverse/theme';
import { useApp } from '@inlet/react-pixi';
import { Container, Graphics } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { colorsVar } from '../../_state/colors';
import {
  galaxyConfigVar,
  galaxyRotationVar,
} from '../../_state/reactive-variables';
import {
  claimStar,
  Star,
  unclaimStar,
} from '../galaxy-generator/graphics/star';
import { useFpsTracker } from '../galaxy-generator/utils/fps-counter';
import { useResize } from '../_utils/use-resize.hook';
import { useViewport } from '../_utils/use-viewport.hook';
import {
  claimedCelestials,
  diffOwnedCelestials,
} from './utils/diff-owned-celestials';

type GalaxyViewerProps = {
  galaxyConfig: GalaxyConfig;
  claimedCelestials: claimedCelestials;
  navigate: ReturnType<typeof useNavigate>;
};

export const GalaxyViewer = ({
  galaxyConfig,
  claimedCelestials,
  navigate,
}: GalaxyViewerProps) => {
  const app = useApp();

  const claimedCelestialsRef = useRef<claimedCelestials>(claimedCelestials);

  const galaxyContainerRef = useRef(new Container());
  const stars = useRef<(Celestial & ClaimedCelestialAttributes)[]>(null);

  const updateGalaxyRotation = (galaxy: Container) => (delta: number) => {
    galaxy.rotation += delta * galaxyRotationVar();

    galaxy.children.forEach((child) => (child.rotation = -galaxy.rotation));
  };

  const size = useResize();

  const reposition = () =>
    stars.current.forEach((star, i) => {
      const _star = galaxyContainerRef.current.getChildAt(i) as Graphics;
      const position = getCelestialPosition(star, galaxyConfig);
      _star.x = position.x;
      _star.y = position.y;
    });

  const navigateToCelestial = (id: string) => navigate(`/celestials/${id}`);

  useViewport(app, size, galaxyContainerRef);

  useFpsTracker(app, size);

  useEffect(() => {
    galaxyContainerRef.current.name = 'galaxy';

    galaxyContainerRef.current.x = size.width / 2;
    galaxyContainerRef.current.y = size.height / 2;

    galaxyContainerRef.current.sortableChildren = true;

    app.ticker.add(updateGalaxyRotation(galaxyContainerRef.current));

    stars.current = generateCelestialsWithClaimed(
      galaxyConfig.stars,
      galaxyConfig.seed,
      claimedCelestialsRef.current.map((x) => x.id)
    );

    stars.current.forEach((star) => {
      const { x, y } = getCelestialPosition(star, galaxyConfigVar());

      // THIS IS EXPENSIVE
      const id = getCelestialIdHash(star.constants);

      let ownerId: string;

      if (star.isClaimed) {
        const celestial = claimedCelestialsRef.current.find(
          ({ id: celestialId }) => celestialId === id
        );

        ownerId = celestial.owner_id;
      }

      const _star = Star({
        x,
        y,
        id,
        isClaimed: star.isClaimed,
        ownerId,
        claimedCol: colors[colorsVar().secondary]['300'],
        unclaimedCol: colors[colorsVar().secondary]['200'],
      });

      if (_star.children.length > 1) {
        const avatar = _star.getChildByName('avatar') as Graphics;

        avatar.on('mousedown', () => {
          navigateToCelestial(id);
        });
      }

      galaxyContainerRef.current.addChild(_star);
    });

    reposition();
  }, []);

  useEffect(() => {
    const { additions, deletions } = diffOwnedCelestials(
      claimedCelestialsRef.current,
      claimedCelestials
    );

    claimedCelestialsRef.current = claimedCelestials;

    additions?.forEach(({ id, owner_id }) =>
      claimStar(
        id,
        owner_id,
        galaxyContainerRef.current,
        colors[colorsVar().secondary]['300'],
        navigateToCelestial
      )
    );
    deletions?.forEach(({ id }) =>
      unclaimStar(
        id,
        galaxyContainerRef.current,
        colors[colorsVar().secondary]['200']
      )
    );
  }, [claimedCelestials]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
