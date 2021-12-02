import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { addBoardToStage, enableDinnerTime } from './board';
import { initCEOCard, Player } from './player';
import {
  renderDrawer,
  openDrawer,
  renderRecruitDrawerContents,
  renderMarketingDrawerContents,
  renderBeachDrawerContents,
  renderDinerDrawerContents,
} from './drawer';
import { drawerHiresIndicator } from './indicators';
import {
  drawDebugButton,
  drawNextPhaseButton,
  drawPhaseIndicator,
} from './phase';
import { drawChunks, drawOuterSquares } from './chunk';
import {
  initCards,
  enableCardHire,
  enableCardStructure,
  enableFoodProduction,
  untapCards,
  hireCard,
  manageCard,
} from './card';
import {
  initMarketingTiles,
  enableAdvertise,
  enableMarketingTilePlacement,
} from './marketingTile';
import { createDiner, enableDinerPlacement } from './diner';
import { drawToolbar } from './toolbar';
import {
  animations,
  app,
  cards,
  drawers,
  keyEventMap,
  marketingTiles,
  phases,
} from './utils/singletons';
import { tileConfigs } from './tile.configs';
import { cardConfigs } from './card.configs';
import { marketingTileConfigs } from './marketingTile.configs';

export const FoodChain = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    app.resizeTo = gameElement;
    app.stage.sortableChildren = true;
    gameElement.appendChild(app.view);

    document.addEventListener('keydown', (e) => {
      if (Object.keys(keyEventMap).includes(e.code)) keyEventMap[e.code]();
    });

    PIXI.Loader.shared
      .add('car', 'https://i.imgur.com/6ADHQAp.png')
      .add('beer', 'https://i.imgur.com/1Ym9YX6.png')
      .add('lemonade', 'https://i.imgur.com/UaijMRU.png')
      .add('cola', 'https://i.imgur.com/LesWWMh.png')
      .add('burger', 'https://i.imgur.com/pyw8386.png')
      .add('pizza', 'https://i.imgur.com/uQZeADM.png')
      .load(() => {
        //Initialise Players
        const players: Player[] = [];
        for (let i = 0; i < 5; i++) {
          players.push({
            diners: [],
            ceo: { card: null },
            hiresAvailable: 10,
            cash: 0,
            food: {
              beer: { amount: 10 },
              lemonade: { amount: 0 },
              cola: { amount: 0 },
              pizza: { amount: 10 },
              burger: { amount: 0 },
            },
          });
        }
        const currentPlayer = players[0];

        //Initialise Phases
        phases.push({
          name: 'Launch',
          start: () => {
            openDrawer('Diners');
            enableDinerPlacement(currentPlayer);
          },
          nextPhase: 'Structure',
        });
        phases.push({
          name: 'Structure',
          start: () => {
            openDrawer('Structure');
            openDrawer('Beach');
            untapCards();
            enableCardStructure(currentPlayer, cards);
          },
          nextPhase: 'Hire',
        });
        phases.push({
          name: 'Hire',
          start: () => {
            openDrawer('Beach');
            openDrawer('Recruit');
            enableCardHire(currentPlayer, cards, hiresIndicator);
          },
          nextPhase: 'Market',
        });
        phases.push({
          name: 'Market',
          start: () => {
            openDrawer('Market');
            enableMarketingTilePlacement();
          },
          nextPhase: 'Produce',
        });
        phases.push({
          name: 'Produce',
          start: () => {
            openDrawer('Structure');
            enableFoodProduction(currentPlayer);
            untapCards();
          },
          nextPhase: 'Dinner Time',
        });
        phases.push({
          name: 'Dinner Time',
          start: () => {
            enableDinnerTime();
          },
          nextPhase: 'Advertise',
        });
        phases.push({
          name: 'Advertise',
          start: () => {
            enableAdvertise(marketingTiles);
          },
          nextPhase: 'Structure',
        });

        // Initialise Drawers
        drawers.push({
          name: 'Recruit',
          open: false,
          startY: 100,
          endY: app.screen.height - 100,
          width: 900,
          tabEndY: (app.screen.height - 200) / 2,
          tabWidth: 40,
          orient: 'right',
          employees: [],
          renderContents: () => renderRecruitDrawerContents(),
        });
        drawers.push({
          name: 'Market',
          open: false,
          startY: 100,
          endY: app.screen.height - 100,
          width: 900,
          tabStartY: (app.screen.height - 200) / 2,
          tabWidth: 40,
          orient: 'right',
          marketingTiles: [],
          renderContents: () => renderMarketingDrawerContents(),
        });
        drawers.push({
          name: 'Beach',
          owner: currentPlayer,
          open: false,
          startY: (app.screen.height - 200) * 0.85,
          endY: app.screen.height - 100,
          width: 1000,
          tabWidth: 40,
          tabEndY: (200 * 0.85 + 100) / 2,
          orient: 'left',
          employees: [],
          renderContents: () => renderBeachDrawerContents(),
        });
        drawers.push({
          name: 'Diners',
          owner: currentPlayer,
          open: false,
          startY: (app.screen.height - 200) * 0.85,
          endY: app.screen.height - 100,
          width: 1000,
          tabWidth: 40,
          tabStartY: (200 * 0.85 + 100) / 2,
          orient: 'left',
          diners: [],
          renderContents: () => renderBeachDrawerContents(),
        });
        drawers.push({
          name: 'Structure',
          owner: currentPlayer,
          open: false,
          startY: 100,
          endY: (app.screen.height - 200) * 0.85,
          width: 1500,
          tabWidth: 40,
          orient: 'left',
          employees: [],
        });

        drawChunks(tileConfigs);
        addBoardToStage();
        drawOuterSquares();

        drawers.forEach((drawer) => renderDrawer(drawer));

        for (let i = 0; i < 3; i++) {
          createDiner(currentPlayer);
        }
        renderDinerDrawerContents();
        const hiresIndicator = drawerHiresIndicator(currentPlayer);

        initCEOCard(currentPlayer);
        initCards(Object.values(cardConfigs), cards);
        initMarketingTiles(marketingTileConfigs, marketingTiles);

        drawDebugButton();
        drawPhaseIndicator();
        drawNextPhaseButton();

        drawToolbar(currentPlayer);

        setTimeout(async () => {
          const card = cards.find((card) => card.kind === 'burgerCook');
          await hireCard(currentPlayer, card);
          manageCard(currentPlayer.ceo.card, card, 0);
        }, 500);

        app.ticker.add(() => {
          animations.forEach((animation) => animation.update());
        });
      });

    return () => app.destroy(true, true);
  }, []);

  return <Box id="game" mx="0.5vw" w="99vw" my="1vh" h="98vh"></Box>;
};
