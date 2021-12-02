import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { addBoardToStage } from './board';
import { initPlayers, renderPlayerDrawers, switchPlayer } from './player';
import {
  drawDebugButton,
  drawNextPhaseButton,
  drawPhaseIndicator,
} from './phase';
import { drawChunks, drawOuterSquares } from './chunk';
import { initCards, hireCard, manageCard } from './card';
import { initMarketingTiles } from './marketingTile';
import { renderToolbar } from './toolbar';
import {
  animations,
  app,
  cards,
  currentPlayer as _currentPlayer,
  keyEventMap,
  mainLayer,
  marketingTiles,
  players,
} from './utils/singletons';
import { tileConfigs } from './tile.configs';
import { cardConfigs } from './card.configs';
import { marketingTileConfigs } from './marketingTile.configs';
import { initCommunalDrawers } from './drawer.configs';
import { initPhases } from './phase.configs';
import { Stage } from '@pixi/layers';

export const FoodChain = () => {
  useEffect(() => {
    const gameElement = document.getElementById('game');
    app.resizeTo = gameElement;
    app.stage = new Stage();
    app.stage.sortableChildren = true;
    mainLayer.group.enableSort = true;
    app.stage.addChild(mainLayer);

    gameElement.appendChild(app.view);

    document.addEventListener('keydown', (e) => {
      if (Object.keys(keyEventMap).includes(e.code)) keyEventMap[e.code]();
    });
    keyEventMap.Digit1 = () => {
      switchPlayer(players[0]);
    };
    keyEventMap.Digit2 = () => {
      switchPlayer(players[1]);
    };
    keyEventMap.Digit3 = () => {
      switchPlayer(players[2]);
    };
    keyEventMap.Digit4 = () => {
      switchPlayer(players[3]);
    };
    keyEventMap.Digit5 = () => {
      switchPlayer(players[4]);
    };

    PIXI.Loader.shared
      .add('car', 'https://i.imgur.com/6ADHQAp.png')
      .add('beer', 'https://i.imgur.com/1Ym9YX6.png')
      .add('lemonade', 'https://i.imgur.com/UaijMRU.png')
      .add('cola', 'https://i.imgur.com/LesWWMh.png')
      .add('burger', 'https://i.imgur.com/pyw8386.png')
      .add('pizza', 'https://i.imgur.com/uQZeADM.png')
      .load(() => {
        //Initialise Players
        initPlayers(5);
        _currentPlayer.player = players[0];
        const currentPlayer = _currentPlayer.player;

        drawChunks(tileConfigs);
        addBoardToStage();
        drawOuterSquares();

        initPhases();

        drawDebugButton();
        drawPhaseIndicator();
        drawNextPhaseButton();

        initCommunalDrawers();
        renderPlayerDrawers(currentPlayer);
        renderToolbar(currentPlayer);

        initCards(Object.values(cardConfigs), cards);
        initMarketingTiles(marketingTileConfigs, marketingTiles);

        app.ticker.add(() => {
          animations.forEach((animation) => animation.update());
        });
      });

    return () => app.destroy(true, true);
  }, []);

  return <Box id="game" mx="0.5vw" w="99vw" my="1vh" h="98vh"></Box>;
};
