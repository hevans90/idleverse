import * as PIXI from 'pixi.js';
import { createFoodSprite, foodKindConfigs } from './food';
import { Player } from './player';
import { createSprite } from './utils/graphics-utils';
import { app } from './utils/singletons';

const cashTexture = PIXI.Texture.from('https://i.imgur.com/G0H9hpe.png');

export const drawToolbar = (player: Player) => {
  const previousToolbar = app.stage.getChildByName('toolbar');
  app.stage.removeChild(previousToolbar);
  const toolbar = new PIXI.Container();

  const graphic = new PIXI.Graphics();
  graphic.lineStyle(2, 0x000000);
  graphic.beginFill(0x2e64db);
  graphic.drawRect(0, 0, app.screen.width, 50);
  graphic.endFill();
  toolbar.addChild(graphic);

  const cashSprite = createSprite(cashTexture, 40);
  Object.assign(cashSprite, { x: 20, y: 5 });
  const cashText = new PIXI.Text(
    `$${player.cash}`,
    new PIXI.TextStyle({
      fontFamily: 'zx-spectrum',
      fontSize: 24,
      fontWeight: 'bold',
      fill: '#ffffff',
    })
  );
  Object.assign(cashText, { x: 70, y: 15 });
  toolbar.addChild(cashSprite, cashText);

  Object.entries(player.food).forEach((food, i) => {
    const foodKindName = food[0];
    const foodAmount = food[1];
    const foodSprite = createFoodSprite(
      foodKindConfigs.find((kind) => kind.name === foodKindName),
      40
    );
    Object.assign(foodSprite, { x: 20 + (i + 1) * 100, y: 5 });

    const foodAmountText = new PIXI.Text(
      `x ${foodAmount.amount}`,
      new PIXI.TextStyle({
        fontFamily: 'zx-spectrum',
        fontSize: 24,
        fontWeight: 'bold',
        fill: '#ffffff',
      })
    );
    player.food[foodKindName].sprite = foodSprite;
    player.food[foodKindName].textSprite = foodAmountText;
    Object.assign(foodAmountText, { x: 60 + (i + 1) * 100, y: 15 });
    toolbar.addChild(foodSprite, foodAmountText);
  });

  toolbar.name = 'toolbar';
  app.stage.addChild(toolbar);
};
