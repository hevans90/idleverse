import { math } from './math';
import {
  Bounds,
  Dimensions,
  LinkedListItem,
  Position,
  SpatialHashGridClient,
} from './models';

export class SpatialHashGrid {
  queryIds: number;
  bounds: Bounds;

  // height and width of each cell in the grid
  dimensions: Dimensions;
  cells: LinkedListItem[][];

  constructor(bounds: Bounds, dimensions: Dimensions) {
    this.bounds = bounds;
    this.dimensions = dimensions;
    this.cells = [...Array(dimensions.width)].map((_) =>
      [...Array(dimensions.height)].map(() => null)
    );
    this.queryIds = 0;
  }

  newClient = (name: string, position: Position, dimensions: Dimensions) => {
    const client: SpatialHashGridClient = {
      name,
      position,
      dimensions,
      cells: {
        min: null,
        max: null,
        nodes: null,
      },
      queryId: -1,
    };
    this.insert(client);

    return client;
  };

  private insert = (client: SpatialHashGridClient) => {
    const { x, y } = client.position;
    const { width, height } = client.dimensions;

    const i1 = this.getCellIndex({ x: x - width / 2, y: y - height / 2 });
    const i2 = this.getCellIndex({ x: x + width / 2, y: y + height / 2 });

    const nodes: LinkedListItem[][] = [];

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      nodes.push([]);
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const xi = x - i1[0];

        const head: LinkedListItem = {
          next: null,
          prev: null,
          client,
        };

        nodes[xi].push(head);
        head.next = this.cells[x][y];

        if (this.cells[x][y]) {
          this.cells[x][y].prev = head;
        }

        this.cells[x][y] = head;
      }
    }
    client.cells.min = i1;
    client.cells.max = i2;
    client.cells.nodes = nodes;
  };

  private getCellIndex = (position: Position): [number, number] => {
    const x = math.sat(
      (position.x - this.bounds.lower.x) /
        (this.bounds.upper.x - this.bounds.lower.x)
    );
    const y = math.sat(
      (position.y - this.bounds.lower.y) /
        (this.bounds.upper.y - this.bounds.lower.y)
    );

    const xIndex = Math.floor(x * (this.dimensions.width - 1));
    const yIndex = Math.floor(y * (this.dimensions.height - 1));

    return [xIndex, yIndex];
  };

  findNearby = (position: Position, dimensions: Dimensions) => {
    const { x, y } = position;
    const { width, height } = dimensions;

    const clients: SpatialHashGridClient[] = [];
    const localQueryId = this.queryIds++;

    const i1 = this.getCellIndex({ x: x - width / 2, y: y - height / 2 });
    const i2 = this.getCellIndex({ x: x + width / 2, y: y + height / 2 });

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        let head = this.cells[x][y];

        while (head) {
          const v = head.client;
          head = head.next;
          if (v.queryId !== localQueryId) {
            v.queryId = localQueryId;
            clients.push(v);
          }
        }
      }
    }

    return clients;
  };

  findNearbyCircle = (position: Position, radius: number) => {
    const insideCircle = (tile: Position) => {
      const dx = position.x - tile.x;
      const dy = position.y - tile.y;

      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= radius;
    };

    const { x, y } = position;

    const clients: SpatialHashGridClient[] = [];
    const localQueryId = this.queryIds++;

    // bounding box for our circle
    const i1 = this.getCellIndex({ x: x - radius, y: y - radius });
    const i2 = this.getCellIndex({ x: x + radius, y: y + radius });

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        let head = this.cells[x][y];

        while (head) {
          const v = head.client;
          head = head.next;

          if (
            insideCircle({ x: v.position.x, y: v.position.y }) &&
            v.queryId !== localQueryId
          ) {
            v.queryId = localQueryId;
            clients.push(v);
          }
        }
      }
    }

    return clients;
  };

  updateClient = (client: SpatialHashGridClient) => {
    // first check if a client warrants a removal/insert

    const { x, y } = client.position;
    const { width, height } = client.dimensions;

    const i1 = this.getCellIndex({ x: x - width / 2, y: y - height / 2 });
    const i2 = this.getCellIndex({ x: x + width / 2, y: y + height / 2 });

    // check if the current client cell boundaries are the same as our new cell index boundaries
    if (
      client.cells.min[0] === i1[0] &&
      client.cells.min[1] === i1[1] &&
      client.cells.max[0] === i2[0] &&
      client.cells.max[1] === i2[1]
    ) {
      // cancel the update if so
      return;
    }
    this.removeClient(client);
    this.insert(client);
  };

  removeClient = (client: SpatialHashGridClient) => {
    const i1 = client.cells.min;
    const i2 = client.cells.max;

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const xi = x - i1[0];
        const yi = y - i1[1];
        const node = client.cells.nodes[xi][yi];

        if (node.next) {
          node.next.prev = node.prev;
        }
        if (node.prev) {
          node.prev.next = node.next;
        }

        if (!node.prev) {
          this.cells[x][y] = node.next;
        }
      }
    }
    client.cells.min = null;
    client.cells.max = null;
    client.cells.nodes = null;
  };
}

export const funcName = (args) => {
  //
};
