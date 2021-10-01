import { Application, Text } from 'pixi.js';

export const fpsTracker = (app: Application) => {
  const indicator = (text: string, x: number, y: number, name: string) => {
    const ind = new Text(`FPS: `, {
      fontFamily: 'zx spectrum',
      fontSize: 24,
      fill: 0xffffff,
    });

    ind.x = x;
    ind.y = y;
    ind.name = name;

    return ind;
  };

  app.stage.addChild(
    indicator('FPS', 50, 100, 'fpsCounter'),
    indicator('Frametime', 50, 150, 'frameTime')
  );

  app.ticker.add(() => {
    (app.stage.getChildByName('fpsCounter') as Text).text = `FPS: ${Math.ceil(
      app.ticker.FPS
    )}`;

    (
      app.stage.getChildByName('frameTime') as Text
    ).text = `Frame time: ${Math.ceil(app.ticker.deltaMS)}`;
  });
};
