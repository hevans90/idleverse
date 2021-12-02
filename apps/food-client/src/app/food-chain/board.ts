import * as PIXI from 'pixi.js';
import { GlowFilter } from '@pixi/filter-glow';
import { Diner } from './diner';
import { playCashAnimation } from './diner.animations';
import { addDrinkToBoard, Drink, isDrink } from './drink';
import { addHouseToBoard, House, isHouse, satisfiesFood } from './house';
import { MarketingTile } from './marketingTile';
import { addRoadToBoard, isRoad, Road } from './road';
import { Tile } from './tile';
import { renderToolbar } from './toolbar';
import { ts } from './utils/constants';
import { app, board } from './utils/singletons';
import { BoardItem, collides, findShortestRoadPath } from './utils/utils';
import { addCarToBoard, travelPath } from './utils/graphics-utils';

export type Board = {
  chunksWide: number;
  chunksHigh: number;
  tiles: Tile[];
  outerTiles: Tile[];
  diners: Diner[];
  roads: Road[];
  houses: House[];
  drinks: Drink[];
  marketingTiles: MarketingTile[];
  container: PIXI.Container;
  deliverFood?: () => void;
};

export type BoardObject = BoardItem & {
  sprite?: PIXI.Sprite;
  container?: PIXI.Container;
};

export const getAdjacentRoads = (board: Board, object: BoardItem): Road[] => {
  return board.roads.filter((road) => {
    return (
      collides(object, { ...road, i: road.i + 1 }) ||
      collides(object, { ...road, i: road.i - 1 }) ||
      collides(object, { ...road, j: road.j + 1 }) ||
      collides(object, { ...road, j: road.j - 1 })
    );
  });
};

export const rotateObject = (object: BoardObject) => {
  const width = object.w;
  const height = object.h;
  object.w = height;
  object.h = width;
  object.container.rotation += Math.PI / 2;
};

export const addObjectToBoard = (
  board: Board,
  tile: Tile,
  boardObject: BoardObject
) => {
  if (isHouse(boardObject)) {
    addHouseToBoard(board, boardObject);
  } else if (isRoad(boardObject)) {
    addRoadToBoard(board, boardObject);
  } else if (isDrink(boardObject)) {
    addDrinkToBoard(board, boardObject);
  }
  boardObject.i = tile.i;
  boardObject.j = tile.j;
  boardObject.container.x += boardObject.i * ts;
  boardObject.container.y += boardObject.j * ts;
  board.container.addChild(boardObject.container);
};

export const addBoardToStage = () => {
  board.container.pivot.x = board.container.width / 2;
  board.container.pivot.y = board.container.height / 2;
  board.container.position.x = app.screen.width / 2;
  board.container.position.y = app.screen.height / 2;
  board.container.sortableChildren = true;
  board.container.filters = [];
  app.stage.addChild(board.container);
};

export const enableDinnerTime = () => {
  board.diners.forEach((diner) => {
    diner.container.interactive = true;
    diner.container.buttonMode = true;
    diner.container.on('pointerdown', () => {
      dinnerTime();
    });
  });
};

export const chooseDiner = (diners: Diner[], house: House) => {
  const validDiners = diners.filter((diner) => satisfiesFood(diner, house));
  console.log(`found ${validDiners.length}`);
  if (validDiners.length === 0) return null;
  validDiners.forEach(
    (diner) => (diner.path = findShortestRoadPath(house, diner))
  );
  return validDiners.sort(
    (diner1, diner2) => diner1.path.length - diner2.path.length
  )[0];
};

export const feedHouse = async (diner: Diner, house: House) => {
  const player = diner.owner;
  const path = diner.path;
  if (path.length > 0) {
    let cashReward = 0;
    house.food.forEach((food) => {
      house.container.removeChild(food.sprite);
      player.food[food.kind.name].amount--;
      cashReward += 10;
    });
    player.cash += cashReward;
    house.food = [];
    const car = addCarToBoard();
    car.container.addChild(house.demandContainer);
    if (path.length > 1) {
      const firstRoad = path[0];
      await travelPath([firstRoad, firstRoad], car.container, car.sprite, 200);
      await travelPath(path, car.container, car.sprite, 20);
      playCashAnimation(diner, cashReward);
      renderToolbar(player);
      car.container.removeChild(house.demandContainer);
      const lastRoad = path[path.length - 1];
      await travelPath([lastRoad, lastRoad], car.container, car.sprite, 100);
      path.reverse();
      await travelPath(path, car.container, car.sprite, 20);
      await travelPath([firstRoad, firstRoad], car.container, car.sprite, 100);
    } else if (path.length === 1) {
      await travelPath([path[0], path[0]], car.container, car.sprite, 200);
      playCashAnimation(diner, cashReward);
      renderToolbar(player);
      car.container.removeChild(house.demandContainer);
      await travelPath([path[0], path[0]], car.container, car.sprite, 200);
    }
    board.container.removeChild(car.container, car.sprite);
  }
};

export const dinnerTime = async () => {
  console.log('Dinner time activated');
  const housesWithDemand = board.houses.filter(
    (house) => house.food.length > 0
  );
  const sortedHouses = housesWithDemand.sort(
    (house1, house2) => house1.num - house2.num
  );
  for (let i = 0; i < sortedHouses.length; i++) {
    const house = sortedHouses[i];
    const diner = chooseDiner(board.diners, house);
    if (diner) {
      console.log(`Diner of player ${diner.owner.name} chosen`);
      house.sprite.filters = [
        new GlowFilter({ distance: 30, outerStrength: 2 }),
      ];
      diner.sprite.filters = [
        new GlowFilter({ distance: 30, outerStrength: 2 }),
      ];
      await feedHouse(diner, house);
      house.sprite.filters = [];
      diner.sprite.filters = [];
    } else {
      console.log(`No house diner suitable diner found for house ${house.num}`);
    }
  }
};
