export type ResourceModification = {
  galacticEmpireId: string;
  galacticCreditsIncrement: number;
  commonMetalsIncrement: number;
  rareMetalsIncrement: number;
  hydrocarbonsIncrement: number;
  voidMatterIncrement: number;
};

export type ResourceModifierKey = keyof Pick<
  ResourceModification,
  | 'galacticCreditsIncrement'
  | 'commonMetalsIncrement'
  | 'hydrocarbonsIncrement'
  | 'rareMetalsIncrement'
  | 'voidMatterIncrement'
>;

export const resourceModificationFactory = (
  initial: ResourceModification,
  key: ResourceModifierKey,
  amount: number
): ResourceModification => ({
  ...initial,
  [key]: amount,
});
