import { Road } from './road';
import { ts } from './utils/constants';
import { addSpriteToBoard, travelPath } from './utils/graphics-utils';
import { board } from './utils/singletons';

export const triggerPathAnimation = async (
  path: Road[],
  spriteName: string
) => {
  // const carSprite = createAnimatedCarSprite();
  // carSprite.play();
  const car = addSpriteToBoard(spriteName, ts * 1.2);
  if (path.length > 1) {
    const firstRoad = path[0];
    await travelPath([firstRoad, firstRoad], car.container, car.sprite, 200);
    await travelPath(path, car.container, car.sprite, 20);
    const lastRoad = path[path.length - 1];
    await travelPath([lastRoad, lastRoad], car.container, car.sprite, 100);
    path.reverse();
    await travelPath(path, car.container, car.sprite, 20);
    await travelPath([firstRoad, firstRoad], car.container, car.sprite, 100);
  } else if (path.length === 1) {
    await travelPath([path[0], path[0]], car.container, car.sprite, 400);
  }
  board.container.removeChild(car.container);
};
