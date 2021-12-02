import { Anim } from './animation';
import { Board, getAdjacentRoads } from './board';
import { Road } from './road';
import { createCarSprite, ts } from './utils/constants';
import { createAnimationsFromPath } from './utils/graphics-utils';
import { findRoadPath } from './utils/utils';

export const triggerCarAnimation = (board: Board, road: Road) => {
  const path = findRoadPath(board, getAdjacentRoads(board, board.diner), road);
  //const carTexture = PIXI.Texture.from('https://i.imgur.com/01q7OGv.png');
  const carSprite = createCarSprite();
  carSprite.play();
  board.container.addChild(carSprite);
  carSprite.anchor.x = 0.5;
  carSprite.anchor.y = 0.5;
  const scaleFactor = ts / carSprite.height;
  carSprite.scale.x = scaleFactor;
  carSprite.scale.y = scaleFactor;
  const queue: Anim[] = [];
  if (path.length > 1) {
    createAnimationsFromPath(board, queue, path, carSprite, 20);
    createAnimationsFromPath(
      board,
      queue,
      [path[path.length - 1], path[path.length - 1]],
      carSprite,
      100
    );
    path.reverse();
    createAnimationsFromPath(board, queue, path, carSprite, 20);

    board.container.addChild(carSprite);
    queue[0].start();
  } else if (path.length === 1) {
    createAnimationsFromPath(board, queue, [road, road], carSprite, 150);

    board.container.addChild(carSprite);
    queue[0].start();
  }
};
