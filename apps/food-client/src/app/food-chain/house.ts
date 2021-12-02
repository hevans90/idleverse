import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { Diner } from './diner';
import {
  addHouseToDrawer,
  renderDevelopmentDrawerContents,
  toggleDrawerOpen,
} from './drawer';
import { FoodKind } from './food';
import { disablePlacement, enablePlacement, Tile } from './tile';
import { rotationConstants, ts } from './utils/constants';
import { createSprite } from './utils/graphics-utils';
import { app, board, communalDrawers, mainLayer } from './utils/singletons';
import { isValidPosition } from './utils/utils';

const houseTextureMap: { [key: number]: string } = {
  1: 'houseWest',
  2: 'houseNorth',
  3: 'houseEast',
  4: 'houseSouth',
};

const extraHouses = [1, 3, 6, 9, 11, 13, 14, 17];

export type House = BoardObject & {
  orient: number;
  num: number;
  food: { kind: FoodKind; sprite: PIXI.Sprite }[];
  maxFood: number;
  demandContainer?: PIXI.Container;
};

export const isHouse = (boardObject: BoardObject): boardObject is House => {
  const house = boardObject as House;
  return house['orient'] !== undefined && house.num !== undefined;
};

export const createHouseSprite = (house: House) => {
  const houseSprite = createSprite(houseTextureMap[house.orient], ts * 2);
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
    width: ts * 2,
    height: ts * 2,
  });
  const renderTexture = new PIXI.RenderTexture(baseTexture);

  app.renderer.render(renderContainer, { renderTexture });

  return new PIXI.Sprite(renderTexture);
};

export const createHouseWithGardenSprite = (house: House) => {
  const houseSprite = createSprite(houseTextureMap[house.orient], ts * 2);
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

  const gardenSprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources['garden'].texture
  );
  gardenSprite.width = ts;
  gardenSprite.height = ts * 1.4;
  gardenSprite.x = ts * 2;
  gardenSprite.y = ts * 0.5;
  renderContainer.addChild(houseSprite, gardenSprite, houseNum);

  const baseTexture = new PIXI.BaseRenderTexture({
    width: ts * 3,
    height: ts * 2,
  });
  const renderTexture = new PIXI.RenderTexture(baseTexture);

  app.renderer.render(renderContainer, { renderTexture });

  const sprite = new PIXI.Sprite(renderTexture);
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  sprite.position.x = sprite.width / 2;
  sprite.position.y = sprite.height / 2;

  return sprite;
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
    maxFood: 3,
  };
  return house;
};

export const addHouseToBoard = (house: House) => {
  house.sprite = createHouseSprite(house);
  house.container.addChild(house.sprite);
  house.container.parentLayer = mainLayer;
  house.container.zOrder = 1;
  board.houses.push(house);
};

export const initExtraHouseTiles = () => {
  extraHouses.forEach((houseNum) => {
    const house: House = {
      w: 3,
      h: 2,
      orient: 4,
      num: houseNum,
      rotation: 0,
      container: new PIXI.Container(),
      food: [],
      maxFood: 5,
    };
    house.sprite = createHouseWithGardenSprite(house);
    house.container.addChild(house.sprite);
    addHouseToDrawer(house);
  });
  renderDevelopmentDrawerContents();
};

export const addFoodToHouse = (house: House, foodKind: FoodKind) => {
  house.food.push({
    kind: foodKind,
    sprite: createSprite(foodKind.name, ts),
  });
};

export const enableExtraHousePlacement = () => {
  const developmentDrawer = communalDrawers.development;
  developmentDrawer.houses.forEach((house) => {
    house.sprite.interactive = true;
    house.sprite.buttonMode = true;
    house.sprite.on('pointerdown', () => {
      enablePlacement(
        house,
        board.tiles,
        (square) => isValidPosition(house, square),
        () => [],
        () => {
          disablePlacement();
          developmentDrawer.houses.splice(
            developmentDrawer.houses.indexOf(house),
            1
          );
          board.houses.push(house);
          house.sprite.removeAllListeners();
        }
      );

      if (developmentDrawer.open) toggleDrawerOpen(developmentDrawer);
    });
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
