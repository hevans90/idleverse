import chalk from 'chalk';
import { Client } from 'colyseus';

/**
 * Round half away from zero ('commercial' rounding)
 * Uses correction to offset floating-point inaccuracies.
 * Works symmetrically for positive and negative numbers.
 */
export const round = (num: number, decimalPlaces = 0) => {
  const p = Math.pow(10, decimalPlaces);
  const n = num * p * (1 + Number.EPSILON);
  return Math.round(n) / p;
};

export const findByColyseusClient =
  ({ client }: { client: Client }) =>
  (obj: { colyseusUserId?: string }) =>
    obj?.colyseusUserId === client.id;

export const findByClientId =
  (colyseusUserId: string) => (obj: { colyseusUserId?: string }) =>
    obj?.colyseusUserId === colyseusUserId;

export const logger = {
  info: (msg: string) => console.log(msg),
  success: (msg: string) => console.log(chalk.green(msg)),
  warning: (msg: string) => console.log(chalk.yellow(msg)),
  error: (msg: string) => console.log(chalk.red(msg)),
};

export const colyseusClientIdFromGridClientId = (colyseusId: string) =>
  colyseusId.substring(colyseusId.indexOf('_')).slice(1);
