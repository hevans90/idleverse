import { PlanetCreationInput } from './celestial-types';

type FieldIssue = {
  field: keyof PlanetCreationInput;
  issue: string;
};

const MIN_TEXTURE_RES = 64;

export const planetValidator = ({
  texture_resolution,
  terrain_bias,
}: PlanetCreationInput): FieldIssue[] => {
  const issues: FieldIssue[] = [];

  if (texture_resolution < MIN_TEXTURE_RES) {
    issues.push({
      field: 'texture_resolution',
      issue: `TEXTURE RESOLUTION: ${texture_resolution} is below the minimum of ${MIN_TEXTURE_RES}.`,
    });
  }

  if (terrain_bias.length !== 4 || terrain_bias.some((x) => x > 1)) {
    issues.push({
      field: 'terrain_bias',
      issue: `TERRAIN BIAS: invalid value of [${terrain_bias}] detected. Ensure that exactly 4 decimials between 0 & 1 are present.`,
    });
  }

  return issues;
};
