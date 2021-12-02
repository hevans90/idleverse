import * as PIXI from 'pixi.js';
import { Card } from './card';
import { baseColour, lineColour, Player } from './types';

export type Drawer = {
  open: boolean;
  y: number;
  width: number;
  height: number;
  tabWidth: number;
  orient: string;
  cards: Card[];
  container?: PIXI.Container;
  fixedContainer?: PIXI.Container;
};

const getX = (app: PIXI.Application, drawer: Drawer) => {
  if (drawer.orient === 'left') {
    return drawer.open ? 0 : -drawer.width;
  } else {
    return drawer.open ? app.screen.width - drawer.width : app.screen.width;
  }
};

const arrangeStack = (stack: Card[], x: number, y: number) => {
  stack.forEach((card: Card, i) => {
    card.container.position.x = x + 3 * i;
    card.container.position.y = y + 3 * i;
  });
};

const getStacks = (drawer: Drawer) => {
  const stacks: { [key: string]: Card[] } = {};
  drawer.cards.forEach((card) => {
    stacks[card.title]
      ? stacks[card.title].push(card)
      : (stacks[card.title] = [card]);
    return stacks;
  });
  const sortedStacks = Object.values(stacks).sort((stack1, stack2) =>
    stack1[0].title.localeCompare(stack2[0].title)
  );
  return sortedStacks;
};

export const addToDrawer = (
  drawer: Drawer,
  card: Card,
  player: Player = null
) => {
  drawer.cards.push(card);
  drawer.container.addChild(card.container);
  card.owner = player;
};

export const removeFromDrawer = (
  drawer: Drawer,
  card: Card,
  player: Player = null
) => {
  const i = drawer.cards.indexOf(card);
  if (i > -1) {
    drawer.container.removeChild(card.container);
    drawer.cards.splice(drawer.cards.indexOf(card), 1);
    card.owner = player;
  }
};

export const organiseRecruitDrawer = (drawer: Drawer) => {
  const stacks = getStacks(drawer);
  stacks.forEach((stack) => {
    const firstCard = stack[0];
    arrangeStack(
      stack,
      firstCard.position * (firstCard.container.width + 50) + 10,
      firstCard.row * (firstCard.container.height + 50) + 10
    );
  });
};

export const organiseBeachDrawer = (drawer: Drawer) => {
  const stacks = getStacks(drawer);
  stacks.forEach((stack, i) => {
    const firstCard = stack[0];
    arrangeStack(stack, i * (firstCard.container.width + 50) + 10, 10);
  });
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

  //Render drawer contents
  const drawerContents = new PIXI.Container();
  drawerContainer.addChild(drawerContents);
  drawer.fixedContainer = drawerBody;
  drawer.container = drawerContents;

  //Render object to artifially fix width of drawer at 0,0
  const drawerContentsPlaceholder = new PIXI.Graphics();
  drawerContentsPlaceholder.beginFill(baseColour);
  drawerContentsPlaceholder.drawRoundedRect(0, 0, 1, 1, 20);
  drawerContentsPlaceholder.endFill();
  drawerContents.addChild(drawerContentsPlaceholder);

  const start = { x: 0, y: 0 };
  const end = { x: 0, y: 0 };
  let dragging = false;

  function onDragStart(event: PIXI.InteractionEvent) {
    start.x = event.data.global.x - drawerContents.position.x;
    start.y = event.data.global.y - drawerContents.position.y;
    dragging = true;
  }

  function onDragEnd() {
    // snap to start if container is barely scrolled
    if (end.x > 0) {
      drawerContents.x = 0;
    }
    if (end.y > 0) {
      drawerContents.y = 0;
    }
    dragging = false;
  }

  function onDragMove(event: PIXI.InteractionEvent) {
    if (dragging) {
      end.x = event.data.global.x - start.x;
      end.y = event.data.global.y - start.y;
      if (end.x < 0 && end.x > -drawerContents.width + drawerBody.width - 20)
        drawerContents.x = end.x;
      if (end.y < 0 && end.y > -drawerContents.height + drawerBody.height - 20)
        drawerContents.y = end.y;
      if (-drawerContents.width + drawerBody.width - 20 > 0)
        drawerContents.x = 0;
      if (-drawerContents.height + drawerBody.height - 20 > 0)
        drawerContents.y = 0;
    }
  }

  const drawerMask = new PIXI.Graphics();
  drawerContainer.addChild(drawerMask);
  drawerMask.beginFill(0x000000);
  drawerMask.drawRoundedRect(0, 0, drawer.width, drawer.height, 20);
  drawerContents.mask = drawerMask;

  drawerBody.interactive = true;
  drawerBody
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  drawerContainer.x = getX(app, drawer);
  drawerContainer.y = drawer.y;
  app.stage.addChild(drawerContainer);
};
