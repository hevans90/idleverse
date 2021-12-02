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
import { Stage } from '@pixi/layers';
import { initCards } from './card/card';
import { cardConfigs } from './card/card.configs';
import { hireCard } from './card/card.hire';
import { manageCard } from './card/card.structure';
import { initCommunalDrawers } from './drawer.configs';
import { initExtraHouseTiles } from './house';
import { marketingTileConfigs } from './marketingTile.configs';
import { initPhases } from './phase.configs';
import { tileConfigs } from './tile.configs';
import { assetMaps } from './utils/asset-loader';

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
    for (let i = 0; i < 5; i++) {
      keyEventMap[`Digit${i + 1}`] = () => {
        switchPlayer(players[i]);
      };
    }

    PIXI.Loader.shared.add(assetMaps).load(() => {
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
      initExtraHouseTiles();

      (async () => {
        let card = cards.find((card) => card.kind === 'truckDriver');
        await hireCard(currentPlayer, card);
        manageCard(currentPlayer.ceo.card, card, 0);
        card = cards.find((card) => card.kind === 'trainer');
        await hireCard(currentPlayer, card);
        manageCard(currentPlayer.ceo.card, card, 1);
        card = cards.find((card) => card.kind === 'brandDirector');
        await hireCard(currentPlayer, card);
        manageCard(currentPlayer.ceo.card, card, 2);
        card = cards.find((card) => card.kind === 'managementTrainee');
        await hireCard(currentPlayer, card);
      })();

      app.ticker.add(() => {
        animations.forEach((animation) => animation.update());
      });
    });

    return () => app.destroy(true, true);
  }, []);

  return <Box id="game" mx="0.5vw" w="99vw" my="1vh" h="98vh"></Box>;
};
