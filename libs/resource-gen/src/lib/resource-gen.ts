export function resourceGen(): string {
  return 'resource-gen';
}

export const generatorCost = ({
  baseCost,
  costGrowthExponent,
  owned,
}: {
  baseCost: number;
  costGrowthExponent: number;
  owned: number;
}) => Math.ceil(baseCost * Math.pow(costGrowthExponent, owned));
