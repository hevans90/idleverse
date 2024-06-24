import { CelestialType } from '@idleverse/models';
import { SystemFocus } from './system-generation';

// Utility type to extract a single key from a union type
type ExtractKey<T, K extends T> = K;

export type FormingData = {
  [key in ExtractKey<SystemFocus, 'celestial'>]: {
    [key in CelestialType]: {
      cost: number;

      /* A direct multiplier to solar energy production */
      luminosity: number;

      /* An additive percentage value to overall system metal mining efficiency */
      metallurgicalQuality: number;

      /**
       *  A score between 0-10.
       *  0 = no activity
       *  > 0 = the number is a multiplier to the magnitude of various random events,
       *  like solar flares
       * */
      volatility: number;
    };
  };
};

export const FORMING_DATA: FormingData = {
  celestial: {
    'red-giant': {
      cost: 2,
      luminosity: 5,
      metallurgicalQuality: 10,
      volatility: 5,
    },
    'main-sequence': {
      cost: 1,
      luminosity: 1,
      metallurgicalQuality: 10,
      volatility: 1,
    },
    'white-dwarf': {
      cost: 1,
      luminosity: 0.5,
      metallurgicalQuality: 20,
      volatility: 0,
    },
    'blue-giant': {
      cost: 3,
      luminosity: 10,
      metallurgicalQuality: 30,
      volatility: 8,
    },
  },
};
