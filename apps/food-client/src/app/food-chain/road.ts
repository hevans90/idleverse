import * as PIXI from 'pixi.js';
import { rls, ts, ts1_2, ts1_3, ts2_3 } from './utils/constants';
import { BoardObject, Board, getAdjacentRoads } from './board';
import { drawLine, drawDottedLine } from './utils/graphics-utils';
import { app } from './utils/singletons';
import { findRoadPath } from './utils/utils';
import { triggerCarAnimation } from './road.animations';

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

export const getConnectedRoads = (roads: Road[], road: Road): Road[] => {
  let connectedRoads: Road[] = [];

  if (road.connections.includes(1))
    connectedRoads = connectedRoads.concat(
      roads.filter(
        (_road) =>
          _road.i === road.i - 1 &&
          _road.j === road.j &&
          _road.connections.includes(3)
      )
    );
  if (road.connections.includes(2))
    connectedRoads = connectedRoads.concat(
      roads.filter(
        (_road) =>
          _road.i === road.i &&
          _road.j === road.j - 1 &&
          _road.connections.includes(4)
      )
    );
  if (road.connections.includes(3))
    connectedRoads = connectedRoads.concat(
      roads.filter(
        (_road) =>
          _road.i === road.i + 1 &&
          _road.j === road.j &&
          _road.connections.includes(1)
      )
    );
  if (road.connections.includes(4))
    connectedRoads = connectedRoads.concat(
      roads.filter(
        (_road) =>
          _road.i === road.i &&
          _road.j === road.j + 1 &&
          _road.connections.includes(2)
      )
    );

  return connectedRoads;
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
  const adjacentRoads = getConnectedRoads(board.roads, road);
  board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
  adjacentRoads.forEach((road) => (road.sprite.tint = 0x9b39f7));
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
  road.container.zIndex = 30 + zOffset;
  return road;
};

export const addRoadToBoard = (board: Board, road: Road) => {
  road.container.x -= 2;
  road.container.y -= 2;
  road.container.interactive = true;
  road.container.buttonMode = true;
  road.container.on('pointerdown', () => {
    const path = findRoadPath(getAdjacentRoads(board, board.diner), road);
    triggerCarAnimation(path, road as BoardObject);
  });
  board.roads.push(road);
};
