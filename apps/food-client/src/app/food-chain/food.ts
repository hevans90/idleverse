import * as PIXI from 'pixi.js';
import { Player } from './player';
import { ts } from './utils/constants';
import { createSprite } from './utils/graphics-utils';
import { app, mainLayer } from './utils/singletons';

export type FoodKind = {
  name?: string;
  letter?: string;
  bg: number;
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

export const createFoodSelect = (
  foodKinds: FoodKind[],
  onClick: (foodKind: FoodKind) => void
) => {
  const foodSelect = new PIXI.Container();
  foodSelect.parentLayer = mainLayer;
  foodSelect.zOrder = 5;
  foodKinds.forEach((foodKind, i) => {
    const foodSprite = createFoodSpriteIcon(foodKind);
    foodSprite.position.x = ts * i;
    foodSprite.interactive = true;
    foodSprite.buttonMode = true;
    foodSprite.on('pointerdown', () => onClick(foodKind));
    foodSelect.addChild(foodSprite);
  });
  return foodSelect;
};

export const produceFood = (
  player: Player,
  foodKind: FoodKind,
  amount: number
) => {
  const playerFood = player.food[foodKind.name];
  playerFood.amount += amount;
  playerFood.textSprite.text = `x ${playerFood.amount}`;
};
