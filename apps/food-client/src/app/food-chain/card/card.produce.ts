import { getAdjacentDrinks } from '../board';
import { enableDrinksPath } from '../diner';
import { toggleDrawerOpen } from '../drawer';
import { Drink } from '../drink';
import { Player } from '../player';
import { Road } from '../road';
import { deactivate } from '../utils/graphics-utils';
import { cards } from '../utils/singletons';
import { Card } from './card';
import { playProduceAnimation } from './card.animations';

export const enableProduction = (player: Player) => {
  const validPlayerCards = cards.filter(
    (card) => card.owner === player && card.active && !card.used
  );
  validPlayerCards.forEach((card) => {
    deactivate(card);
    if (card.foodKinds) enableFoodProduction(card);
    if (card.kind === 'cartOperator' || card.kind === 'truckDriver')
      enableDrinksProduction(card);
  });
};

export const enableFoodProduction = (card: Card) => {
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

export const enableDrinksProduction = (card: Card) => {
  card.container.interactive = true;
  card.container.buttonMode = true;
  card.container.on('pointerdown', () => {
    const structureDrawer = card.owner.drawers.structure;
    toggleDrawerOpen(structureDrawer);
    enableDrinksPath(card);
    cards.forEach((card) => {
      deactivate(card);
    });
  });
};

export const pickupDrinks = async (
  driver: Card,
  road: Road,
  collectedDrinks: Drink[]
) => {
  const drinks = getAdjacentDrinks(road);
  for (let j = 0; j < drinks.length; j++) {
    const drink = drinks[j];
    if (!collectedDrinks.includes(drink)) {
      collectedDrinks.push(drink);
      for (let k = 0; k < driver.foodQuantity; k++) {
        await playProduceAnimation(driver.owner, drink.container, drink.kind);
      }
    }
  }
};
