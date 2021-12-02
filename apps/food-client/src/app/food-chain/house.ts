import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { ts } from './utils/constants';

export type House = BoardObject & {
  orient: number;
  num: number;
};

export const isHouse = (boardObject: BoardObject): boardObject is House => {
  const house = boardObject as House;
  return house['orient'] !== undefined && house.num !== undefined;
};

const houseTextures: { [key: string]: PIXI.Texture } = {
  1: PIXI.Texture.from('https://i.imgur.com/rGgNlV1.png'),
  2: PIXI.Texture.from('https://i.imgur.com/OYDsDs7.png'),
  3: PIXI.Texture.from('https://i.imgur.com/rGgNlV1.png'),
  4: PIXI.Texture.from('https://i.imgur.com/jYSXUk0.png'),
};

export const createHouseSprite = (house: House) => {
  const houseSprite = new PIXI.Sprite(houseTextures[house.orient]);
  houseSprite.width = ts * 2 - 4;
  houseSprite.height = ts * 2 - 4;
  const houseNum = new PIXI.Text(
    house.num.toString(),
    new PIXI.TextStyle({
      fontFamily: 'zx-spectrum',
      fontSize: 24,
      fontWeight: 'bold',
      fill: '#ffffff',
    })
  );
  houseNum.position.x = 5;
  houseNum.position.y = 5;

  // const baseTexture = new PIXI.BaseRenderTexture({
  //   width: ts * 4,
  //   height: ts * 4,
  // });
  // const renderTexture = new PIXI.RenderTexture(baseTexture);

  // app.renderer.render(houseSprite, { renderTexture });
  //app.renderer.render(houseNum, { renderTexture });

  return houseSprite;
};
