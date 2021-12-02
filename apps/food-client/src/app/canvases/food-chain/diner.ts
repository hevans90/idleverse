import * as PIXI from 'pixi.js';

const dinerTexture = PIXI.Texture.from('https://i.imgur.com/gPK9T8l.png');

export const createDinerSprite = (ts: number) => {
  const dinerSprite = new PIXI.Sprite(dinerTexture);

  dinerSprite.width = ts * 2;
  dinerSprite.height = ts * 2;

  return dinerSprite;
};
