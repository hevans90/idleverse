import * as PIXI from 'pixi.js';
import { Vector2 } from './utils/utils';

export type Anim = {
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
    start();
    anim.time = 0;
    animations.push(anim);
  };
  anim.update = () => {
    anim.time += 1;
    if (anim.time < anim.duration) {
      anim.object.x =
        startPos.x + (endPos.x - startPos.x) * (anim.time / anim.duration);
      anim.object.y =
        startPos.y + (endPos.y - startPos.y) * (anim.time / anim.duration);
    } else {
      anim.end();
    }
  };
  anim.end = () => {
    anim.object.x = endPos.x;
    anim.object.y = endPos.y;
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

export const bounceObject = (
  animations: Anim[],
  object: PIXI.DisplayObject,
  startPos: Vector2,
  endPos: Vector2,
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
    anim.time = 0;
    animations.push(anim);
  };
  anim.update = () => {
    anim.time += 1;
    if (anim.time < anim.duration) {
      anim.object.x =
        startPos.x +
        (endPos.x - startPos.x) *
          Math.sin((anim.time / anim.duration) * Math.PI);
      anim.object.y =
        startPos.y +
        (endPos.y - startPos.y) *
          Math.sin((anim.time / anim.duration) * Math.PI);
    } else {
      anim.end();
    }
  };
  anim.end = () => {
    anim.object.x = startPos.x;
    anim.object.y = startPos.y;
    animations.splice(animations.indexOf(anim), 1);
    if (next) next(anim);
  };

  return anim;
};
