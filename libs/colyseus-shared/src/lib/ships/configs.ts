export type ShipConfig = {
  maxVelocity: number;
  acceleration: number;
  hullStrength: number;
  shieldStrength?: number;

  width: number;
  height: number;
};

export const basicShip: ShipConfig = {
  maxVelocity: 10,
  acceleration: 1,
  hullStrength: 100,
  width: 25,
  height: 25,
};
