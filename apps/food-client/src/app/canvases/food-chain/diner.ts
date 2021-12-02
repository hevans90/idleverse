import * as PIXI from 'pixi.js';

const dinerTexture = PIXI.Texture.from('https://i.imgur.com/gPK9T8l.png');

export const createDinerSprite = (ts: number) => {
  const dinerSprite = new PIXI.Sprite(dinerTexture);

  dinerSprite.width = ts * 2;
  dinerSprite.height = ts * 2;

  dinerSprite.interactive = true;
  dinerSprite.buttonMode = true;
  // dinerSprite.on('pointerdown', () => {
  //   let time = 0;
  //   diner.prevPosition.x = dinerSprite.position.x;
  //   diner.prevPosition.y = dinerSprite.position.y;
  //   const randomPosition = getRandomValidPosition(dinerSprite);
  //   diner.nextPosition.x = randomPosition.i * ts + 2;
  //   diner.nextPosition.y = randomPosition.j * ts + 2;
  //   animations.push(() => {
  //     time += 1;
  //     if (diner.time < diner.duration) {
  //       dinerSprite.position.x =
  //         diner.prevPosition.x +
  //         (diner.nextPosition.x - diner.prevPosition.x) *
  //           (diner.time / diner.duration);
  //       dinerSprite.position.y =
  //         diner.prevPosition.y +
  //         (diner.nextPosition.y - diner.prevPosition.y) *
  //           (diner.time / diner.duration);
  //     } else {
  //       dinerSprite.x = diner.nextPosition.x;
  //       dinerSprite.y = diner.nextPosition.y;
  //       diner.prevPosition = { ...diner.nextPosition };
  //       animations.splice(0, 1);
  //     }
  //   });
  // });

  return dinerSprite;
};
