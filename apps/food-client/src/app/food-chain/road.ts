import * as PIXI from 'pixi.js';
import { findPath } from './utils/utils';
import { rls, ts, ts1_2, ts1_3, ts2_3 } from './utils/constants';
import {
  BoardObject,
  Board,
  getAdjacentRoads,
  getConnectedRoads,
} from './board';
import { Anim, translateObject } from './animation';
import { drawLine, drawDottedLine } from './utils/graphics-utils';

export type Road = BoardObject & {
  fromStart?: number;
  toGoal?: number;
  previousRoad?: Road;
  connections?: number[];
};

export const createRoadSprite = (app: PIXI.Application, road: Road) => {
  const roadGraphic = new PIXI.Graphics();

  roadGraphic.drawRect(-2, -2, ts, ts);

  roadGraphic.beginFill(0xd3d3d3);
  roadGraphic.drawRect(ts1_3, ts1_3, ts2_3 - ts1_3, ts2_3 - ts1_3);
  roadGraphic.endFill();

  roadGraphic.lineStyle(4, 0x0, 1);

  if (road.connections.includes(1)) {
    roadGraphic.lineStyle(4, 0x0, 0);
    roadGraphic.beginFill(0xd3d3d3);
    roadGraphic.drawRect(0, ts1_3, ts1_3, ts2_3 - ts1_3);
    roadGraphic.endFill();

    roadGraphic.lineStyle(4, 0x0, 1);
    drawLine(roadGraphic, { x: 0, y: ts1_3 }, { x: ts1_3, y: ts1_3 });
    drawDottedLine(
      roadGraphic,
      { x: 0, y: ts1_2 },
      { x: ts1_2, y: ts1_2 },
      rls
    );
    drawLine(roadGraphic, { x: 0, y: ts2_3 }, { x: ts1_3, y: ts2_3 });
  } else {
    drawLine(roadGraphic, { x: ts1_3, y: ts1_3 }, { x: ts1_3, y: ts2_3 });
  }

  if (road.connections.includes(2)) {
    roadGraphic.lineStyle(4, 0x0, 0);
    roadGraphic.beginFill(0xd3d3d3);
    roadGraphic.drawRect(ts1_3, 0, ts2_3 - ts1_3, ts1_3);
    roadGraphic.endFill();

    roadGraphic.lineStyle(4, 0x0, 1);
    drawLine(roadGraphic, { x: ts1_3, y: ts1_3 }, { x: ts1_3, y: 0 });
    drawDottedLine(
      roadGraphic,
      { x: ts1_2, y: 0 },
      { x: ts1_2, y: ts1_2 },
      rls
    );
    drawLine(roadGraphic, { x: ts2_3, y: ts1_3 }, { x: ts2_3, y: 0 });
  } else {
    drawLine(roadGraphic, { x: ts1_3, y: ts1_3 }, { x: ts2_3, y: ts1_3 });
  }

  if (road.connections.includes(3)) {
    roadGraphic.lineStyle(4, 0x0, 0);
    roadGraphic.beginFill(0xd3d3d3);
    roadGraphic.drawRect(ts2_3, ts1_3, ts1_3, ts2_3 - ts1_3);
    roadGraphic.endFill();

    roadGraphic.lineStyle(4, 0x0, 1);
    drawLine(roadGraphic, { x: ts2_3, y: ts1_3 }, { x: ts, y: ts1_3 });
    drawDottedLine(
      roadGraphic,
      { x: ts, y: ts1_2 },
      { x: ts1_2, y: ts1_2 },
      rls
    );
    drawLine(roadGraphic, { x: ts2_3, y: ts2_3 }, { x: ts, y: ts2_3 });
  } else {
    drawLine(roadGraphic, { x: ts2_3, y: ts1_3 }, { x: ts2_3, y: ts2_3 });
  }

  if (road.connections.includes(4)) {
    roadGraphic.lineStyle(4, 0x0, 0);
    roadGraphic.beginFill(0xd3d3d3);
    roadGraphic.drawRect(ts1_3, ts2_3, ts2_3 - ts1_3, ts1_3);
    roadGraphic.endFill();

    roadGraphic.lineStyle(4, 0x0, 1);
    drawLine(roadGraphic, { x: ts1_3, y: ts2_3 }, { x: ts1_3, y: ts });
    drawDottedLine(
      roadGraphic,
      { x: ts1_2, y: ts },
      { x: ts1_2, y: ts1_2 },
      rls
    );
    drawLine(roadGraphic, { x: ts2_3, y: ts2_3 }, { x: ts2_3, y: ts });
  } else {
    drawLine(roadGraphic, { x: ts2_3, y: ts2_3 }, { x: ts1_3, y: ts2_3 });
  }

  const roadTexture = app.renderer.generateTexture(roadGraphic);
  const roadSprite = new PIXI.Sprite(roadTexture);
  roadGraphic.destroy();

  return roadSprite;
};

export const tintAdjacentRoads = (board: Board, road: Road) => {
  const adjacentRoads = getAdjacentRoads(board, road);
  board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
  adjacentRoads.forEach((road) => (road.sprite.tint = 0x9b39f7));
};

export const tintConnectedRoads = (board: Board, road: Road) => {
  const adjacentRoads = getConnectedRoads(board, road);
  board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
  adjacentRoads.forEach((road) => (road.sprite.tint = 0x9b39f7));
};

const generatePlayNext = (
  board: Board,
  queue: Anim[],
  object: PIXI.DisplayObject
) => {
  return (anim: Anim) => {
    queue.splice(queue.indexOf(anim), 1);
    if (queue.length > 0) {
      queue[0].start();
    } else board.container.removeChild(object);
  };
};

const triggerCarAnimation = (animations: Anim[], board: Board, road: Road) => {
  const path = findPath(board, getAdjacentRoads(board, board.diner), road);
  const carTexture = PIXI.Texture.from('https://i.imgur.com/01q7OGv.png');
  const carSprite = new PIXI.Sprite(carTexture);
  carSprite.anchor.x = 0.5;
  carSprite.anchor.y = 0.5;
  const queue: Anim[] = [];
  if (path.length > 1) {
    for (let i = 0; i < path.length - 1; i++) {
      const road1 = path[i];
      const road2 = path[i + 1];
      queue.push(
        translateObject(
          animations,
          carSprite,
          {
            x: road1.sprite.position.x + ts1_2,
            y: road1.sprite.position.y + ts1_2,
          },
          {
            x: road2.sprite.position.x + ts1_2,
            y: road2.sprite.position.y + ts1_2,
          },
          Math.atan2(
            road2.sprite.position.y - road1.sprite.position.y,
            road2.sprite.position.x - road1.sprite.position.x
          ),
          20,
          generatePlayNext(board, queue, carSprite)
        )
      );
    }
    const road1 = path[path.length - 2];
    const road2 = path[path.length - 1];
    queue.push(
      translateObject(
        animations,
        carSprite,
        {
          x: road2.sprite.position.x + ts1_2,
          y: road2.sprite.position.y + ts1_2,
        },
        {
          x: road2.sprite.position.x + ts1_2,
          y: road2.sprite.position.y + ts1_2,
        },
        Math.atan2(
          road2.sprite.position.y - road1.sprite.position.y,
          road2.sprite.position.x - road1.sprite.position.x
        ),
        100,
        generatePlayNext(board, queue, carSprite)
      )
    );
    for (let i = path.length - 2; i >= 0; i--) {
      const road1 = path[i];
      const road2 = path[i + 1];
      queue.push(
        translateObject(
          animations,
          carSprite,
          {
            x: road2.sprite.position.x + ts1_2,
            y: road2.sprite.position.y + ts1_2,
          },
          {
            x: road1.sprite.position.x + ts1_2,
            y: road1.sprite.position.y + ts1_2,
          },
          Math.atan2(
            road1.sprite.position.y - road2.sprite.position.y,
            road1.sprite.position.x - road2.sprite.position.x
          ),
          20,
          generatePlayNext(board, queue, carSprite)
        )
      );
    }

    board.container.addChild(carSprite);
    queue[0].start();
  } else if (path.length === 1) {
    queue.push(
      translateObject(
        animations,
        carSprite,
        {
          x: road.sprite.position.x + ts1_2,
          y: road.sprite.position.y + ts1_2,
        },
        {
          x: road.sprite.position.x + ts1_2,
          y: road.sprite.position.y + ts1_2,
        },
        0,
        200,
        generatePlayNext(board, queue, carSprite)
      )
    );

    board.container.addChild(carSprite);
    queue[0].start();
  }
};

export const addRoadToBoard = (
  app: PIXI.Application,
  animations: Anim[],
  board: Board,
  i: number,
  j: number,
  connections: number[]
) => {
  const road: Road = {
    i: i,
    j: j,
    w: 1,
    h: 1,
    connections: connections,
  };
  board.roads.push(road);
  const roadSprite = createRoadSprite(app, road);
  roadSprite.x = road.i * ts;
  roadSprite.y = road.j * ts;
  roadSprite.interactive = true;
  roadSprite.buttonMode = true;
  roadSprite.on('pointerdown', () => {
    triggerCarAnimation(animations, board, road);
  });
  road.sprite = roadSprite;
  board.container.addChild(roadSprite);
};
