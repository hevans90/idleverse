import {
  renderRecruitDrawerContents,
  renderMarketingDrawerContents,
  renderDrawer,
  renderDevelopmentDrawerContents,
} from './drawer';
import { baseColour } from './types';
import { app, communalDrawers } from './utils/singletons';

export const initCommunalDrawers = () => {
  communalDrawers.recruit = {
    name: 'Recruit',
    colour: baseColour,
    open: false,
    startY: 100,
    endY: app.screen.height - 100,
    width: 1000,
    tabEndY: (app.screen.height - 200) / 2,
    tabWidth: 40,
    orient: 'right',
    employees: [],
    renderContents: () => renderRecruitDrawerContents(),
  };

  communalDrawers.market = {
    name: 'Market',
    colour: baseColour,
    open: false,
    startY: 100,
    endY: app.screen.height - 100,
    width: 1000,
    tabStartY: (app.screen.height - 200) / 2,
    tabEndY: ((app.screen.height - 200) * 3) / 2,
    tabWidth: 40,
    orient: 'right',
    marketingTiles: [],
    renderContents: () => renderMarketingDrawerContents(),
  };
  const mDrawer = communalDrawers.market;
  mDrawer.tabEndY = ((mDrawer.endY - mDrawer.startY) / 4) * 3;

  communalDrawers.development = {
    name: 'Development',
    colour: baseColour,
    open: false,
    startY: 100,
    endY: app.screen.height - 100,
    width: 1000,
    tabStartY: ((app.screen.height - 200) * 3) / 2,
    tabWidth: 40,
    orient: 'right',
    houses: [],
    renderContents: () => renderDevelopmentDrawerContents(),
  };
  const dDrawer = communalDrawers.development;
  dDrawer.tabStartY = ((dDrawer.endY - dDrawer.startY) / 4) * 3;

  Object.values(communalDrawers).forEach((drawer) => {
    renderDrawer(drawer);
    app.stage.addChild(drawer.container);
  });
};
