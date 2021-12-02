import * as PIXI from 'pixi.js';
import { Player } from './player';
import { ts } from './utils/constants';

export enum PlacementIndicatorColour {
  invalid = 0x8b0000,
  valid = 0x8b8000,
  range = 0x9b39f7,
}

export const drawPlacementIndicator = (
  w: number,
  h: number,
  indicatorType: PlacementIndicatorColour
) => {
  const indicator = new PIXI.Graphics();
  indicator.name = 'indicator';
  indicator.lineStyle(4, indicatorType, 1);
  indicator.beginFill(indicatorType, 0.25);
  indicator.drawRect(0, 0, ts * w - 2, ts * h - 2);
  indicator.endFill();
  return indicator;
};

export type Indicator = {
  width: number;
  height: number;
  borderColor: number;
  bgColor: number;
  textColor: number;
  text: string;
  textGraphic?: PIXI.Text;
  container?: PIXI.Container;
};

export const initBoxIndicator = (indicator: Indicator) => {
  const indicatorContainer = new PIXI.Container();
  const indicatorBox = new PIXI.Graphics();
  indicatorBox.lineStyle(4, indicator.borderColor, 1);
  indicatorBox.beginFill(indicator.bgColor, 1);
  indicatorBox.drawRect(0, 0, indicator.width, indicator.height);
  indicatorBox.endFill();
  indicatorContainer.addChild(indicatorBox);
  const indicatorText = new PIXI.Text(
    indicator.text,
    new PIXI.TextStyle({
      fontFamily: 'consolas',
      fill: indicator.textColor,
      align: 'center',
      fontSize: 20,
      wordWrap: true,
      wordWrapWidth: indicator.width - 20,
    })
  );
  indicatorText.anchor.x = 0.5;
  indicatorText.anchor.y = 0.5;
  indicatorText.x = indicator.width / 2;
  indicatorText.y = indicator.height / 2;
  indicatorContainer.addChild(indicatorText);

  indicator.textGraphic = indicatorText;
  indicator.container = indicatorContainer;

  return indicator;
};

export const drawHiresIndicator = (player: Player) => {
  const hiresIndicatorConfig: Indicator = {
    height: 50,
    width: 250,
    borderColor: 0xffbd2e,
    bgColor: 0xffd67d,
    textColor: 0x000000,
    text: `Hires Available: ${player.hiresAvailable.toString()}`,
  };
  const beachDrawer = player.drawers.beach;
  const hiresIndicator = initBoxIndicator(hiresIndicatorConfig);
  hiresIndicator.container.position.x =
    beachDrawer.container.width / 2 - hiresIndicatorConfig.container.width / 2;
  hiresIndicator.container.position.y = beachDrawer.container.height - 100;

  beachDrawer.contentsContainer.addChild(hiresIndicatorConfig.container);

  return hiresIndicator;
};
