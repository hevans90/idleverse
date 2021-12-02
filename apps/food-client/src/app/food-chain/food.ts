import * as PIXI from 'pixi.js';
import { MarketingTile } from './marketingTile';
import { ts } from './utils/constants';
import { app } from './utils/singletons';

export type FoodKind = {
  letter?: string;
  texture: PIXI.Texture;
  bg: number;
};

enum FoodKinds {
  beer,
  cola,
  lemonade,
  burger,
  pizza,
}

export const foodKindsConfig: { [key: number]: FoodKind } = {
  [FoodKinds.beer]: {
    letter: 'b',
    texture: PIXI.Texture.from('https://i.imgur.com/1Ym9YX6.png'),
    bg: 0xa0e5af,
  },
  [FoodKinds.cola]: {
    letter: 'c',
    texture: PIXI.Texture.from('https://i.imgur.com/UaijMRU.png'),
    bg: 0xeeb4bf,
  },
  [FoodKinds.lemonade]: {
    letter: 'l',
    texture: PIXI.Texture.from('https://i.imgur.com/LesWWMh.png'),
    bg: 0xffe67d,
  },
  [FoodKinds.pizza]: {
    texture: PIXI.Texture.from('https://i.imgur.com/pyw8386.png'),
    bg: 0xf0ddae,
  },
  [FoodKinds.burger]: {
    texture: PIXI.Texture.from('https://i.imgur.com/uQZeADM.png'),
    bg: 0xd0b0a5,
  },
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

export const createFoodSelect = (tile: MarketingTile) => {
  const oldFoodSelect = tile.container.getChildByName('foodSelect');
  tile.container.removeChild(oldFoodSelect);

  const foodSelect = new PIXI.Container();
  Object.values(foodKindsConfig).forEach((foodKind, i) => {
    const foodSprite = createFoodSpriteIcon(foodKind);
    foodSprite.position.x = ts * i;
    foodSprite.interactive = true;
    foodSprite.buttonMode = true;
    foodSprite.on('pointerdown', () => {
      tile.foodKind = foodKind;
      tile.foodQuant = 4;
      renderMarketingTileFood(tile);
      tile.container.removeChild(foodSelect);
    });
    foodSelect.addChild(foodSprite);
  });

  foodSelect.y = tile.h * ts;
  foodSelect.name = 'foodSelect';

  tile.container.addChild(foodSelect);
};

export const renderMarketingTileFood = (tile: MarketingTile) => {
  tile.foodSprites.forEach((sprite) => sprite.destroy());
  tile.foodSprites = [];
  for (let i = 0; i < tile.foodQuant; i++) {
    const foodSprite = new PIXI.Sprite(tile.foodKind.texture);
    foodSprite.height = ts;
    foodSprite.width = ts;
    foodSprite.position.x = i * 20 + (tile.w * ts) / 2 - ts;
    foodSprite.position.y = 10;
    tile.container.addChild(foodSprite);
    tile.foodSprites.push(foodSprite);
  }
};
