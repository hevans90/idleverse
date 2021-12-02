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
import { animations, app } from './utils/singletons';

export type Road = BoardObject & {
  fromStart?: number;
  toGoal?: number;
  previousRoad?: Road;
  connections?: number[];
};

export const isRoad = (boardObject: BoardObject): boardObject is Road => {
  return (boardObject as Road).connections !== undefined;
};

export const createRoadSprite = (road: Road) => {
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

const rotateRoad = (road) => {
  return road;
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

const setCarZIndex = (road1, road2) => {
  return road1.container.zIndex > road2.container.zIndex
    ? road1.container.zIndex + 1
    : road2.container.zIndex + 1;
};

export const triggerCarAnimation = (board: Board, road: Road) => {
  const path = findPath(board, getAdjacentRoads(board, board.diner), road);
  const carTexture = PIXI.Texture.from('https://i.imgur.com/01q7OGv.png');
  const carSprite = new PIXI.Sprite(carTexture);
  carSprite.anchor.x = 0.5;
  carSprite.anchor.y = 0.5;
  //carSprite.scale.x = 0.5;
  //carSprite.scale.y = 0.5;
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
            x: road1.container.position.x + ts1_2,
            y: road1.container.position.y + ts1_2,
          },
          {
            x: road2.container.position.x + ts1_2,
            y: road2.container.position.y + ts1_2,
          },
          Math.atan2(
            road2.container.position.y - road1.container.position.y,
            road2.container.position.x - road1.container.position.x
          ),
          20,
          setCarZIndex(road1, road2),
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
          x: road2.container.position.x + ts1_2,
          y: road2.container.position.y + ts1_2,
        },
        {
          x: road2.container.position.x + ts1_2,
          y: road2.container.position.y + ts1_2,
        },
        Math.atan2(
          road2.container.position.y - road1.container.position.y,
          road2.container.position.x - road1.container.position.x
        ),
        100,
        setCarZIndex(road1, road2),
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
            x: road2.container.position.x + ts1_2,
            y: road2.container.position.y + ts1_2,
          },
          {
            x: road1.container.position.x + ts1_2,
            y: road1.container.position.y + ts1_2,
          },
          Math.atan2(
            road1.container.position.y - road2.container.position.y,
            road1.container.position.x - road2.container.position.x
          ),
          20,
          setCarZIndex(road1, road2),
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
          x: road.container.position.x + ts1_2,
          y: road.container.position.y + ts1_2,
        },
        {
          x: road.container.position.x + ts1_2,
          y: road.container.position.y + ts1_2,
        },
        0,
        200,
        road.container.zIndex + 1,
        generatePlayNext(board, queue, carSprite)
      )
    );

    board.container.addChild(carSprite);
    queue[0].start();
  }
};

export const parseRoadConfig = (config: RegExpExecArray, zOffset: number) => {
  const road: Road = {
    w: 1,
    h: 1,
    connections: config[2].split('').map((i) => parseInt(i)),
    container: new PIXI.Container(),
  };
  road.sprite = createRoadSprite(road);
  road.container.addChild(road.sprite);
  road.container.zIndex = 10 + zOffset;
  return road;
};

export const addRoadToBoard = (board: Board, road: Road) => {
  road.container.x -= 2;
  road.container.y -= 2;
  road.container.interactive = true;
  road.container.buttonMode = true;
  road.container.on('pointerdown', () => {
    triggerCarAnimation(board, road);
  });
  board.roads.push(road);
};
