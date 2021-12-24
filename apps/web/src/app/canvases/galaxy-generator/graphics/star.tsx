import { getCelestialPositionAndId } from '@idleverse/galaxy-gen';
import * as PIXI from 'pixi.js';
import { Container } from 'pixi.js';

export type StarProps = {
  id: string;
  x: number;
  y: number;
  isClaimed?: boolean;
  avatarUrl?: string;
};

const claimedCol = 0xff0000;
const claimedRadius = 4;
const unclaimedCol = 0xffffff;
const unclaimedRadius = 2;

export const Star = ({
  x,
  y,
  isClaimed,
  id,
  avatarUrl,
}: Partial<StarProps>) => {
  const container = new PIXI.Container();

  const r = isClaimed ? claimedRadius : unclaimedRadius;

  const g = new PIXI.Graphics()
    .clear()
    .beginFill(isClaimed ? claimedCol : unclaimedCol)
    .drawCircle(0, 0, r)
    .endFill();

  if (isClaimed) {
    g.lineStyle({ width: 2, color: claimedCol }).moveTo(0, 0).lineTo(0, -20);
    const texture = PIXI.Texture.from(avatarUrl);

    const g2 = new PIXI.Graphics()
      .beginTextureFill({
        texture,
        matrix: new PIXI.Matrix(0.5, 0, 0, 0.5, 24, 24),
      })
      .drawCircle(0, 0, 24)
      .endFill();

    g2.y = -44;
    container.zIndex = 2;
    container.addChild(g2);
  } else {
    container.zIndex = 1;
  }

  g.name = id;

  container.x = x;
  container.y = y;

  container.addChild(g);

  return container;
};

export const claimStar = (
  { id }: ReturnType<typeof getCelestialPositionAndId>,
  container: Container
) =>
  (container.getChildByName(id, true) as PIXI.Graphics)
    .clear()
    .beginFill(claimedCol)
    .drawCircle(0, 0, claimedRadius)
    .endFill();

export const unclaimStar = (
  { id }: ReturnType<typeof getCelestialPositionAndId>,
  container: Container
) =>
  (container.getChildByName(id, true) as PIXI.Graphics)
    .clear()
    .beginFill(unclaimedCol)
    .drawCircle(0, 0, unclaimedRadius)
    .endFill();
