import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { ts } from './utils/constants';

export type House = BoardObject & {
  orient: number;
  num: number;
};

const houseTextures = {
  1: PIXI.Texture.from('https://i.imgur.com/rGgNlV1.png'),
  2: PIXI.Texture.from('https://i.imgur.com/OYDsDs7.png'),
  3: PIXI.Texture.from('https://i.imgur.com/rGgNlV1.png'),
  4: PIXI.Texture.from('https://i.imgur.com/jYSXUk0.png'),
};

export const createHouseSprite = (house: House) => {
  const houseContainer = new PIXI.Container();
  const orient = house.orient;
  const houseSprite = new PIXI.Sprite(houseTextures[orient]);
  houseSprite.width = ts * 2;
  houseSprite.height = ts * 2;
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

  houseContainer.addChild(houseSprite, houseNum);

  return houseContainer;
};
