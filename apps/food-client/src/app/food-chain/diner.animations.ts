import * as PIXI from 'pixi.js';
import { translateObject } from './animation';
import { Diner } from './diner';
import { createSprite } from './utils/graphics-utils';
import { mainLayer } from './utils/singletons';

export const playCashAnimation = async (diner: Diner, amount: number) => {
  const cashAnimContainer = new PIXI.Container();
  cashAnimContainer.parentLayer = mainLayer;
  cashAnimContainer.zOrder = 5;
  const cashSprite = createSprite('cash', 40);
  const cashNum = new PIXI.Text(
    `+$${amount.toString()}`,
    new PIXI.TextStyle({
      fontFamily: 'zx-spectrum',
      fontSize: 36,
      fontWeight: 'bold',
      fill: '#ffff00',
      stroke: '#000000',
      strokeThickness: 5,
    })
  );
  cashSprite.position.x = 80;
  cashSprite.position.y = 5;
  cashAnimContainer.addChild(cashSprite, cashNum);
  diner.container.addChild(cashAnimContainer);
  await translateObject(
    cashAnimContainer,
    {
      x: diner.sprite.width / 4,
      y: diner.sprite.height / 3,
    },
    {
      x: diner.sprite.width / 4,
      y: -diner.sprite.height / 3,
    },
    50
  );
  await translateObject(
    cashAnimContainer,
    {
      x: diner.sprite.width / 4,
      y: -diner.sprite.height / 3,
    },
    {
      x: diner.sprite.width / 4,
      y: -diner.sprite.height / 3,
    },
    50
  );
  cashAnimContainer.destroy();
};
