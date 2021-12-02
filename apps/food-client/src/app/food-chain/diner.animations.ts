import * as PIXI from 'pixi.js';
import { translateObject } from './animation';
import { Diner } from './diner';
import { createCashSprite } from './food';

export const playCashAnimation = async (diner: Diner, amount: number) => {
  const cashAnimContainer = new PIXI.Container();
  const cashSprite = createCashSprite(40);
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
