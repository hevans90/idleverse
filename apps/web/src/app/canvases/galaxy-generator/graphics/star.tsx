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
const unclaimedCol = 0xffffff;

export const Star = ({ x, y, isClaimed, id }: Partial<StarProps>) => {
  const g = new PIXI.Graphics()
    .clear()
    .beginFill(isClaimed ? claimedCol : unclaimedCol)
    .drawCircle(x, y, isClaimed ? 5 : 1)
    .endFill();

  g.name = id;

  return g;
};

export const claimStar = (
  { x, y, id }: ReturnType<typeof getCelestialPositionAndId>,
  container: Container
) =>
  (container.getChildByName(id) as PIXI.Graphics)
    .clear()
    .beginFill(claimedCol)
    .drawCircle(x, y, 3)
    .endFill();

export const unclaimStar = (
  { x, y, id }: ReturnType<typeof getCelestialPositionAndId>,
  container: Container
) =>
  (container.getChildByName(id) as PIXI.Graphics)
    .clear()
    .beginFill(unclaimedCol)
    .drawCircle(x, y, 1)
    .endFill();
