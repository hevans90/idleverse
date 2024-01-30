export const generatorCost = ({
  baseCost,
  costGrowthExponent,
  owned,
}: {
  baseCost: number;
  costGrowthExponent: number;
  owned: number;
}) => Math.ceil(baseCost * Math.pow(costGrowthExponent, owned));
