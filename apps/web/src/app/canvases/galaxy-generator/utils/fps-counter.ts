import { Application, Text } from 'pixi.js';

export const fpsTracker = (app: Application) => {
  const fpsCounter = new Text(`FPS: `, {
    fontFamily: 'zx spectrum',
    fontSize: 24,
    fill: 0xffffff,
  });
  fpsCounter.x = 50;
  fpsCounter.y = 100;
  fpsCounter.name = 'fpsCounter';
  app.stage.addChild(fpsCounter);

  app.ticker.add(() => {
    (app.stage.getChildByName('fpsCounter') as Text).text = `FPS: ${Math.ceil(
      app.ticker.FPS
    )}`;
  });
};
