import * as PIXI from 'pixi.js';
import { Player } from './player';
import { ts } from './utils/constants';
import { createSprite, darken } from './utils/graphics-utils';
import { app, mainLayer } from './utils/singletons';

export type FoodKind = {
  name?: string;
  letter?: string;
  bg: number;
};

export type FoodSelect = {
  foodKind: FoodKind;
  foodQuantity: number;
  foodButtons: { kind: FoodKind; sprite: PIXI.Sprite }[];
  numButtons: { num: number; sprite: PIXI.Sprite }[];
  container: PIXI.Container;
};

export const foodKinds: { [key: string]: FoodKind } = {
  beer: {
    letter: 'b',
    bg: 0xa0e5af,
  },
  cola: {
    letter: 'c',
    bg: 0xeeb4bf,
  },
  lemonade: {
    letter: 'l',
    bg: 0xffe67d,
  },
  pizza: {
    bg: 0xf0ddae,
  },
  burger: {
    bg: 0xd0b0a5,
  },
};
Object.entries(foodKinds).forEach((kind) => {
  kind[1].name = kind[0];
});

export const createFoodSpriteIcon = (foodKind: FoodKind) => {
  const graphic = new PIXI.Graphics();
  graphic.lineStyle(2, 0x000000);
  graphic.beginFill(foodKind.bg);
  graphic.drawRect(0, 0, ts, ts);
  graphic.endFill();

  const foodSprite = createSprite(foodKind.name, ts);

  const renderContainer = new PIXI.Container();
  renderContainer.addChild(graphic, foodSprite);

  const baseTexture = new PIXI.BaseRenderTexture({
    width: ts,
    height: ts,
  });
  const renderTexture = new PIXI.RenderTexture(baseTexture);

  app.renderer.render(renderContainer, { renderTexture });

  return new PIXI.Sprite(renderTexture);
};

export const createNumberSpriteIcon = (num: number) => {
  const graphic = new PIXI.Graphics();
  graphic.lineStyle(2, 0x000000);
  graphic.beginFill(0xa3e8f5);
  graphic.drawRect(0, 0, ts, ts);
  graphic.endFill();

  const numSprite = new PIXI.Text(
    `${num}`,
    new PIXI.TextStyle({
      fontFamily: 'consolas',
      fontWeight: 'bold',
      fill: '#ff00af',
      align: 'center',
      fontSize: 72,
    })
  );
  numSprite.anchor.x = 0.5;
  numSprite.anchor.y = 0.5;
  numSprite.x = ts / 2;
  numSprite.y = ts / 2;

  const renderContainer = new PIXI.Container();
  renderContainer.addChild(graphic, numSprite);

  const baseTexture = new PIXI.BaseRenderTexture({
    width: ts,
    height: ts,
  });
  const renderTexture = new PIXI.RenderTexture(baseTexture);

  app.renderer.render(renderContainer, { renderTexture });

  return new PIXI.Sprite(renderTexture);
};

export const createFoodSelect = (
  foodKinds: FoodKind[],
  maxDuration: number,
  onConfirm: (foodKind: FoodKind, foodQuantity: number) => void,
  onCancel: () => void
) => {
  const foodSelect: FoodSelect = {
    foodKind: null,
    foodQuantity: null,
    foodButtons: [],
    numButtons: [],
    container: new PIXI.Container(),
  };
  foodSelect.container = new PIXI.Container();
  foodSelect.container.parentLayer = mainLayer;
  foodSelect.container.zOrder = 5;
  foodKinds.forEach((foodKind, i) => {
    const foodSprite = createFoodSpriteIcon(foodKind);
    foodSprite.position.x = ts * i;
    foodSprite.interactive = true;
    foodSprite.buttonMode = true;
    foodSprite.on('pointerdown', () => {
      console.log(foodKind.name);
      foodSelect.foodKind = foodKind;
      foodSelect.foodButtons.forEach((button) => {
        if (button.kind === foodSelect.foodKind) button.sprite.filters = [];
        else darken(button.sprite);
      });
    });
    foodSelect.foodButtons.push({ kind: foodKind, sprite: foodSprite });
    foodSelect.container.addChild(foodSprite);
  });
  for (let i = 0; i < maxDuration; i++) {
    const numSprite = createNumberSpriteIcon(i + 1);
    numSprite.position.x = ts * i;
    numSprite.position.y = ts;
    numSprite.interactive = true;
    numSprite.buttonMode = true;
    numSprite.on('pointerdown', () => {
      console.log(i + 1);
      foodSelect.foodQuantity = i + 1;
      foodSelect.numButtons.forEach((button) => {
        if (button.num === foodSelect.foodQuantity) button.sprite.filters = [];
        else darken(button.sprite);
      });
    });
    foodSelect.numButtons.push({ num: i + 1, sprite: numSprite });
    foodSelect.container.addChild(numSprite);
  }
  const tickSprite = createSprite('tick', ts);
  tickSprite.interactive = true;
  tickSprite.buttonMode = true;
  tickSprite.position.x = ts * 5;
  tickSprite.on('pointerdown', () => {
    if (foodSelect.foodKind && foodSelect.foodQuantity)
      onConfirm(foodSelect.foodKind, foodSelect.foodQuantity);
  });
  foodSelect.container.addChild(tickSprite);

  const crossSprite = createSprite('cross', ts);
  crossSprite.interactive = true;
  crossSprite.buttonMode = true;
  crossSprite.position.x = ts * 5;
  crossSprite.position.y = ts;
  crossSprite.on('pointerdown', () => {
    onCancel();
  });
  foodSelect.container.addChild(crossSprite);

  return foodSelect;
};

export const addFood = (player: Player, foodKind: FoodKind, amount: number) => {
  const playerFood = player.food[foodKind.name];
  playerFood.amount += amount;
  playerFood.textSprite.text = `x ${playerFood.amount}`;
};
