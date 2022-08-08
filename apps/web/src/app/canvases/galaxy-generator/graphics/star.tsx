import { hexStringToNumber } from '@idleverse/theme';
import * as PIXI from 'pixi.js';
import { Container } from 'pixi.js';
import { userAvatarResourcesVar } from '../../../_state/reactive-variables';

export type StarProps = {
  id: string;
  x: number;
  y: number;
  claimedCol: string;
  unclaimedCol: string;
  isClaimed?: boolean;
  ownerId?: string;
};

const claimedRadius = 4;
const unclaimedRadius = 2;
const userIndicatorRadius = 24;
const userIndicatorLineHeight = 20;

const styleOwnedStar = (ownerId: string, claimedCol: number) => {
  const starGraphic = new PIXI.Graphics()
    .clear()
    .beginFill(claimedCol)
    .drawCircle(0, 0, claimedRadius)
    .endFill();

  starGraphic
    .lineStyle({ width: 2, color: claimedCol })
    .moveTo(0, 0)
    .lineTo(0, -userIndicatorLineHeight);

  const avatarTexture = userAvatarResourcesVar()?.[ownerId]?.texture;

  if (!avatarTexture) {
    console.warn(`no texture found for ${ownerId}`);
  }

  const { height, width } = avatarTexture || { height: null, width: null };

  const avatarGraphic = avatarTexture
    ? new PIXI.Graphics()
        .beginTextureFill({
          texture: avatarTexture,
          matrix: new PIXI.Matrix(0.5, 0, 0, 0.5, width / 4, height / 4),
        })
        .drawCircle(0, 0, userIndicatorRadius)
        .endFill()
    : new PIXI.Graphics()
        .beginFill(claimedCol)
        .drawCircle(0, 0, userIndicatorRadius)
        .endFill();

  avatarGraphic.interactive = true;
  avatarGraphic.cursor = 'pointer';

  avatarGraphic.y = -(userIndicatorLineHeight + userIndicatorRadius);

  avatarGraphic.name = 'avatar';

  return {
    starGraphic,
    avatarGraphic,
  };
};

export const Star = ({
  x,
  y,
  isClaimed,
  id,
  ownerId,
  claimedCol,
  unclaimedCol,
}: Partial<StarProps>) => {
  const container = new PIXI.Container();

  const r = isClaimed ? claimedRadius : unclaimedRadius;

  let starGraphic = new PIXI.Graphics()
    .clear()
    .beginFill(
      isClaimed
        ? hexStringToNumber(claimedCol)
        : hexStringToNumber(unclaimedCol)
    )
    .drawCircle(0, 0, r)
    .endFill();

  if (isClaimed) {
    const { starGraphic: ownedStarGraphic, avatarGraphic } = styleOwnedStar(
      ownerId,
      hexStringToNumber(claimedCol)
    );

    starGraphic = ownedStarGraphic;

    container.zIndex = 2;
    container.addChild(avatarGraphic);
  } else {
    container.zIndex = 1;
  }

  container.name = id;

  container.x = x;
  container.y = y;

  container.addChild(starGraphic);

  return container;
};

export const claimStar = (
  id: string,
  ownerId: string,
  parentContainer: Container,
  claimedCol: string,
  navigationFunction: (id: string) => void
) => {
  const starContainer = parentContainer.getChildByName(id, true) as Container;
  starContainer.removeChildren();

  const { starGraphic, avatarGraphic } = styleOwnedStar(
    ownerId,
    hexStringToNumber(claimedCol)
  );

  avatarGraphic.on('mousedown', () => {
    navigationFunction(id);
  });

  starContainer.zIndex = 2;
  starContainer.addChild(starGraphic, avatarGraphic);
};

export const unclaimStar = (
  id: string,
  parentContainer: Container,
  unclaimedCol: string
) => {
  const starContainer = parentContainer.getChildByName(id, true) as Container;
  starContainer.removeChildren();

  const starGraphic = new PIXI.Graphics()
    .clear()
    .beginFill(hexStringToNumber(unclaimedCol))
    .drawCircle(0, 0, unclaimedRadius)
    .endFill();

  starContainer.addChild(starGraphic);
};
