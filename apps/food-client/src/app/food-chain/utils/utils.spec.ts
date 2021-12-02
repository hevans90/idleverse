import { BoardItem } from '../board';
import { collides } from './utils';

const item1: BoardItem = {
  i: 6,
  j: 11,
  w: 1,
  h: 1,
};

const item2: BoardItem = {
  i: 7,
  j: 12,
  w: 1,
  h: 1,
};

const item3: BoardItem = {
  i: 7,
  j: 13,
  w: 1,
  h: 1,
};

const item4: BoardItem = {
  i: 12,
  j: 12,
  w: 1,
  h: 1,
};

const item5: BoardItem = {
  i: 12,
  j: 12,
  w: 0,
  h: 0,
};

const item6: BoardItem = {
  i: 14,
  j: 12,
  w: 0,
  h: 0,
};

const item7: BoardItem = {
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
