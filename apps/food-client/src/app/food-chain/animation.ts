import * as PIXI from 'pixi.js';
import { ShockwaveFilter } from '@pixi/filter-shockwave';
import { Vector2 } from './utils/utils';
import { animations } from './utils/singletons';

export type Anim = {
  time?: number;
  start?: () => void;
  update?: () => void;
  end?: () => void;
};

export const translateObject = (
  object: PIXI.DisplayObject,
  startPos: Vector2,
  endPos: Vector2,
  duration: number
) => {
  return new Promise((resolve, reject) => {
    let time = 0;
    const anim: Anim = {
      update: () => {
        time += 1;
        if (time < duration) {
          object.x = startPos.x + (endPos.x - startPos.x) * (time / duration);
          object.y = startPos.y + (endPos.y - startPos.y) * (time / duration);
        } else {
          object.x = endPos.x;
          object.y = endPos.y;
          animations.splice(animations.indexOf(anim), 1);
          resolve('');
        }
      },
    };
    animations.push(anim);
  });
};

export const scaleObject = (
  object: PIXI.DisplayObject,
  startScale: number,
  endScale: number,
  duration: number
) => {
  return new Promise((resolve, reject) => {
    let time = 0;
    const anim: Anim = {
      update: () => {
        time += 1;
        if (time < duration) {
          object.scale.x =
            startScale + (endScale - startScale) * (time / duration);
          object.scale.y =
            startScale + (endScale - startScale) * (time / duration);
        } else {
          object.scale.y = endScale;
          object.scale.x = endScale;
          animations.splice(animations.indexOf(anim), 1);
          resolve('');
        }
      },
    };
    animations.push(anim);
  });
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
  };

  anim.start = () => {
    if (start) start();
    anim.time = 0;
    animations.push(anim);
  };
  anim.update = () => {
    anim.time += 1;
    if (anim.time < duration) {
      object.x =
        startPos.x +
        (endPos.x - startPos.x) * Math.sin((anim.time / duration) * Math.PI);
      object.y =
        startPos.y +
        (endPos.y - startPos.y) * Math.sin((anim.time / duration) * Math.PI);
    } else {
      anim.end();
    }
  };
  anim.end = () => {
    object.x = startPos.x;
    object.y = startPos.y;
    animations.splice(animations.indexOf(anim), 1);
    if (next) next(anim);
  };

  return anim;
};

export const addShockwave = (
  animations: Anim[],
  object: PIXI.DisplayObject,
  shockwave: ShockwaveFilter,
  duration: number,
  update: (pixelRadius: number) => void
): Anim => {
  const anim: Anim = {
    time: 0,
  };

  anim.start = () => {
    object.filters = [shockwave];
    anim.time = 0;
    shockwave.time = 0;
    animations.push(anim);
  };
  anim.update = () => {
    anim.time += 1;
    update(shockwave.time * shockwave.speed);
    if (anim.time < duration) {
      shockwave.time += 1 / 60;
    } else {
      anim.end();
    }
  };
  anim.end = () => {
    shockwave.time = 0;
    object.filters = [];
    animations.splice(animations.indexOf(anim), 1);
  };

  return anim;
};
