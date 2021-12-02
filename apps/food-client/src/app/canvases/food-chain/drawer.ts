import * as PIXI from 'pixi.js';
import { baseColour, lineColour } from './types';

export const addDrawer = ({
  app,
  width,
  height,
  x,
  y,
  tabWidth,
}: {
  app: PIXI.Application;
  width: number;
  height: number;
  x: number;
  y: number;
  tabWidth: number;
}) => {
  const drawerContainer = new PIXI.Container();

  const drawerBody = new PIXI.Graphics();
  drawerBody.lineStyle(2, lineColour, 1);
  drawerBody.beginFill(baseColour);
  drawerBody.drawRoundedRect(0, 0, width, height, 20);
  drawerBody.endFill();
  drawerBody.interactive = true;

  const drawerTab = new PIXI.Graphics();

  drawerTab.lineStyle(2, lineColour, 1);
  drawerTab.beginFill(baseColour);
  drawerTab.drawRoundedRect(-40, 0, 40, app.screen.height, 20);
  drawerTab.endFill();

  drawerContainer.addChild(drawerBody, drawerTab);

  const drawer = {
    open: false,
  };

  drawerContainer.x = drawer.open ? app.screen.width - width : app.screen.width;
  drawerContainer.y = 0;

  const translateDraw = () => {
    drawer.open = !drawer.open;
    drawerContainer.x = drawer.open
      ? app.screen.width - width
      : app.screen.width;
  };

  drawerTab.interactive = true;
  drawerTab.buttonMode = true;
  drawerTab.on('pointerdown', translateDraw);

  return drawerContainer;
};
