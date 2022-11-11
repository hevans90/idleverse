import { math } from './math';
import { Bounds, Client, Dimensions, Position } from './models';

import { SpatialHashGrid as FastGrid } from './fast';
import { SpatialHashGrid as SlowGrid } from './slow';

// Testing harness

const _NUM_CLIENTS = 1000;
const _ITERATIONS = 100000;

const _CLIENT_BOUNDS: Bounds = {
  lower: { x: -10000, y: -10000 },
  upper: { x: 10000, y: 10000 },
};

const _CLIENT_DIMENSIONS: Dimensions = { width: 10000, height: 10000 };
const _CLIENT_POSITIONS: Position[] = [];

for (let i = 0; i < _NUM_CLIENTS; ++i) {
  _CLIENT_POSITIONS.push({
    x: math.rand_range(_CLIENT_BOUNDS.lower.x, _CLIENT_BOUNDS.upper.x),
    y: math.rand_range(_CLIENT_BOUNDS.lower.y, _CLIENT_BOUNDS.upper.y),
  });
}

const _CLIENT_QUERIES = [];

for (let i = 0; i < _ITERATIONS; ++i) {
  const p = [
    math.rand_range(_CLIENT_BOUNDS.lower.x, _CLIENT_BOUNDS.upper.x),
    math.rand_range(_CLIENT_BOUNDS.lower.y, _CLIENT_BOUNDS.upper.y),
  ];

  _CLIENT_QUERIES.push(p);
}

const _CLIENT_MOVES = [];

for (let i = 0; i < _NUM_CLIENTS; ++i) {
  const p = [Math.random(), Math.random()];

  _CLIENT_MOVES.push(p);
}

class GridTester {
  grid: FastGrid | SlowGrid;
  clients: Client[];

  constructor(gridClass: typeof FastGrid | typeof SlowGrid) {
    this.grid = new gridClass(_CLIENT_BOUNDS, _CLIENT_DIMENSIONS);

    this.clients = [];
    for (let i = 0; i < _NUM_CLIENTS; ++i) {
      const client = this.grid.newClient(`client_${i}`, _CLIENT_POSITIONS[i], {
        width: 15,
        height: 15,
      });
      this.clients.push(client);
    }
  }

  Test_FindNearby() {
    const queryDimensions: Dimensions = { width: 15, height: 15 };

    const startTime = performance.now();
    for (let i = 0; i < _ITERATIONS; ++i) {
      this.grid.findNearby(_CLIENT_QUERIES[i], queryDimensions);
    }
    const totalTime = performance.now() - startTime;
    return totalTime;
  }

  Test_Update() {
    for (let i = 0; i < this.clients.length; ++i) {
      const c = this.clients[i];
      c.position[0] = _CLIENT_POSITIONS[i][0];
      c.position[1] = _CLIENT_POSITIONS[i][1];
      this.grid.updateClient(this.clients[i]);
    }

    const startTime = performance.now();
    for (let i = 0; i < this.clients.length; ++i) {
      const c = this.clients[i];
      c.position[0] += _CLIENT_MOVES[i][0];
      c.position[1] += _CLIENT_MOVES[i][1];
      this.grid.updateClient(this.clients[i]);
    }
    const totalTime = performance.now() - startTime;

    return totalTime;
  }
}

const gridSlow = new GridTester(SlowGrid);
const gridFast = new GridTester(FastGrid);

console.log(
  'Spatial Grid (Naive) - FindNearby: ' + gridSlow.Test_FindNearby() + 'ms'
);
console.log('Spatial Grid - FindNearby: ' + gridFast.Test_FindNearby() + 'ms');
console.log('----------------------------------');
console.log(
  'Spatial Grid (Naive) - FindNearby: ' + gridSlow.Test_FindNearby() + 'ms'
);
console.log('Spatial Grid - FindNearby: ' + gridFast.Test_FindNearby() + 'ms');

console.log('----------------------------------');
console.log('----------------------------------');

console.log('Spatial Grid (Naive) - Update: ' + gridSlow.Test_Update() + 'ms');
console.log('Spatial Grid - Update: ' + gridFast.Test_Update() + 'ms');
console.log('----------------------------------');
console.log('Spatial Grid (Naive) - Update: ' + gridSlow.Test_Update() + 'ms');
console.log('Spatial Grid - Update: ' + gridFast.Test_Update() + 'ms');
