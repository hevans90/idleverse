import { useApp } from '@inlet/react-pixi';
import { addStats } from 'pixi-stats';
import { UPDATE_PRIORITY } from 'pixi.js';

export const Indicators = () => {
  const app = useApp();
  const stats = addStats(document, app);

  app.ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);

  return <></>;
};
