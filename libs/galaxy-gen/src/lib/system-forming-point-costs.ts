import {
  CelestialType,
  PlanetTerrain,
  TerrainHexPaletteKey,
} from '@idleverse/models';
import { SystemFocus } from './system-generation';

export type FormingData = {
  [key in SystemFocus]: key extends 'celestial'
    ? CelestialData
    : key extends 'asteroid-belt'
    ? AsteroidBeltData
    : GoldilocksZoneData;
};

type CelestialData = {
  [key in CelestialType]: {
    cost: number;

    /** A direct multiplier to solar energy production */
    luminosity: number;

    /** An additive percentage value to overall system metal mining efficiency  */
    metallurgicalQuality: number;

    /**
     *  A score between 0-10.
     *
     *  0 = no activity
     *
     *  \> 0 = the number is a multiplier to the magnitude of various random events,
     *  like solar flares
     * */
    volatility: number;
  };
};

type AsteroidBeltData = {
  [key in PlanetTerrain]: {
    waterCost: number;
    sandCost: number;
    grassCost: number;
    forestCost: number;
  };
};

type GoldilocksZoneData = {
  planets: {
    [key in PlanetTerrain]: {
      [key in TerrainHexPaletteKey]: {
        hydrocarbonsMultiplier?: number;
        commonMetalsMultiplier?: number;
        rareMetalsMultiplier?: number;
      };
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
  'goldilocks-zone': {
    planets: {
      terran: {
        water: {
          hydrocarbonsMultiplier: 0.4,
        },
        sand: {
          commonMetalsMultiplier: 0.2,
          rareMetalsMultiplier: 0.1,
        },
        grass: {
          hydrocarbonsMultiplier: 0.3,
          commonMetalsMultiplier: 0.1,
        },
        forest: {
          hydrocarbonsMultiplier: 0.2,
          rareMetalsMultiplier: 0.1,
        },
      },
      desert: {
        water: {
          commonMetalsMultiplier: 0.2,
          rareMetalsMultiplier: 0.1,
        },
        sand: {
          commonMetalsMultiplier: 0.3,
          rareMetalsMultiplier: 0.2,
        },
        grass: {
          commonMetalsMultiplier: 0.1,
        },
        forest: {
          hydrocarbonsMultiplier: 0.2,
          rareMetalsMultiplier: 0.3,
        },
      },
      alien: {
        water: {
          hydrocarbonsMultiplier: 0,
          commonMetalsMultiplier: 0,
          rareMetalsMultiplier: 0,
        },
        sand: {
          hydrocarbonsMultiplier: 0,
          commonMetalsMultiplier: 0,
          rareMetalsMultiplier: 0,
        },
        grass: {
          hydrocarbonsMultiplier: 0,
          commonMetalsMultiplier: 0,
          rareMetalsMultiplier: 0,
        },
        forest: {
          hydrocarbonsMultiplier: 0.7,
        },
      },
      primordial: {
        water: {
          hydrocarbonsMultiplier: 0,
          commonMetalsMultiplier: 0,
          rareMetalsMultiplier: 0,
        },
        sand: {
          hydrocarbonsMultiplier: 0,
          commonMetalsMultiplier: 0,
          rareMetalsMultiplier: 0,
        },
        grass: {
          hydrocarbonsMultiplier: 0,
          commonMetalsMultiplier: 0,
          rareMetalsMultiplier: 0,
        },
        forest: {
          hydrocarbonsMultiplier: 0,
          commonMetalsMultiplier: 0,
          rareMetalsMultiplier: 0,
        },
      },
    },
  },
  'asteroid-belt': undefined,
};
