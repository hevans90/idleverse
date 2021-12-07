import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';
import { BoardObject } from './board';
import { Diner } from './diner';
import {
  addGardenToDrawer,
  addHouseToDrawer,
  renderDevelopmentDrawerContents,
  toggleDrawerOpen,
} from './drawer';
import { FoodKind } from './food';
import { disablePlacement, enablePlacement, Tile } from './tile';
import { rotationConstants, ts } from './utils/constants';
import { createSprite, drawDottedLine } from './utils/graphics-utils';
import { app, board, communalDrawers, mainLayer } from './utils/singletons';
import { HouseAdjacentToGarden, isValidPosition } from './utils/utils';

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
  baseFoodCost: number;
  maxFood: number;
  hasGarden: boolean;
  demandContainer?: PIXI.Container;
};

export type Garden = BoardObject & {
  house?: House;
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

export const setHouseTint = (house: House, colour: number) => {
  house.container.children.forEach((child) => {
    (child as PIXI.Sprite).tint = colour;
  });
};

export const addHouseGlow = (house: House) => {
  house.container.children.forEach(
    (child) =>
      (child.filters = [new GlowFilter({ distance: 30, outerStrength: 2 })])
  );
};

export const removeHouseGlow = (house: House) => {
  house.container.children.forEach((child) => (child.filters = []));
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
    hasGarden: false,
    baseFoodCost: 10,
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
      hasGarden: true,
      baseFoodCost: 20,
      maxFood: 5,
    };
    const houseSprite = createHouseSprite(house);
    houseSprite.anchor.x = houseSprite.anchor.y = 0.5;
    houseSprite.x = houseSprite.y = ts;
    const gardenSprite1 = createSprite('smallGarden', ts);
    gardenSprite1.anchor.x = gardenSprite1.anchor.y = 0.5;
    gardenSprite1.x = ts * 2.5;
    gardenSprite1.y = ts * 0.5;
    const gardenSprite2 = createSprite('smallGarden', ts);
    gardenSprite2.anchor.x = gardenSprite2.anchor.y = 0.5;
    gardenSprite2.x = ts * 2.5;
    gardenSprite2.y = ts * 1.5;
    house.container.addChild(houseSprite, gardenSprite1, gardenSprite2);
    house.rotate = (rotation: number) => {
      house.container.children.forEach(
        (child) => (child.rotation = (-Math.PI / 2) * rotation)
      );
    };
    addHouseToDrawer(house);
  });
};

export const initGardens = () => {
  for (let i = 0; i < 8; i++) {
    const garden: Garden = {
      w: 1,
      h: 2,
      rotation: 0,
      container: new PIXI.Container(),
    };
    const gardenSprite1 = createSprite('smallGarden', ts);
    gardenSprite1.anchor.x = gardenSprite1.anchor.y = 0.5;
    gardenSprite1.x = ts * 0.5;
    gardenSprite1.y = ts * 0.5;
    const gardenSprite2 = createSprite('smallGarden', ts);
    gardenSprite2.anchor.x = gardenSprite2.anchor.y = 0.5;
    gardenSprite2.x = ts * 0.5;
    gardenSprite2.y = ts * 1.5;
    const fenceGraphic = new PIXI.Graphics();
    drawDottedLine(
      fenceGraphic,
      { x: 0, y: 0 },
      { x: 0, y: ts * 2 },
      0xfafafa,
      1,
      0xcfcfcf,
      1,
      5
    );
    drawDottedLine(
      fenceGraphic,
      { x: 0, y: 0 },
      { x: ts, y: 0 },
      0xfafafa,
      1,
      0xcfcfcf,
      1,
      3
    );
    drawDottedLine(
      fenceGraphic,
      { x: 0, y: ts * 2 },
      { x: ts, y: ts * 2 },
      0xfafafa,
      1,
      0xcfcfcf,
      1,
      3
    );
    drawDottedLine(
      fenceGraphic,
      { x: ts, y: 0 },
      { x: ts, y: ts * 0.75 },
      0xfafafa,
      1,
      0xcfcfcf,
      1,
      2
    );
    drawDottedLine(
      fenceGraphic,
      { x: ts, y: ts * 1.25 },
      { x: ts, y: ts * 2 },
      0xfafafa,
      1,
      0xcfcfcf,
      1,
      2
    );
    const fenceTexture = app.renderer.generateTexture(fenceGraphic);
    const fenceSprite = new PIXI.Sprite(fenceTexture);
    fenceSprite.anchor.x = fenceSprite.anchor.y = 0.5;
    fenceSprite.x = ts * 0.5;
    fenceSprite.y = ts;
    garden.container.addChild(gardenSprite1, gardenSprite2, fenceSprite);
    garden.rotate = (rotation: number) => {
      garden.container.children.forEach((child, i) => {
        if (i < 2) child.rotation = (-Math.PI / 2) * rotation;
      });
    };
    addGardenToDrawer(garden);
  }
};

export const initDevelopmentItems = () => {
  initExtraHouseTiles();
  initGardens();
  renderDevelopmentDrawerContents();
};

export const addFoodToHouse = (house: House, foodKind: FoodKind) => {
  house.food.push({
    kind: foodKind,
    sprite: createSprite(foodKind.name, ts),
  });
};

export const enableDevelopment = () => {
  const developmentDrawer = communalDrawers.development;
  developmentDrawer.houses.forEach((house) => {
    house.container.interactive = true;
    house.container.buttonMode = true;
    house.container.on('pointerdown', () => {
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
          house.container.removeAllListeners();
        }
      );

      if (developmentDrawer.open) toggleDrawerOpen(developmentDrawer);
    });
  });

  developmentDrawer.gardens.forEach((garden) => {
    garden.container.interactive = true;
    garden.container.buttonMode = true;
    garden.container.on('pointerdown', () => {
      enablePlacement(
        garden,
        board.tiles,
        (square) => {
          return (
            isValidPosition(garden, square) &&
            !(HouseAdjacentToGarden(garden, square) === null)
          );
        },
        () => [],
        () => {
          disablePlacement();
          developmentDrawer.gardens.splice(
            developmentDrawer.gardens.indexOf(garden),
            1
          );
          board.gardens.push(garden);
          const house = HouseAdjacentToGarden(garden, garden);
          house.maxFood = 5;
          house.baseFoodCost = 20;
          house.hasGarden = true;
          garden.container.removeAllListeners();
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
