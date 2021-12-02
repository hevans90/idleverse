import * as PIXI from 'pixi.js';
import { drawDottedLine, drawLine, findPath } from './utils/utils';
import { rls, ts, ts1_2, ts1_3, ts2_3 } from './utils/constants';
import { BoardObject, Board, getAdjacentRoads } from './board';
import { Anim, translateObject } from './animation';

export type Road = BoardObject & {
  fromStart?: number;
  toGoal?: number;
  previousRoad?: Road;
  connections?: number[];
};

export const getConnectedRoads = (roads: Road[], road: Road) => {
  return;
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

export const addRoadToBoard = (
  app: PIXI.Application,
  animations: Anim[],
  queue: Anim[],
  board: Board,
  i: number,
  j: number,
  connections: number[]
) => {
  const road: Road = {
    i: i,
    j: j,
    w: 0,
    h: 0,
    connections: connections,
  };
  board.roads.push(road);
  const roadSprite = createRoadSprite(app, road);
  roadSprite.x = road.i * ts;
  roadSprite.y = road.j * ts;
  roadSprite.interactive = true;
  roadSprite.buttonMode = true;
  roadSprite.on('pointerdown', () => {
    // const adjacentRoads = getAdjacentRoads(board, road);
    // board.roads.forEach((road) => (road.sprite.tint = 0xffffff));
    // adjacentRoads.forEach((road) => (road.sprite.tint = 0x9b39f7));
    const path = findPath(board, getAdjacentRoads(board, board.diner), road);
    const carTexture = PIXI.Texture.from('https://i.imgur.com/01q7OGv.png');
    const carSprite = new PIXI.Sprite(carTexture);
    carSprite.anchor.x = 0.5;
    carSprite.anchor.y = 0.5;
    for (let i = 0; i < path.length - 1; i++) {
      const road1 = path[i];
      const road2 = path[i + 1];
      queue.push(
        translateObject(
          animations,
          queue,
          board,
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
          20
        )
      );
    }
    const road1 = path[path.length - 2];
    const road2 = path[path.length - 1];
    queue.push(
      translateObject(
        animations,
        queue,
        board,
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
        200
      )
    );
    for (let i = path.length - 2; i >= 0; i--) {
      const road1 = path[i];
      const road2 = path[i + 1];
      queue.push(
        translateObject(
          animations,
          queue,
          board,
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
          20
        )
      );
    }
    board.container.addChild(carSprite);
    queue[0].start();
  });
  road.sprite = roadSprite;
  board.container.addChild(roadSprite);
};
