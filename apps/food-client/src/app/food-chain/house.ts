import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { Diner } from './diner';
import { FoodKind } from './food';
import { Tile } from './tile';
import { rotationConstants, ts } from './utils/constants';
import { createSprite } from './utils/graphics-utils';
import { app, board, mainLayer } from './utils/singletons';

const houseTextures: { [key: string]: PIXI.Texture } = {
  1: PIXI.Texture.from('https://i.imgur.com/Oy8pcaB.png'),
  2: PIXI.Texture.from('https://i.imgur.com/kYdPrX7.png'),
  3: PIXI.Texture.from('https://i.imgur.com/Oy8pcaB.png'),
  4: PIXI.Texture.from('https://i.imgur.com/Rngqwb3.png'),
};

export type House = BoardObject & {
  orient: number;
  num: number;
  food: { kind: FoodKind; sprite: PIXI.Sprite }[];
  demandContainer?: PIXI.Container;
};

export const isHouse = (boardObject: BoardObject): boardObject is House => {
  const house = boardObject as House;
  return house['orient'] !== undefined && house.num !== undefined;
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

export const rotateHouse = (
  chunk: Tile[],
  oldTile: Tile,
  house: House,
  rotation: keyof typeof rotationConstants
) => {
  oldTile.occupants = [];
  const newTile = chunk.find(
    (tile) =>
      tile.i === oldTile.i + rotationConstants[rotation].occupant.i &&
      tile.j === oldTile.j + rotationConstants[rotation].occupant.j
  );
  newTile.occupants.push(house);
  let newOrient = house.orient - 1;
  newOrient = (newOrient + rotation) % 4;
  house.orient = newOrient + 1;
};

export const parseHouseConfig = (config: RegExpExecArray) => {
  const house: House = {
    w: 2,
    h: 2,
    orient: parseInt(config[2]),
    num: parseInt(config[3]),
    container: new PIXI.Container(),
    food: [],
  };
  house.container.parentLayer = mainLayer;
  house.container.zOrder = 1;
  return house;
};

export const addHouseToBoard = (house: House) => {
  house.container.x += 1;
  house.container.y += 1;
  house.sprite = createHouseSprite(house);
  house.container.addChild(house.sprite);
  board.houses.push(house);
};

export const addFoodToHouse = (house: House, foodKind: FoodKind) => {
  house.food.push({
    kind: foodKind,
    sprite: createSprite(foodKind.name, ts),
  });
};

export const renderHouseFood = (house: House) => {
  if (house.demandContainer) house.demandContainer.destroy();
  if (house.food.length > 0) {
    house.demandContainer = new PIXI.Container();
    const demandBubbleSprite = createSprite('demandBubble', 160);
    house.demandContainer.addChild(demandBubbleSprite);
    house.food.forEach((food, i) => {
      const foodSprite = createSprite(food.kind.name, ts);
      foodSprite.position.x = i * 30 + 5;
      foodSprite.position.y = 5;
      house.demandContainer.addChild(foodSprite);
    });
    house.demandContainer.position.y = -90;
    house.container.addChild(house.demandContainer);
    house.demandContainer.parentLayer = mainLayer;
    house.demandContainer.zOrder = 6;
  }
};

export const aggregateFood = (house: House) => {
  const aggregatedFood: { [key: string]: number } = {};
  house.food.forEach((foodItem) => {
    if (aggregatedFood[foodItem.kind.name]) {
      aggregatedFood[foodItem.kind.name]++;
    } else aggregatedFood[foodItem.kind.name] = 1;
  });
  return aggregatedFood;
};

export const satisfiesFood = (diner: Diner, house: House) => {
  console.log(
    `Checking if house ${house.num} is satisfied by diner of ${diner.owner.name}`
  );
  const houseFood = aggregateFood(house);
  if (Object.keys(houseFood).length === 0) return false;
  let satisfies = true;
  Object.entries(houseFood).forEach((food) => {
    const foodName = food[0];
    const foodAmount = food[1];
    if (diner.owner.food[foodName].amount < foodAmount) {
      satisfies = false;
    }
  });
  return satisfies;
};
