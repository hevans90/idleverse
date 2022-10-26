import chalk from 'chalk';
import { Client } from 'colyseus';

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
