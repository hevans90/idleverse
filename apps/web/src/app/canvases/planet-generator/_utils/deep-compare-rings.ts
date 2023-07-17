import { RingConfig } from '@idleverse/state';

type RingChange = {
  props: (keyof RingConfig)[];
  config: RingConfig;
  regenTexture: boolean;
};

const propsToRegen: (keyof RingConfig)[] = [
  'type',
  'colors',
  'resolution',
  'terrainBias',
];

export const deepCompareRings = (
  prev: RingConfig[],
  curr: RingConfig[]
): { updates: RingChange[]; additions: RingConfig[]; deletions: string[] } => {
  // build an array of configs that have changed to later perform a deeper comparison
  const configsToDeepCompare: {
    prevConfig: RingConfig;
    currConfig: RingConfig;
  }[] = [];

  const updates: RingChange[] = [];

  curr.forEach((currConfig) => {
    const prevConfig = prev.find(({ id }) => id === currConfig.id);

    if (!prevConfig) return;

    const changed = !Object.keys(currConfig).every(
      (prop: keyof RingConfig) => currConfig[prop] === prevConfig[prop]
    );

    if (changed) {
      configsToDeepCompare.push({ currConfig, prevConfig });
    }
  });

  configsToDeepCompare.forEach(({ prevConfig, currConfig }) => {
    const changedProps: (keyof RingConfig)[] = [];

    Object.keys(prevConfig).forEach((key: keyof RingConfig) => {
      const deepComparison =
        JSON.stringify(prevConfig[key]) === JSON.stringify(currConfig[key]);

      if (!deepComparison) {
        changedProps.push(key);
      }
    });

    updates.push({
      props: changedProps,
      config: currConfig,
      regenTexture: changedProps.some((prop) => propsToRegen.includes(prop)),
    });
  });

  return {
    updates,
    additions: curr.filter(
      ({ id }) => !prev.find(({ id: prevId }) => id === prevId)
    ),
    deletions: prev
      .filter(({ id }) => !curr.find(({ id: currId }) => id === currId))
      .map(({ id }) => id),
  };
};
