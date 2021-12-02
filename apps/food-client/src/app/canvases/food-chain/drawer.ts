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

const arrangeStack = (
  drawer: Drawer,
  stack: Card[],
  stackIndex: number = null
) => {
  stack.forEach((card: Card, i) => {
    card.container.position.x =
      (stackIndex !== null ? stackIndex : card.position) *
        (card.container.width + 50) +
      10 +
      3 * i;
    card.container.position.y =
      (stackIndex !== null ? 0 : card.row) * (card.container.height + 50) +
      10 +
      3 * i;
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
  card: Card,
  drawer: Drawer,
  player: Player = null
) => {
  drawer.cards.push(card);
  drawer.container.addChild(card.container);
  card.owner = player;
  const stacks = getStacks(drawer);
  stacks.forEach((stack, i) => arrangeStack(drawer, stack, player ? i : null));
  // const cardInDrawer = drawer.cards.find((_card) => _card.title === card.title);
  // if (cardInDrawer) cardInDrawer.count += card.count;
  // else drawer.cards.push({ ...card, count: card.count });
};

export const removeFromDrawer = (
  card: Card,
  drawer: Drawer,
  player: Player = null
) => {
  drawer.container.removeChild(card.container);
  drawer.cards.splice(drawer.cards.indexOf(card), 1);
  const stacks = getStacks(drawer);
  stacks.forEach((stack) =>
    arrangeStack(drawer, stack, player ? stacks.indexOf(stack) : null)
  );
  // const cardInDrawer = drawer.cards.find((_card) => _card.title === card.title);
  // if (cardInDrawer) cardInDrawer.count += card.count;
  // else drawer.cards.push({ ...card, count: card.count });
};

export const renderDrawer = (app: PIXI.Application, drawer: Drawer) => {
  const drawerContainer = new PIXI.Container();
  drawerContainer.interactive = true;

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

  const drawerContents = new PIXI.Container();
  drawerContainer.addChild(drawerContents);
  drawer.fixedContainer = drawerBody;
  drawer.container = drawerContents;

  const drawerContentsPlaceholder = new PIXI.Graphics();
  drawerContentsPlaceholder.beginFill(baseColour);
  drawerContentsPlaceholder.drawRoundedRect(10, 10, 1, 1, 20);
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
    console.log(end);

    console.log({
      x: -drawerContents.width + drawerBody.width - 20,
      y: -drawerContents.height + drawerBody.height - 20,
    });
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

  drawerContainer
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  const drawerMask = new PIXI.Graphics();
  drawerContainer.addChild(drawerMask);
  drawerMask.beginFill(0x000000);
  drawerMask.drawRoundedRect(0, 10, drawer.width, drawer.height, 20);
  drawerContents.mask = drawerMask;

  drawerContainer.x = getX(app, drawer);
  drawerContainer.y = drawer.y;
  app.stage.addChild(drawerContainer);
};
