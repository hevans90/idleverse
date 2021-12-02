import { translateObject } from './animation';
import { Card } from './card';
import {
  createFoodSprite,
  FoodKinds,
  foodKindsConfig,
  produceFood,
} from './food';
import { Player } from './player';
import { ts } from './utils/constants';
import { app } from './utils/singletons';

export const playProduceAnimation = async (
  player: Player,
  card: Card,
  foodKind: FoodKinds
) => {
  const foodSprite = createFoodSprite(foodKindsConfig[foodKind], ts);
  foodSprite.zIndex = 50;
  app.stage.addChild(foodSprite);
  await translateObject(
    foodSprite,
    {
      x: card.container.getGlobalPosition().x + card.container.width / 2,
      y: card.container.getGlobalPosition().y + card.container.height / 2,
    },
    {
      x: player.food[foodKind].sprite.getGlobalPosition().x,
      y: player.food[foodKind].sprite.getGlobalPosition().y,
    },
    30
  );
  foodSprite.destroy();
  produceFood(player, foodKind, 1);
};
