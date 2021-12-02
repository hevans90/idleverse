import { Road } from './road';
import { createCarSprite, ts } from './utils/constants';
import { travelPath } from './utils/graphics-utils';
import { board } from './utils/singletons';

export const triggerCarAnimation = async (path: Road[]) => {
  //const carTexture = PIXI.Texture.from('https://i.imgur.com/01q7OGv.png');
  const carSprite = createCarSprite();
  carSprite.play();
  board.container.addChild(carSprite);
  carSprite.anchor.x = 0.5;
  carSprite.anchor.y = 0.5;
  const scaleFactor = ts / carSprite.height;
  carSprite.scale.x = scaleFactor;
  carSprite.scale.y = scaleFactor;
  board.container.addChild(carSprite);
  if (path.length > 1) {
    await travelPath(path, carSprite, 20);
    const lastRoad = path[path.length - 1];
    await travelPath([lastRoad, lastRoad], carSprite, 100);
    path.reverse();
    await travelPath(path, carSprite, 20);
  } else if (path.length === 1) {
    await travelPath([path[0], path[0]], carSprite, 150);
  }
  board.container.removeChild(carSprite);
};
