import * as PIXI from 'pixi.js';
import { Board, BoardObject, getAdjacentRoads } from './board';
import { playCashAnimation } from './diner.animations';
import { createFoodSprite, FoodKind } from './food';
import { addCarToBoard, travelPath } from './house.animations';
import { Player } from './player';
import { Road } from './road';
import { triggerCarAnimation } from './road.animations';
import { drawToolbar } from './toolbar';
import { ts } from './utils/constants';
import { demandBubbleTexture } from './utils/graphics';
import { createSprite } from './utils/graphics-utils';
import { app, board } from './utils/singletons';
import { findRoadPath } from './utils/utils';

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
    const adjacentRoads = getAdjacentRoads(board, house);
    board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
    adjacentRoads.forEach((road) => (road.sprite.tint = 0x9b39f7));
    const path = findShortestPath(house, board.diner);
    if (path) triggerCarAnimation(path, house);
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

export const findShortestPath = (item1: BoardObject, item2: BoardObject) => {
  let path: Road[] = null;
  const item1AdjacentRoads = getAdjacentRoads(board, item1);
  const item2AdjacentRoads = getAdjacentRoads(board, item2);
  item2AdjacentRoads.forEach((road) => {
    const currentPath = findRoadPath(item1AdjacentRoads, road);
    if (!path || currentPath.length < path.length) path = currentPath;
  });
  return path;
};

export const satisfiesFood = (player: Player, house: House) => {
  const houseFood = aggregateFood(house);
  if (Object.keys(houseFood).length === 0) return false;
  let satisfies = true;
  Object.entries(houseFood).forEach((food) => {
    const foodName = food[0];
    const foodAmount = food[1];
    if (player.food[foodName].amount < foodAmount) {
      satisfies = false;
    }
  });
  return satisfies;
};

export const enableDinnerTime = (player: Player) => {
  board.diner.container.interactive = true;
  board.diner.container.buttonMode = true;
  board.diner.container.on('pointerdown', () => {
    dinnerTime(player);
  });
};

export const dinnerTime = async (player: Player) => {
  const sortedHouses = board.houses.sort(
    (house1, house2) => house1.num - house2.num
  );
  for (let i = 0; i < sortedHouses.length; i++) {
    const house = sortedHouses[i];
    if (satisfiesFood(player, house)) {
      let cashReward = 0;
      house.food.forEach((food) => {
        house.container.removeChild(food.sprite);
        player.food[food.kind.name].amount--;
        cashReward += 10;
      });
      house.food = [];
      drawToolbar(player);
      const path = findShortestPath(house, board.diner);
      const car = addCarToBoard();
      car.carContainer.addChild(house.demandContainer);
      if (path.length > 1) {
        const firstRoad = path[0];
        await travelPath(
          [firstRoad, firstRoad],
          car.carContainer,
          car.carSprite,
          200
        );
        await travelPath(path, car.carContainer, car.carSprite, 20);
        player.cash += cashReward;
        playCashAnimation(board.diner, cashReward);
        car.carContainer.removeChild(house.demandContainer);
        const lastRoad = path[path.length - 1];
        await travelPath(
          [lastRoad, lastRoad],
          car.carContainer,
          car.carSprite,
          100
        );
        path.reverse();
        await travelPath(path, car.carContainer, car.carSprite, 20);
        await travelPath(
          [firstRoad, firstRoad],
          car.carContainer,
          car.carSprite,
          100
        );
      } else if (path.length === 1) {
        await travelPath(
          [path[0], path[0]],
          car.carContainer,
          car.carSprite,
          400
        );
      }
      board.container.removeChild(car.carContainer, car.carSprite);
    }
  }
};
