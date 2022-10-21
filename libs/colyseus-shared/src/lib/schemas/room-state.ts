import { ArraySchema, Schema, type } from '@colyseus/schema';
import { ColyseusImpulse } from './impulse';
import { ColyseusShip } from './ship';
import { ColyseusSpawnLocation } from './spawn-location';
import { ColyseusUser } from './user';

const generateSpawnLocations = ({
  height,
  width,
}: {
  height: number;
  width: number;
}): { locations: ColyseusSpawnLocation[]; columns: number; rows: number } => {
  const columns = 4;
  const rows = 4;

  const locations: ColyseusSpawnLocation[] = [];

  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const chunkWidth = width / columns;
      const chunkHeight = height / rows;

      locations.push(
        new ColyseusSpawnLocation({
          x: chunkWidth * (column + 1) - chunkWidth / 2,
          y: chunkHeight * (row + 1) - chunkHeight / 2,
        })
      );
    }
  }

  return { locations, columns, rows };
};

export class RoomState extends Schema {
  constructor({ height, width }: { height: number; width: number }) {
    super();
    this.height = height;
    this.width = width;

    const { locations, columns, rows } = generateSpawnLocations({
      height,
      width,
    });

    this.spawnLocations = new ArraySchema<ColyseusSpawnLocation>(...locations);
    this.columns = columns;
    this.rows = rows;
  }
  @type('number') height: number;
  @type('number') width: number;

  @type([ColyseusUser]) connectedUsers = new ArraySchema<ColyseusUser>();
  @type([ColyseusImpulse]) impulses = new ArraySchema<ColyseusImpulse>();
  @type([ColyseusShip]) ships = new ArraySchema<ColyseusShip>();
  @type([ColyseusSpawnLocation])
  spawnLocations: ArraySchema<ColyseusSpawnLocation>;

  @type('number') columns: number;
  @type('number') rows: number;

  @type('number') patchFrames = 0;
}
