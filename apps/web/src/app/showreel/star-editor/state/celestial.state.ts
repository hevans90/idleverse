import { makeVarPersisted } from '@idleverse/state';

export const celestialSettingsVar = makeVarPersisted<{
  panelOpen: boolean;
  brightness: number;
  density: number;
  coronalStrength: number;
  color: { r: number; g: number; b: number };
  radius: number;
}>(
  {
    panelOpen: false,
    brightness: 0.1,
    density: 0.15,
    coronalStrength: 0.4,
    radius: 2.5,
    color: { r: 255, g: 255, b: 255 },
  },
  'celestialSettings'
);
