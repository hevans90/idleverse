import * as PIXI from 'pixi.js';
import { createFoodSprite, foodKindsConfig } from './food';
import { Player } from './player';
import { app } from './utils/singletons';

export const drawToolbar = (player: Player) => {
  const toolbar = new PIXI.Container();

  const graphic = new PIXI.Graphics();
  graphic.lineStyle(2, 0x000000);
  graphic.beginFill(0x2e64db);
  graphic.drawRect(0, 0, app.screen.width, 50);
  graphic.endFill();
  toolbar.addChild(graphic);

  Object.entries(player.food).forEach((food, i) => {
    const foodKind = food[0];
    const foodAmount = food[1];
    const foodSprite = createFoodSprite(foodKindsConfig[foodKind], 40);
    Object.assign(foodSprite, { x: 20 + i * 100, y: 5 });

    const foodAmountText = new PIXI.Text(
      `x ${foodAmount}`,
      new PIXI.TextStyle({
        fontFamily: 'zx-spectrum',
        fontSize: 24,
        fontWeight: 'bold',
        fill: '#ffffff',
      })
    );
    Object.assign(foodAmountText, { x: 70 + i * 100, y: 15 });
    toolbar.addChild(foodSprite, foodAmountText);
  });

  app.stage.addChild(toolbar);
};
