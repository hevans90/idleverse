import { translateObject } from "../food-chain/animation";
import { getAdjacentDrinks } from "../food-chain/board";
import { toggleDrawerOpen } from "../food-chain/drawer";
import { foodKinds } from "../food-chain/food";
import { Player } from "../food-chain/player";
import { ts, ts1_2 } from "../food-chain/utils/constants";
import { addSpriteToBoard, setSpriteZOrder } from "../food-chain/utils/graphics-utils";
import { cards, board } from "../food-chain/utils/singletons";
import { playProduceAnimation } from "./card.animations";

export const enableFoodProduction = (player: Player) => {
  cards.forEach((card) => {
    if (card.owner === player && card.active && card.kind === 'burgerCook') {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container.on('pointerdown', () => {
        if (!card.used) {
          card.used = true;
          (async function () {
            for (let i = 0; i < 3; i++) {
              await playProduceAnimation(
                player,
                card.container,
                foodKinds.burger
              );
            }
          })();
        }
      });
    }
    if (card.owner === player && card.active && card.kind === 'pizzaChef') {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container.on('pointerdown', () => {
        if (!card.used) {
          card.used = true;
          (async function () {
            for (let i = 0; i < 8; i++) {
              await playProduceAnimation(
                player,
                card.container,
                foodKinds.pizza
              );
            }
          })();
        }
      });
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
