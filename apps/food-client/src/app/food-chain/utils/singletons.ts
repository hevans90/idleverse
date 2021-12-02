import * as PIXI from 'pixi.js';
import { Anim } from '../animation';

export const app = new PIXI.Application({
  transparent: true,
});

export const animations: Anim[] = [];

export const keyEventMap = {
  Space: () => {
    console.log('Space bar pressed');
  },
};
