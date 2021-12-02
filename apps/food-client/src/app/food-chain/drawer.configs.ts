import {
  renderRecruitDrawerContents,
  renderMarketingDrawerContents,
  renderDrawer,
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
    width: 900,
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
    width: 900,
    tabStartY: (app.screen.height - 200) / 2,
    tabWidth: 40,
    orient: 'right',
    marketingTiles: [],
    renderContents: () => renderMarketingDrawerContents(),
  };

  Object.values(communalDrawers).forEach((drawer) => {
    renderDrawer(drawer);
    app.stage.addChild(drawer.container);
  });
};
