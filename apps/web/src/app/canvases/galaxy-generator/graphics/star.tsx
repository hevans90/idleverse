import { getCelestialPositionAndId } from '@idleverse/galaxy-gen';
import * as PIXI from 'pixi.js';
import { Container } from 'pixi.js';

export type StarProps = {
  id: string;
  x: number;
  y: number;
  isClaimed?: boolean;
};

const claimedCol = 0xff0000;
const claimedRadius = 4;
const unclaimedCol = 0xffffff;
const unclaimedRadius = 2;

export const Star = ({ x, y, isClaimed, id }: Partial<StarProps>) => {
  const r = isClaimed ? claimedRadius : unclaimedRadius;

  const g = new PIXI.Graphics()
    .clear()
    .beginFill(isClaimed ? claimedCol : unclaimedCol)
    .drawCircle(0, 0, r)
    .endFill();

  if (isClaimed) {
    g.lineStyle({ width: 2, color: claimedCol }).moveTo(0, 0).lineTo(0, -20);
  }

  g.name = id;
  g.x = x;
  g.y = y;

  return g;
};

export const claimStar = (
  { id }: ReturnType<typeof getCelestialPositionAndId>,
  container: Container
) =>
  (container.getChildByName(id) as PIXI.Graphics)
    .clear()
    .beginFill(claimedCol)
    .drawCircle(0, 0, claimedRadius)
    .endFill();

export const unclaimStar = (
  { id }: ReturnType<typeof getCelestialPositionAndId>,
  container: Container
) =>
  (container.getChildByName(id) as PIXI.Graphics)
    .clear()
    .beginFill(unclaimedCol)
    .drawCircle(0, 0, unclaimedRadius)
    .endFill();
