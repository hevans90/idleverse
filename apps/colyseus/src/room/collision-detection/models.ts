export type Position = { x: number; y: number };
export type Bounds = { lower: Position; upper: Position };
export type Dimensions = {
  width: number;
  height: number;
  /** for circle geometry only */
  radius?: number;
};

export type LinkedListItem = {
  next: LinkedListItem;
  prev: LinkedListItem;
  client: SpatialHashGridClient;
};

export type SpatialHashGridClient = {
  name: string;
  position: Position;
  dimensions: Dimensions;
  geometry: 'circle' | 'rectangle';
  indices?: number[][];
  queryId?: number;
  cells?: {
    min: [number, number];
    max: [number, number];
    nodes: LinkedListItem[][];
  };
};
