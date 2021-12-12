import * as PIXI from 'pixi.js';
import {
  Card,
  createCardSprite,
  renderManagerCards,
  initManagerContentsContainer,
} from './card/card';
import { ceoCardConfig } from './card/card.configs';
import { Diner, createDiner } from './diner';
import {
  Drawer,
  renderDinerDrawerContents,
  renderDrawer,
  renderBeachContentsHorizontally,
} from './drawer';
import { drawHiresIndicator, Indicator } from './indicators';
import { renderToolbar } from './toolbar';
import { app, currentPlayer, players } from './utils/singletons';

const playerColours = {
  0: 0x5b6ee1,
  1: 0x37946e,
  2: 0xac3232,
  3: 0xdf7126,
  4: 0xd77bba,
};

export type Player = {
  name: string;
  colour: number;
  diners: Diner[];
  drawers: { [key: string]: Drawer };
  ceo: { card: Card };
  food: {
    [key: string]: {
      amount: number;
      sprite?: PIXI.Sprite;
      textSprite?: PIXI.Text;
    };
  };
  cash: number;
  hiresIndicator: Indicator;
  hiresAvailable: number;
};

export const initPlayer = (number: number) => {
  const player: Player = {
    name: `Player ${number + 1}`,
    colour: playerColours[number],
    diners: [],
    ceo: { card: null },
    drawers: {
      structure: null,
      beach: null,
      diners: null,
    },
    hiresAvailable: 10,
    hiresIndicator: null,
    cash: 0,
    food: {
      beer: { amount: 0 },
      lemonade: { amount: 0 },
      cola: { amount: 0 },
      burger: { amount: 0 },
      pizza: { amount: 0 },
    },
  };

  initStructureDrawer(player);
  initBeachDrawer(player);
  initDinersDrawer(player);

  Object.values(player.drawers).forEach((drawer) => renderDrawer(drawer));
  player.hiresIndicator = drawHiresIndicator(player);

  for (let i = 0; i < 3; i++) {
    createDiner(player);
  }
  renderDinerDrawerContents(player);

  initCEOCard(player);

  players.push(player);
};

export const initCEOCard = (player: Player) => {
  const structureDrawer = player.drawers.structure;
  player.ceo.card = {
    ...ceoCardConfig,
    container: new PIXI.Container(),
    sprite: createCardSprite(ceoCardConfig),
    owner: player,
    parent: structureDrawer,
    active: false,
    used: false,
    employees: [],
    maxHires: 1,
    managementSlots: 3,
    contentsSpacing: 3,
    renderContents: () => renderManagerCards(player.ceo.card),
  };
  const ceoCard = player.ceo.card;
  ceoCard.hiresText = new PIXI.Text(
    '',
    new PIXI.TextStyle({
      fontFamily: 'consolas',
      fontWeight: 'bold',
      fill: '#ff00af',
      align: 'center',
      fontSize: 72,
    })
  );
  ceoCard.hiresText.anchor.x = 0.5;
  ceoCard.hiresText.anchor.y = 0.5;
  ceoCard.hiresText.x = ceoCard.sprite.width / 2;
  ceoCard.hiresText.y = ceoCard.sprite.height / 2;
  ceoCard.container.addChild(ceoCard.sprite, ceoCard.hiresText);

  ceoCard.container.position.x =
    structureDrawer.width / 2 - ceoCard.container.width / 2;
  ceoCard.container.position.y = 50;

  structureDrawer.contentsContainer.addChild(ceoCard.container);

  initManagerContentsContainer(ceoCard);
  structureDrawer.contentsContainer.addChild(ceoCard.contentsContainer);
};

export const initPlayers = (number: number) => {
  for (let i = 0; i < number; i++) {
    initPlayer(i);
  }
};

const initStructureDrawer = (player: Player) => {
  player.drawers.structure = {
    name: 'Structure',
    colour: player.colour,
    owner: player,
    open: false,
    startY: 100,
    endY: (app.screen.height - 200) * 0.85,
    width: 1500,
    tabWidth: 40,
    orient: 'left',
    employees: [],
  };
};
const initBeachDrawer = (player: Player) => {
  player.drawers.beach = {
    name: 'Beach',
    colour: player.colour,
    owner: player,
    open: false,
    startY: (app.screen.height - 200) * 0.85,
    endY: app.screen.height - 100,
    width: 1500,
    tabWidth: 40,
    orient: 'left',
    employees: [],
    renderContents: () => renderBeachContentsHorizontally(player),
  };
  const drawer = player.drawers.beach;
  drawer.tabEndY = (drawer.endY - drawer.startY) / 2;
};
const initDinersDrawer = (player: Player) => {
  player.drawers.diners = {
    name: 'Diners',
    colour: player.colour,
    owner: player,
    open: false,
    startY: (app.screen.height - 200) * 0.85,
    endY: app.screen.height - 100,
    width: 1000,
    tabWidth: 40,
    orient: 'left',
    diners: [],
  };
  const drawer = player.drawers.diners;
  drawer.tabStartY = (drawer.endY - drawer.startY) / 2;
};

export const renderPlayerDrawers = (player: Player) => {
  Object.values(player.drawers).forEach((drawer) =>
    app.stage.addChild(drawer.container)
  );
};

export const switchPlayer = (player: Player) => {
  Object.values(currentPlayer.player.drawers).forEach((drawer) =>
    app.stage.removeChild(drawer.container)
  );
  renderPlayerDrawers(player);
  renderToolbar(player);
  currentPlayer.player = player;
  console.log(`Switched to player ${players.indexOf(player) + 1}`);
};
