import * as PIXI from 'pixi.js';
import { translateObject } from '../food-chain/animation';
import { FoodKind, produceFood } from '../food-chain/food';
import { Player } from '../food-chain/player';
import { ts } from '../food-chain/utils/constants';
import { createSprite } from '../food-chain/utils/graphics-utils';
import { app } from '../food-chain/utils/singletons';

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
  produceFood(player, foodKind, 1);
};
