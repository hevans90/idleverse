import * as PIXI from 'pixi.js';
import { translateObject } from './animation';
import { Diner } from './diner';
import { House } from './house';
import { MarketingTile } from './marketingTile';
import { Player } from './player';
import { baseColour, lineColour } from './types';
import { ts } from './utils/constants';
import { app, communalDrawers, players } from './utils/singletons';
import { drawArrow } from './utils/graphics-utils';
import { Card } from './card/card';

export type Drawer = {
  name: string;
  colour: number;
  open: boolean;
  startY: number;
  endY: number;
  width: number;
  tabStartY?: number;
  tabEndY?: number;
  tabWidth: number;
  orient: string;
  owner?: Player;
  employees?: Card[];
  marketingTiles?: MarketingTile[];
  houses?: House[];
  diners?: Diner[];
  container?: PIXI.Container;
  contentsContainer?: PIXI.Container;
  fixedContainer?: PIXI.Container;
  renderContents?: () => void;
};

const getDrawerXPos = (drawer: Drawer) => {
  if (drawer.orient === 'left') {
    return drawer.open ? drawer.tabWidth : -drawer.width;
  } else {
    return drawer.open
      ? app.screen.width - drawer.width - drawer.tabWidth
      : app.screen.width;
  }
};

export const openDrawer = (drawer: Drawer) => {
  if (!drawer.open) toggleDrawerOpen(drawer);
};

export const closeAllDrawers = async () => {
  const promises = [];
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    for (let j = 0; j < Object.keys(player.drawers).length; j++) {
      const drawer = Object.values(player.drawers)[j];
      if (drawer.open) promises.push(toggleDrawerOpen(drawer));
    }
  }
  for (let i = 0; i < Object.values(communalDrawers).length; i++) {
    const drawer = Object.values(communalDrawers)[i];
    if (drawer.open) promises.push(toggleDrawerOpen(drawer));
  }
  await Promise.all(promises);
};

export const toggleDrawerOpen = async (drawer: Drawer) => {
  drawer.open = !drawer.open;
  await translateObject(
    drawer.container,
    { x: drawer.container.position.x, y: drawer.container.position.y },
    { x: getDrawerXPos(drawer), y: drawer.container.position.y },
    25
  );
};

const arrangeStack = (stack: Card[], x: number, y: number) => {
  stack.forEach((card: Card, i) => {
    card.container.zIndex = 1;
    card.container.position.x = x + 3 * i;
    card.container.position.y = y + 3 * i;
  });
};

const getStacks = (drawer: Drawer) => {
  const stacks: { [key: string]: Card[] } = {};
  drawer.employees.forEach((card) => {
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

export const addMarketingTileToDrawer = (tile: MarketingTile) => {
  const drawer = communalDrawers.market;
  drawer.marketingTiles.push(tile);
  drawer.contentsContainer.addChild(tile.container);
};

export const addHouseToDrawer = (house: House) => {
  const drawer = communalDrawers.development;
  drawer.houses.push(house);
  drawer.contentsContainer.addChild(house.container);
};

export const addDinerToDrawer = (player: Player, diner: Diner) => {
  const drawer = player.drawers.diners;
  drawer.diners.push(diner);
  drawer.contentsContainer.addChild(diner.container);
};

export const renderRecruitDrawerContents = () => {
  const drawer = communalDrawers.recruit;
  const stacks = getStacks(drawer);
  stacks.forEach((stack) => {
    const firstCard = stack[0];
    arrangeStack(
      stack,
      firstCard.position * (firstCard.container.width + 75) + 10,
      firstCard.row * (firstCard.container.height + 75) + 10
    );
  });
  stacks.forEach((stack) => {
    const card2 = stack[0];
    if (card2.promotesFrom) {
      const card1 = stacks.find(
        (stack) => stack[0].kind === card2.promotesFrom
      )[0];
      const arrow = drawArrow(card1, card2);
      arrow.zIndex = 0;
      drawer.contentsContainer.addChild(arrow);
    }
  });
};

export const renderMarketingDrawerContents = () => {
  const drawer = communalDrawers.market;
  const kindMap = {
    radio: { x: 1, y: 1 },
    airplane: { x: 1, y: 3 },
    mailbox: { x: 1, y: 6 },
    billboard: { x: 1, y: 9 },
  };

  drawer.marketingTiles.forEach((tile, i) => {
    tile.container.position.x = kindMap[tile.kind.name].x * ts;
    tile.container.position.y = kindMap[tile.kind.name].y * ts;
    kindMap[tile.kind.name].x += tile.w + 1;
  });
};

export const renderDevelopmentDrawerContents = () => {
  const drawer = communalDrawers.development;

  drawer.houses.forEach((house, i) => {
    house.container.position.x = ts * (4 * i + 1);
    house.container.position.y = ts;
  });
};

export const renderBeachContentsHorizontally = (player: Player) => {
  const drawer = player.drawers.beach;
  const stacks = getStacks(drawer);
  stacks.forEach((stack, i) => {
    const firstCard = stack[0];
    arrangeStack(stack, i * (firstCard.container.width + 50) + 10, 10);
  });
};

export const renderDinerDrawerContents = (player: Player) => {
  const drawer = player.drawers.diners;
  drawer.diners.forEach((diner, i) => {
    diner.container.position.x = i * (diner.container.width + 50) + 10;
    diner.container.position.y = 10;
  });
};

export const renderDrawer = (drawer: Drawer) => {
  drawer.container = new PIXI.Container();

  // Render drawer body
  const drawerBody = new PIXI.Graphics();
  drawerBody.lineStyle(2, lineColour, 1);
  drawerBody.beginFill(drawer.colour);
  drawerBody.drawRoundedRect(
    0,
    0,
    drawer.width,
    drawer.endY - drawer.startY,
    20
  );
  drawerBody.endFill();

  // Render drawer tab
  const drawerTab = new PIXI.Graphics();
  drawerTab.lineStyle(2, lineColour, 1);
  drawerTab.beginFill(drawer.colour);
  drawerTab.drawRoundedRect(
    drawer.orient === 'left' ? drawer.width : -40,
    drawer.tabStartY ? drawer.tabStartY : 0,
    40,
    (drawer.tabEndY ? drawer.tabEndY : drawer.endY - drawer.startY) -
      (drawer.tabStartY ? drawer.tabStartY : 0),
    20
  );
  drawerTab.endFill();
  drawerTab.interactive = true;
  drawerTab.buttonMode = true;
  drawerTab.on('pointerdown', () => {
    toggleDrawerOpen(drawer);
  });

  const drawerTabText = new PIXI.Text(
    drawer.name,
    new PIXI.TextStyle({
      fontFamily: 'consolas',
      fill: lineColour,
      align: 'center',
      fontSize: 20,
      wordWrap: true,
      wordWrapWidth: 190,
    })
  );
  drawerTabText.rotation = Math.PI / 2;
  drawerTabText.position.x = drawer.orient === 'left' ? drawer.width + 30 : -10;
  drawerTabText.position.y = (drawer.tabStartY ? drawer.tabStartY : 0) + 20;

  drawer.container.addChild(drawerBody, drawerTab, drawerTabText);

  //Render drawer contents
  const drawerContents = new PIXI.Container();
  drawer.container.addChild(drawerContents);
  drawer.fixedContainer = drawerBody;
  drawer.contentsContainer = drawerContents;
  drawer.contentsContainer.sortableChildren = true;

  //Render object to artifially fix width of drawer at (0, 0)
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
  drawerMask.drawRoundedRect(
    0,
    0,
    drawer.width,
    drawer.endY - drawer.startY,
    20
  );
  drawerContents.mask = drawerMask;

  drawerBody.interactive = true;
  drawerBody
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  drawer.container.x = getDrawerXPos(drawer);
  drawer.container.y = drawer.startY;
};
