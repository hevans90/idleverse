import { collides } from './utils';
import { BoardObject } from '../types';

const item1: BoardObject = {
  i: 6,
  j: 11,
  w: 1,
  h: 1,
};

const item2: BoardObject = {
  i: 7,
  j: 12,
  w: 1,
  h: 1,
};

const item3: BoardObject = {
  i: 7,
  j: 13,
  w: 1,
  h: 1,
};

const item4: BoardObject = {
  i: 12,
  j: 12,
  w: 1,
  h: 1,
};

const item5: BoardObject = {
  i: 12,
  j: 12,
  w: 0,
  h: 0,
};

const item6: BoardObject = {
  i: 14,
  j: 12,
  w: 0,
  h: 0,
};

const item7: BoardObject = {
  i: 12,
  j: 14,
  w: 0,
  h: 0,
};

describe('collision', () => {
  it('item1 should collide with item2', () => {
    expect(collides(item1, item2)).toBeTruthy();
  });

  it('item1 should not collide with item3', () => {
    expect(collides(item1, item3)).toBeFalsy();
  });

  it('item4 should collide with item5', () => {
    expect(collides(item4, item5)).toBeTruthy();
  });

  it('item4 should not collide with item6', () => {
    expect(collides(item4, item6)).toBeFalsy();
  });

  it('item4 should not collide with item7', () => {
    expect(collides(item4, item7)).toBeFalsy();
  });
});
