import * as PIXI from 'pixi.js';
import { Board, BoardObject } from './board';
import { Diner } from './diner';
import { createFoodSprite, FoodKind } from './food';
import { ts } from './utils/constants';
import { demandBubbleTexture } from './utils/graphics';
import { createSprite } from './utils/graphics-utils';
import { app } from './utils/singletons';

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

const houseTextures: { [key: string]: PIXI.Texture } = {
  1: PIXI.Texture.from('https://i.imgur.com/Oy8pcaB.png'),
  2: PIXI.Texture.from('https://i.imgur.com/kYdPrX7.png'),
  3: PIXI.Texture.from('https://i.imgur.com/Oy8pcaB.png'),
  4: PIXI.Texture.from('https://i.imgur.com/Rngqwb3.png'),
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
    food: [],
  };
  house.sprite = createHouseSprite(house);
  house.container.addChild(house.sprite);
  house.container.zIndex = 40 + zOffset;
  return house;
};

export const addHouseToBoard = (board: Board, house: House) => {
  house.container.x += 1;
  house.container.y += 1;
  house.container.interactive = true;
  house.container.buttonMode = true;
  house.container.on('pointerdown', () => {
    // const adjacentRoads = getAdjacentRoads(board, house);
    // board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
    // adjacentRoads.forEach((road) => (road.sprite.tint = 0x9b39f7));
    // const path = findShortestPath(house, board.diner);
    // if (path) triggerCarAnimation(path, house);
  });
  board.houses.push(house);
};

export const addFoodToHouse = (house: House, foodKind: FoodKind) => {
  house.food.push({
    kind: foodKind,
    sprite: new PIXI.Sprite(foodKind.texture),
  });
};

export const renderHouseFood = (house: House) => {
  if (house.demandContainer) house.demandContainer.destroy();
  if (house.food.length > 0) {
    house.demandContainer = new PIXI.Container();
    house.demandContainer.zIndex = 100;
    const demandBubbleSprite = createSprite(demandBubbleTexture, 100);
    house.demandContainer.addChild(demandBubbleSprite);
    house.food.forEach((food, i) => {
      const foodSprite = createFoodSprite(food.kind, 50);
      foodSprite.height = ts;
      foodSprite.width = ts;
      foodSprite.position.x = i * 30 + 5;
      foodSprite.position.y = 5;
      house.demandContainer.addChild(foodSprite);
    });
    house.demandContainer.position.y = -105;
    house.container.addChild(house.demandContainer);
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
