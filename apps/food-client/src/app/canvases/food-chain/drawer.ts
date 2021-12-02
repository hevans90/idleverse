import * as PIXI from 'pixi.js';
import { Card } from './card';
import { baseColour, lineColour, Player } from './types';

export type Drawer = {
  open: boolean;
  width: number;
  height: number;
  tabWidth: number;
  orient: string;
  cards: Card[];
  container?: PIXI.Container;
};

const getX = (app: PIXI.Application, drawer: Drawer) => {
  if (drawer.orient === 'left') {
    return drawer.open ? 0 : -drawer.width;
  } else {
    return drawer.open ? app.screen.width - drawer.width : app.screen.width;
  }
};

const getCardStack = (card: Card, drawer: Drawer) => {
  return drawer.cards.filter((_card) => _card.title === card.title);
};

const orderStack = (card: Card, drawer: Drawer) => {
  const cardStack = getCardStack(card, drawer);
  cardStack.forEach((card: Card, i) => {
    card.container.position.x =
      card.position * (card.container.width + 50) + 10 + 3 * i;
    card.container.position.y =
      card.row * (card.container.height + 50) + 10 + 3 * i;
  });
};

export const addToDrawer = (
  card: Card,
  drawer: Drawer,
  player: Player = null
) => {
  drawer.cards.push(card);
  drawer.container.addChild(card.container);
  card.owner = player;
  orderStack(card, drawer);
  // const cardInDrawer = drawer.cards.find((_card) => _card.title === card.title);
  // if (cardInDrawer) cardInDrawer.count += card.count;
  // else drawer.cards.push({ ...card, count: card.count });
};

export const removeFromDrawer = (card: Card, drawer: Drawer) => {
  drawer.container.removeChild(card.container);
  drawer.cards.splice(drawer.cards.indexOf(card), 1);
  orderStack(card, drawer);
  // const cardInDrawer = drawer.cards.find((_card) => _card.title === card.title);
  // if (cardInDrawer) cardInDrawer.count += card.count;
  // else drawer.cards.push({ ...card, count: card.count });
};

export const renderDrawer = (app: PIXI.Application, drawer: Drawer) => {
  const drawerContainer = new PIXI.Container();

  // Render drawer body
  const drawerBody = new PIXI.Graphics();
  drawerBody.lineStyle(2, lineColour, 1);
  drawerBody.beginFill(baseColour);
  drawerBody.drawRoundedRect(0, 0, drawer.width, drawer.height, 20);
  drawerBody.endFill();

  // Render drawer tab
  const drawerTab = new PIXI.Graphics();
  drawerTab.lineStyle(2, lineColour, 1);
  drawerTab.beginFill(baseColour);
  drawerTab.drawRoundedRect(
    drawer.orient === 'left' ? drawer.width : -40,
    0,
    40,
    drawer.height,
    20
  );
  drawerTab.endFill();
  drawerTab.interactive = true;
  drawerTab.buttonMode = true;
  drawerTab.on('pointerdown', () => {
    drawer.open = !drawer.open;
    drawerContainer.x = getX(app, drawer);
  });
  drawerContainer.addChild(drawerBody, drawerTab);

  const drawerContents = new PIXI.Graphics();
  drawerContents.beginFill(baseColour);
  drawerContents.drawRoundedRect(0, 0, drawer.width, drawer.height, 20);
  drawerContents.endFill();
  drawerContents.interactive = true;
  drawerContainer.addChild(drawerContents);

  drawer.container = drawerContents;

  const start = { x: 0, y: 0 };
  const end = { x: 0, y: 0 };

  function onDragStart(event: PIXI.InteractionEvent) {
    start.x =
      event.data.getLocalPosition(this.parent).x - event.target.position.x;
    start.y =
      event.data.getLocalPosition(this.parent).y - event.target.position.y;
    console.log(start);
    this.data = event.data;
    this.dragging = true;
  }

  function onDragEnd() {
    this.dragging = false;
    this.data = null;
  }

  function onDragMove(event: PIXI.InteractionEvent) {
    if (this.dragging) {
      end.x = this.data.getLocalPosition(this.parent).x - start.x;
      end.y = this.data.getLocalPosition(this.parent).y - start.y;
      if (end.x < 0) this.x = end.x;
      if (end.y < 0) this.y = end.y;
    }
  }

  drawerContents
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  const drawerMask = new PIXI.Graphics();
  drawerContainer.addChild(drawerMask);
  drawerMask.beginFill(0x000000);
  drawerMask.drawRoundedRect(0, 0, drawer.width, drawer.height, 20);
  drawerContents.mask = drawerMask;

  drawerContainer.x = getX(app, drawer);
  drawerContainer.y = 0;
  app.stage.addChild(drawerContainer);
};
