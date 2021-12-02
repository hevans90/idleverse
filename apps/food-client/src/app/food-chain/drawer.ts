import * as PIXI from 'pixi.js';
import { Card } from './card';
import { MarketingTile, MarketingTileKinds } from './marketingTile';
import { baseColour, lineColour } from './types';
import { ts } from './utils/constants';
import { app } from './utils/singletons';

export type Drawer = {
  open: boolean;
  y: number;
  width: number;
  height: number;
  tabY?: number;
  tabHeight?: number;
  tabWidth: number;
  orient: string;
  cards: Card[];
  marketingTiles: MarketingTile[];
  container?: PIXI.Container;
  contentsContainer?: PIXI.Container;
  fixedContainer?: PIXI.Container;
};

const getX = (app: PIXI.Application, drawer: Drawer) => {
  if (drawer.orient === 'left') {
    return drawer.open ? drawer.tabWidth : -drawer.width;
  } else {
    return drawer.open
      ? app.screen.width - drawer.width - drawer.tabWidth
      : app.screen.width;
  }
};

export const toggleOpen = (drawer: Drawer) => {
  drawer.open = !drawer.open;
  drawer.container.x = getX(app, drawer);
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

export const addMarketingTileToDrawer = (
  drawer: Drawer,
  tile: MarketingTile
) => {
  drawer.marketingTiles.push(tile);
  drawer.contentsContainer.addChild(tile.container);
};

export const addCardToDrawer = (drawer: Drawer, card: Card) => {
  drawer.cards.push(card);
  drawer.contentsContainer.addChild(card.container);
};

export const removeCardFromDrawer = (drawer: Drawer, card: Card) => {
  const i = drawer.cards.indexOf(card);
  if (i > -1) {
    drawer.contentsContainer.removeChild(card.container);
    drawer.cards.splice(drawer.cards.indexOf(card), 1);
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

export const organiseMarketingDrawer = (drawer: Drawer) => {
  const kindMap = {
    [MarketingTileKinds.radio]: { x: 1, y: 1 },
    [MarketingTileKinds.airplane]: { x: 1, y: 3 },
    [MarketingTileKinds.mailbox]: { x: 1, y: 6 },
    [MarketingTileKinds.billboard]: { x: 1, y: 9 },
  };

  drawer.marketingTiles.forEach((tile, i) => {
    tile.container.position.x = kindMap[tile.kind].x * ts;
    tile.container.position.y = kindMap[tile.kind].y * ts;
    kindMap[tile.kind].x += tile.w + 1;
  });
};

export const renderDrawer = (drawer: Drawer) => {
  drawer.container = new PIXI.Container();

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
    drawer.tabY ? drawer.tabY : 0,
    40,
    drawer.tabHeight ? drawer.tabHeight : drawer.height,
    20
  );
  drawerTab.endFill();
  drawerTab.interactive = true;
  drawerTab.buttonMode = true;
  drawerTab.on('pointerdown', () => {
    toggleOpen(drawer);
  });
  drawer.container.addChild(drawerBody, drawerTab);

  //Render drawer contents
  const drawerContents = new PIXI.Container();
  drawer.container.addChild(drawerContents);
  drawer.fixedContainer = drawerBody;
  drawer.contentsContainer = drawerContents;

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
  drawer.container.addChild(drawerMask);
  drawerMask.beginFill(0x000000);
  drawerMask.drawRoundedRect(0, 0, drawer.width, drawer.height, 20);
  drawerContents.mask = drawerMask;

  drawerBody.interactive = true;
  drawerBody
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  drawer.container.x = getX(app, drawer);
  drawer.container.y = drawer.y;
  app.stage.addChild(drawer.container);
};
