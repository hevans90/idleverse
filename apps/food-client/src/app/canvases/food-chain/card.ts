import * as PIXI from 'pixi.js';
import { lineColour } from './types';

export const drawCard = ({
  title,
  description,
  colour,
}: {
  title: string;
  description: string;
  colour: number;
}) => {
  const cardContainer = new PIXI.Container();

  const cardSprite = new PIXI.Graphics();
  cardSprite.beginFill(lineColour);
  cardSprite.drawRoundedRect(0, 0, 200, 72, 8);
  cardSprite.endFill();

  cardSprite.beginFill(colour);
  cardSprite.drawRoundedRect(0, 56, 200, 136, 8);
  cardSprite.endFill();

  cardSprite.beginFill(lineColour);
  cardSprite.drawRect(0, 56, 200, 8);
  cardSprite.endFill();

  cardContainer.addChild(cardSprite);

  const cardTitle = new PIXI.Text(
    title,
    new PIXI.TextStyle({
      fontFamily: 'consolas',
      fontWeight: 'bold',
      fill: '#ffffff',
      align: 'center',
      fontSize: 24,
      wordWrap: true,
      wordWrapWidth: 200,
    })
  );
  cardTitle.position.x = 100;
  cardTitle.position.y = 8;
  cardTitle.anchor.x = 0.5;

  cardContainer.addChild(cardTitle);

  const cardDesc = new PIXI.Text(
    description,
    new PIXI.TextStyle({
      fontFamily: 'consolas',
      fill: lineColour,
      align: 'center',
      fontSize: 20,
      wordWrap: true,
      wordWrapWidth: 200,
    })
  );
  cardDesc.position.x = 100;
  cardDesc.position.y = 72;
  cardDesc.anchor.x = 0.5;

  cardContainer.addChild(cardDesc);

  return cardContainer;
};
