/* eslint-disable react-hooks/exhaustive-deps */
import { LazyQueryExecFunction, OperationVariables } from '@apollo/client';
import {
  Celestial,
  ClaimedCelestialAttributes,
  GalaxyConfig,
  generateCelestialsWithClaimed,
  getCelestialIdHash,
  getCelestialPosition,
} from '@idleverse/galaxy-gen';
import { UserInfoByIdQuery } from '@idleverse/galaxy-gql';
import { colors } from '@idleverse/theme';
import { Container as ReactPixiContainer, useApp } from '@pixi/react';
import { Container, Graphics } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  colorsVar,
  galaxyConfigVar,
  galaxyRotationVar,
} from '@idleverse/state';
import { Viewport } from 'pixi-viewport';
import { loadAvatarByUserId } from '../../asset-loading/load-user-by-id';
import { useResize } from '../_utils/use-resize.hook';
import {
  Star,
  claimStar,
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
  navigate: ReturnType<typeof useNavigate>;
  newUserQuery: LazyQueryExecFunction<UserInfoByIdQuery, OperationVariables>;
  viewportRef: React.MutableRefObject<Viewport>;
  center: { x: number; y: number };
};

export const GalaxyViewer = ({
  center,
  viewportRef,
  galaxyConfig,
  claimedCelestials,
  navigate,
  newUserQuery,
}: GalaxyViewerProps) => {
  const app = useApp();

  const size = useResize();

  const claimedCelestialsRef = useRef<claimedCelestials>(claimedCelestials);

  const galaxyContainerRef = useRef(new Container());
  const stars = useRef<(Celestial & ClaimedCelestialAttributes)[]>(null);

  const updateGalaxyRotation = (galaxy: Container) => (delta: number) => {
    galaxy.rotation += delta * galaxyRotationVar();

    galaxy.children.forEach((child) => (child.rotation = -galaxy.rotation));
  };

  const reposition = () =>
    stars.current.forEach((star, i) => {
      const _star = galaxyContainerRef.current.getChildAt(i) as Graphics;
      const position = getCelestialPosition(star, galaxyConfig);
      _star.x = position.x;
      _star.y = position.y;
    });

  const navigateToCelestial = (name: string) => navigate(`/celestials/${name}`);

  useEffect(() => {
    galaxyContainerRef.current.name = 'galaxy';

    galaxyContainerRef.current.sortableChildren = true;

    app.ticker?.add(updateGalaxyRotation(galaxyContainerRef.current));

    stars.current = generateCelestialsWithClaimed(
      galaxyConfig.stars,
      galaxyConfig.seed,
      claimedCelestialsRef.current.map((x) => x.id)
    );

    stars.current.forEach((star) => {
      const { x, y } = getCelestialPosition(star, galaxyConfigVar());

      // THIS IS EXPENSIVE
      const id = getCelestialIdHash(star.constants);

      let celestialName: string;
      let ownerId: string;

      if (star.isClaimed) {
        const celestial = claimedCelestialsRef.current.find(
          ({ id: celestialId }) => celestialId === id
        );

        ownerId = celestial.owner_id;
        celestialName = celestial.name;
      }

      const _star = Star({
        x,
        y,
        id,
        isClaimed: star.isClaimed,
        name: celestialName,
        ownerId,
        claimedCol: colors[colorsVar().secondary]['400'],
        unclaimedCol: colors[colorsVar().secondary]['200'],
      });

      if (_star.children.length > 1) {
        const avatar = _star.getChildByName('avatar') as Graphics;

        avatar.on('mousedown', () => {
          navigateToCelestial(celestialName);
        });
      }

      galaxyContainerRef.current.addChild(_star);
    });

    viewportRef?.current.snap(center.x, center.y);

    setTimeout(() => {
      viewportRef?.current.snapZoom({
        height: size.height,
        removeOnComplete: true,
      });
    }, 100);

    reposition();
  }, []);

  useEffect(() => {
    const { additions, deletions } = diffOwnedCelestials(
      claimedCelestialsRef.current,
      claimedCelestials
    );

    claimedCelestialsRef.current = claimedCelestials;

    additions?.forEach(({ id, owner_id }) => {
      loadAvatarByUserId(owner_id, newUserQuery).then((avatarTexture) =>
        claimStar(
          id,
          owner_id,
          galaxyContainerRef.current,
          colors[colorsVar().secondary]['300'],
          navigateToCelestial,
          avatarTexture
        )
      );
    });
    deletions?.forEach(({ id }) =>
      unclaimStar(
        id,
        galaxyContainerRef.current,
        colors[colorsVar().secondary]['200']
      )
    );
  }, [claimedCelestials]);

  useFpsTracker(app);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <ReactPixiContainer
      ref={galaxyContainerRef}
      position={{ x: center.x, y: center.y }}
    />
  );
};
