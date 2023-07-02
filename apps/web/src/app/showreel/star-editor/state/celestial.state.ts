import { makeVarPersisted } from '../../../_state/utils';

export const celestialSettingsVar = makeVarPersisted<{
  panelOpen: boolean;
  brightness: number;
  color: { r: number; g: number; b: number };
  radius: number;
}>(
  {
    panelOpen: false,
    brightness: 0.1,
    radius: 2.5,
    color: { r: 255, g: 255, b: 255 },
  },
  'celestialSettings'
);
