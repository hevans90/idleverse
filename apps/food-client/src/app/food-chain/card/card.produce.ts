import { translateObject } from '../animation';
import { getAdjacentDrinks } from '../board';
import { toggleDrawerOpen } from '../drawer';
import { Player } from '../player';
import { ts, ts1_2 } from '../utils/constants';
import { addSpriteToBoard, setSpriteZOrder } from '../utils/graphics-utils';
import { cards, board } from '../utils/singletons';
import { Card } from './card';
import { playProduceAnimation } from './card.animations';

export const enableCardFoodProduction = (card: Card) => {
  card.container.interactive = true;
  card.container.buttonMode = true;
  card.container.on('pointerdown', () => {
    if (!card.used) {
      card.used = true;
      (async function () {
        for (let i = 0; i < card.foodQuantity; i++) {
          await playProduceAnimation(
            card.owner,
            card.container,
            card.foodKinds[0]
          );
        }
      })();
    }
  });
};

export const enablePlayerFoodProduction = (player: Player) => {
  cards.forEach((card) => {
    if (card.owner === player && card.active && card.foodKinds) {
      enableCardFoodProduction(card);
    }
    if (card.owner === player && card.active && card.kind === 'cartOperator') {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container.on('pointerdown', async () => {
        if (!card.used) {
          await toggleDrawerOpen(player.drawers.structure);
          card.used = true;
          const truck = addSpriteToBoard('truck', ts * 2);
          const diner = player.diners[0];
          const collectedDrinks = [];
          if (diner.drinksPath.length > 1) {
            for (let i = 0; i < diner.drinksPath.length - 1; i++) {
              const item1 = diner.drinksPath[i];
              const item2 = diner.drinksPath[i + 1];
              if (item1 !== item2)
                truck.sprite.rotation = Math.atan2(
                  item2.container.position.y - item1.container.position.y,
                  item2.container.position.x - item1.container.position.x
                );
              setSpriteZOrder(truck.container, item1, item2);
              await translateObject(
                truck.container,
                {
                  x: item1.container.position.x + ts1_2,
                  y: item1.container.position.y + ts1_2,
                },
                {
                  x: item2.container.position.x + ts1_2,
                  y: item2.container.position.y + ts1_2,
                },
                20
              );
              const drinks = getAdjacentDrinks(item2);
              for (let j = 0; j < drinks.length; j++) {
                const drink = drinks[j];
                if (!collectedDrinks.includes(drink)) {
                  collectedDrinks.push(drink);
                  await playProduceAnimation(
                    player,
                    drink.container,
                    drink.kind
                  );
                  await playProduceAnimation(
                    player,
                    drink.container,
                    drink.kind
                  );
                  await playProduceAnimation(
                    player,
                    drink.container,
                    drink.kind
                  );
                }
              }
            }
          }
          board.container.removeChild(truck.container, truck.sprite);
        }
      });
    }
  });
};
