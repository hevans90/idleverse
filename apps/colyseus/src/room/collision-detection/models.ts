export type Position = { x: number; y: number };
export type Bounds = { lower: Position; upper: Position };
export type Dimensions = { width: number; height: number };

export type LinkedListItem = {
  next: LinkedListItem;
  prev: LinkedListItem;
  client: Client;
};

export type Client = {
  name: string;
  position: Position;
  dimensions: Dimensions;
  indices?: number[][];
  queryId?: number;
  cells?: {
    min: [number, number];
    max: [number, number];
    nodes: LinkedListItem[][];
  };
};
