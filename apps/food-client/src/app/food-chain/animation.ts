import * as PIXI from 'pixi.js';
import { Vector2 } from './utils/utils';

export type Anim = {
  startPos?: { x: number; y: number };
  endPos?: { x: number; y: number };
  rotation?: number;
  time: number;
  duration: number;
  object: PIXI.DisplayObject;
  start?: () => void;
  update?: () => void;
  end?: () => void;
};

export const translateObject = (
  animations: Anim[],
  object: PIXI.DisplayObject,
  startPos: Vector2,
  endPos: Vector2,
  rotation: number,
  duration: number,
  start?: () => void,
  next?: (anim: Anim) => void
): Anim => {
  const anim: Anim = {
    startPos,
    endPos,
    rotation,
    time: 0,
    duration,
    object,
  };

  anim.start = () => {
    start();
    anim.object.rotation = anim.rotation;
    anim.time = 0;
    animations.push(anim);
  };
  anim.update = () => {
    anim.time += 1;
    if (anim.time < anim.duration) {
      anim.object.x =
        anim.startPos.x +
        (anim.endPos.x - anim.startPos.x) * (anim.time / anim.duration);
      anim.object.y =
        anim.startPos.y +
        (anim.endPos.y - anim.startPos.y) * (anim.time / anim.duration);
    } else {
      anim.end();
    }
  };
  anim.end = () => {
    anim.object.x = anim.endPos.x;
    anim.object.y = anim.endPos.y;
    animations.splice(animations.indexOf(anim), 1);
    next(anim);
  };

  return anim;
};

export const scaleObject = (
  animations: Anim[],
  object: PIXI.DisplayObject,
  startScale: number,
  endScale: number,
  duration: number,
  start?: () => void,
  next?: (anim: Anim) => void
): Anim => {
  const anim: Anim = {
    time: 0,
    duration,
    object,
  };

  anim.start = () => {
    if (start) start();
    console.log(startScale);
    anim.time = 0;
    animations.push(anim);
  };
  anim.update = () => {
    anim.time += 1;
    if (anim.time < anim.duration) {
      anim.object.scale.x =
        startScale + (endScale - startScale) * (anim.time / anim.duration);
      anim.object.scale.y =
        startScale + (endScale - startScale) * (anim.time / anim.duration);
    } else {
      anim.end();
    }
  };
  anim.end = () => {
    anim.object.scale.y = endScale;
    anim.object.scale.x = endScale;
    animations.splice(animations.indexOf(anim), 1);
    if (next) next(anim);
  };

  return anim;
};
