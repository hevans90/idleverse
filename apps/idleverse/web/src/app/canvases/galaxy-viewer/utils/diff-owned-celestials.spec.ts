import {
  diffOwnedCelestials,
  claimedCelestials,
} from './diff-owned-celestials';

let prev: claimedCelestials;
let curr: claimedCelestials;

const cels: claimedCelestials = [
  { id: '0', owner_id: 'a' },
  { id: '1', owner_id: 'a' },
  { id: '2', owner_id: 'a' },
  { id: '3', owner_id: 'a' },
];

describe('diffOwnedCelestials', () => {
  beforeEach(() => {
    prev = [];
    curr = [];
  });

  it('should return undefined for empty array inputs', () => {
    expect(diffOwnedCelestials(prev, curr)).toEqual({
      additions: undefined,
      deletions: undefined,
    } as ReturnType<typeof diffOwnedCelestials>);
  });

  it('should return a single addition if appropriate', () => {
    prev = [];
    curr = [cels[0]];

    expect(diffOwnedCelestials(prev, curr)).toEqual({
      additions: [cels[0]],
      deletions: undefined,
    } as ReturnType<typeof diffOwnedCelestials>);
  });

  it('should return a single deletion if appropriate', () => {
    prev = [cels[0]];
    curr = [];

    expect(diffOwnedCelestials(prev, curr)).toEqual({
      additions: undefined,
      deletions: [cels[0]],
    } as ReturnType<typeof diffOwnedCelestials>);
  });

  it('should return a single addition and deletion if appropriate', () => {
    prev = [cels[0]];
    curr = [cels[1]];

    expect(diffOwnedCelestials(prev, curr)).toEqual({
      additions: [cels[1]],
      deletions: [cels[0]],
    } as ReturnType<typeof diffOwnedCelestials>);
  });

  it('should return multiple additions if appropriate', () => {
    prev = [];
    curr = cels;

    expect(diffOwnedCelestials(prev, curr)).toEqual({
      additions: cels,
      deletions: undefined,
    } as ReturnType<typeof diffOwnedCelestials>);
  });

  it('should return multiple deletions if appropriate', () => {
    prev = cels;
    curr = [];

    expect(diffOwnedCelestials(prev, curr)).toEqual({
      additions: undefined,
      deletions: cels,
    } as ReturnType<typeof diffOwnedCelestials>);
  });
});
