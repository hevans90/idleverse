import { math } from './math';
import { Bounds, Client, Dimensions, Position } from './models';

export class SpatialHashGrid {
  constructor(bounds: Bounds, dimensions: Dimensions) {
    this.bounds = bounds;
    this.dimensions = dimensions;
    this.cells = new Map<number, number>();
  }

  bounds: Bounds;
  dimensions: Dimensions;
  cells: Map<number, number>;

  newClient = (name: string, position: Position, dimensions: Dimensions) => {
    const client: Client = {
      name,
      position,
      dimensions,
      indices: null,
    };
    this.insert(client);

    return client;
  };

  private insert = (client: Client) => {
    const { x, y } = client.position;
    const { width, height } = client.dimensions;

    const i1 = this.getCellIndex({ x: x - width / 2, y: y - height / 2 });
    const i2 = this.getCellIndex({ x: x + width / 2, y: y + height / 2 });

    client.indices = [i1, i2];

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const key = this.key(x, y);

        if (!(key in this.cells)) {
          this.cells[key] = new Set<Client>();
        }

        this.cells[key].add(client);
      }
    }
  };

  private key = (x: number, y: number) => `${x}.${y}`;

  private getCellIndex = (position: Position) => {
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

    const i1 = this.getCellIndex({ x: x - width / 2, y: y - height / 2 });
    const i2 = this.getCellIndex({ x: x + width / 2, y: y + height / 2 });

    const clients = new Set<Client>();

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const key = this.key(x, y);

        if (key in this.cells) {
          for (const v of this.cells[key]) {
            clients.add(v);
          }
        }
      }
    }
    return clients;
  };

  updateClient = (client: Client) => {
    this.removeClient(client);
    this.insert(client);
  };

  removeClient = (client: Client) => {
    const [i1, i2] = client.indices;

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const k = this.key(x, y);

        this.cells[k].delete(client);
      }
    }
  };
}

export const funcName = (args) => {
  //
};
