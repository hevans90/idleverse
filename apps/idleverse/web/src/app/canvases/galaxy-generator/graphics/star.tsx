import * as PIXI from 'pixi.js';
import { Container } from 'pixi.js';
import { userAvatarResourcesVar } from '../../../_state/reactive-variables';
import { theme } from '../../../_theme/theme';

const themeColToHex = (val: string) => parseInt(val.replace(/^#/, ''), 16);

export type StarProps = {
  id: string;
  x: number;
  y: number;
  isClaimed?: boolean;
  ownerId?: string;
};

const claimedCol = themeColToHex(theme.colors.red['300']);
const claimedRadius = 4;
const unclaimedCol = themeColToHex(theme.colors.teal['200']);
const unclaimedRadius = 2;
const userIndicatorRadius = 24;
const userIndicatorLineHeight = 20;

const styleOwnedStar = (ownerId: string) => {
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

export const Star = ({ x, y, isClaimed, id, ownerId }: Partial<StarProps>) => {
  const container = new PIXI.Container();

  const r = isClaimed ? claimedRadius : unclaimedRadius;

  let starGraphic = new PIXI.Graphics()
    .clear()
    .beginFill(isClaimed ? claimedCol : unclaimedCol)
    .drawCircle(0, 0, r)
    .endFill();

  if (isClaimed) {
    const { starGraphic: ownedStarGraphic, avatarGraphic } =
      styleOwnedStar(ownerId);

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
  parentContainer: Container
) => {
  const starContainer = parentContainer.getChildByName(id, true) as Container;
  starContainer.removeChildren();

  const { starGraphic, avatarGraphic } = styleOwnedStar(ownerId);

  starContainer.zIndex = 2;
  starContainer.addChild(starGraphic, avatarGraphic);
};

export const unclaimStar = (id: string, parentContainer: Container) => {
  const starContainer = parentContainer.getChildByName(id, true) as Container;
  starContainer.removeChildren();

  const starGraphic = new PIXI.Graphics()
    .clear()
    .beginFill(unclaimedCol)
    .drawCircle(0, 0, unclaimedRadius)
    .endFill();

  starContainer.addChild(starGraphic);
};
