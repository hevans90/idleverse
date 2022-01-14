import { ExecutorContext } from '@nrwl/devkit';
import { output } from '@nrwl/workspace/src/utils/output';
import { execSync } from 'child_process';
const watch = require('node-watch');
const treekill = require('tree-kill');

const NAME = 'watch';

const getTitle = (key: string = '') => [NAME, key].filter(Boolean).join(': ');

const registerWatchers = (sources = [], callback: () => void) => {
  const options = { recursive: true };

  const handler = function () {
    callback();
  };

  for (const source of sources) {
    watch(source, options, handler);
  }
};

export type Json = { [k: string]: any };
interface NxWatchExecutorOptions extends Json {
  sources: string[];
  commands: string[];
}

interface Output {
  success: boolean;
}

export default async function tsNodeExecutor(
  _options: NxWatchExecutorOptions,
  _context: ExecutorContext
): Promise<{ success: boolean }> {
  return new Promise<Output>(() => {
    const { sources, commands } = _options;

    const title = getTitle('');

    let changed = true;
    const setChanged = () => {
      console.log('setChanged: ');

      output.note({ title: getTitle('rebuild') });
      changed = true;
    };

    registerWatchers(sources, setChanged);

    function run() {
      if (changed) {
        changed = false;

        for (const command of commands) {
          execSync(command, {
            stdio: [0, 1, 2],
            env: { ...process.env, FORCE_COLORS: 'true' },
          });
        }
      }
      setTimeout(() => run(), 1000);
    }

    run();

    output.success({ title });
  });
}

process.on('exit', (s) => {
  treekill(s);
});
