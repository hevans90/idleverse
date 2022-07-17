/**
 * Calling this factory will append a widget to the top right of the dom.
 */

export enum PerformanceStat {
  FPS,
  Latency,
  Memory,
}

export const performanceStatsFactory = () => {
  // eslint-disable-next-line
  const Stats = require('stats.js');
  const stats = new Stats();
  stats.showPanel(2); // 0: fps, 1: ms, 2: mb, 3+: custom
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = 'unset';
  stats.domElement.style.right = '8px';
  stats.domElement.style.top = '8px';
  document.body.appendChild(stats.dom);

  return stats as {
    /**
     * change the displayed performance statistic panel
     */
    showPanel: (stat: PerformanceStat) => void;

    /**
     * begin tracking performance
     */
    begin: () => void;

    /**
     * end performance tracking
     */
    end: () => void;
  };
};
