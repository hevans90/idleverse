import { translateObject } from './animation';
import { Card } from './card';
import { createFoodSprite, FoodKind, produceFood } from './food';
import { Player } from './player';
import { ts } from './utils/constants';
import { app, mainLayer } from './utils/singletons';

export const playProduceAnimation = async (
  player: Player,
  card: Card,
  foodKind: FoodKind
) => {
  const foodSprite = createFoodSprite(foodKind, ts);
  foodSprite.parentLayer = mainLayer;
  foodSprite.zOrder = 5;
  app.stage.addChild(foodSprite);
  await translateObject(
    foodSprite,
    {
      x: card.container.getGlobalPosition().x + card.container.width / 2,
      y: card.container.getGlobalPosition().y + card.container.height / 2,
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
