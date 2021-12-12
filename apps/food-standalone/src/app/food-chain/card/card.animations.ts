import * as PIXI from 'pixi.js';
import { translateObject } from '../animation';
import { FoodKind, addFood } from '../food';
import { Player } from '../player';
import { ts } from '../utils/constants';
import { createSprite } from '../utils/graphics-utils';
import { app } from '../utils/singletons';

export const playProduceAnimation = async (
  player: Player,
  object: PIXI.Container,
  foodKind: FoodKind
) => {
  const foodSprite = createSprite(foodKind.name, ts);
  app.stage.addChild(foodSprite);
  await translateObject(
    foodSprite,
    {
      x: object.getGlobalPosition().x + object.width / 2,
      y: object.getGlobalPosition().y + object.height / 2,
    },
    {
      x: player.food[foodKind.name].sprite.getGlobalPosition().x,
      y: player.food[foodKind.name].sprite.getGlobalPosition().y,
    },
    30
  );
  foodSprite.destroy();
  addFood(player, foodKind, 1);
};
