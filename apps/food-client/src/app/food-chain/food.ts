import * as PIXI from 'pixi.js';
import { Player } from './player';
import { ts } from './utils/constants';
import { createSprite } from './utils/graphics-utils';
import { app } from './utils/singletons';

export type FoodKind = {
  name: string;
  letter?: string;
  texture: PIXI.Texture;
  bg: number;
};

export const foodKindConfigs: FoodKind[] = [
  {
    name: 'beer',
    letter: 'b',
    texture: PIXI.Texture.from('https://i.imgur.com/1Ym9YX6.png'),
    bg: 0xa0e5af,
  },
  {
    name: 'cola',
    letter: 'c',
    texture: PIXI.Texture.from('https://i.imgur.com/UaijMRU.png'),
    bg: 0xeeb4bf,
  },
  {
    name: 'lemonade',
    letter: 'l',
    texture: PIXI.Texture.from('https://i.imgur.com/LesWWMh.png'),
    bg: 0xffe67d,
  },
  {
    name: 'pizza',
    texture: PIXI.Texture.from('https://i.imgur.com/pyw8386.png'),
    bg: 0xf0ddae,
  },
  {
    name: 'burger',
    texture: PIXI.Texture.from('https://i.imgur.com/uQZeADM.png'),
    bg: 0xd0b0a5,
  },
];

export const createFoodSprite = (foodKind: FoodKind, size: number) => {
  return createSprite(foodKind.texture, size);
};

export const createFoodSpriteIcon = (foodKind: FoodKind) => {
  const graphic = new PIXI.Graphics();
  graphic.lineStyle(2, 0x000000);
  graphic.beginFill(foodKind.bg);
  graphic.drawRect(0, 0, ts, ts);
  graphic.endFill();

  const foodSprite = new PIXI.Sprite(foodKind.texture);
  foodSprite.height = ts;
  foodSprite.width = ts;

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
