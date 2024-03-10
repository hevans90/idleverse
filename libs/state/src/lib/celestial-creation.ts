import { CelestialGenerationConfig } from '@idleverse/models';
import { makeVarPersisted } from './utils';

export const celestialPresets: CelestialGenerationConfig[] = [
  {
    preset: 'main-sequence',
    brightness: 0.45,
    density: 0.3,
    coronalStrength: 0.35,
    radius: 1.5,
    color: { r: 255, g: 255, b: 255 },
  },
  {
    preset: 'red-giant',
    brightness: 0.8,
    density: 0.15,
    coronalStrength: 1,
    radius: 2.5,
    color: { r: 255, g: 100, b: 100 },
  },
  {
    preset: 'blue-giant',
    brightness: 1,
    density: 0.1,
    coronalStrength: 1,
    radius: 2.5,
    color: { r: 30, g: 90, b: 255 },
  },
  {
    preset: 'white-dwarf',
    brightness: 0.5,
    density: 1,
    coronalStrength: 0.01,
    radius: 0.8,
    color: { r: 255, g: 255, b: 255 },
  },
];

export const celestialSettingsVar = makeVarPersisted<
  CelestialGenerationConfig & { panelOpen: boolean }
>(
  {
    panelOpen: false,
    ...celestialPresets[0],
  },
  'celestialSettings'
);
