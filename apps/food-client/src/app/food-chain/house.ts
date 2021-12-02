import * as PIXI from 'pixi.js';
import { Board, BoardObject, getAdjacentRoads } from './board';
import { ts } from './utils/constants';
import { app } from './utils/singletons';

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
  houseSprite.width = ts * 2 - 2;
  houseSprite.height = ts * 2 - 2;
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
  const renderContainer = new PIXI.Container();
  renderContainer.addChild(houseSprite, houseNum);

  const baseTexture = new PIXI.BaseRenderTexture({
    width: ts * 2 - 2,
    height: ts * 2 - 2,
  });
  const renderTexture = new PIXI.RenderTexture(baseTexture);

  app.renderer.render(renderContainer, { renderTexture });

  return new PIXI.Sprite(renderTexture);
};

export const parseHouseConfig = (config: RegExpExecArray, zOffset: number) => {
  const house: House = {
    w: 2,
    h: 2,
    orient: parseInt(config[2]),
    num: parseInt(config[3]),
    container: new PIXI.Container(),
  };
  house.sprite = createHouseSprite(house);
  house.container.addChild(house.sprite);
  house.container.zIndex = 10 + zOffset;
  return house;
};

export const addHouseToBoard = (board: Board, house: House) => {
  house.container.x += 1;
  house.container.y += 1;
  house.container.interactive = true;
  house.container.buttonMode = true;
  house.container.on('pointerdown', () => {
    const adjacentRoads = getAdjacentRoads(board, house);
    board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
    adjacentRoads.forEach((road) => (road.sprite.tint = 0x9b39f7));
    console.log(house);
  });
  board.houses.push(house);
};
