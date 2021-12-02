import { Player } from '../player';
import { addGlow, greyOut } from '../utils/graphics-utils';
import { currentPlayer, cards, communalDrawers } from '../utils/singletons';
import { Card } from './card';
import { fireCard, hireCard } from './card.hire';

export const trainCard = (originalCard: Card, targetCard: Card) => {
  const player = originalCard.owner;
  fireCard(originalCard);
  hireCard(player, targetCard);
};

export const getAllTrainers = (player: Player) => {
  const trainers: Card[] = [];
  player.ceo.card.employees.forEach((employee1) => {
    if (employee1.maxTrains) trainers.push(employee1);
    else if (employee1.employees && employee1.employees.length > 0)
      employee1.employees.forEach((employee2) => {
        if (employee2.maxTrains) trainers.push(employee2);
      });
  });
  return trainers;
};

export const startTrain = () => {
  const trainers = getAllTrainers(currentPlayer.player);
  trainers.forEach((trainer) => {
    trainer.trainsAvailable = trainer.maxTrains;
    trainer.trainsText.text = `${trainer.trainsAvailable}`;
  });
  cards.forEach((card) => {
    card.trainedBy = null;
    card.trainedFrom = null;
  });
  enableTrain(currentPlayer.player);
};

export const enableTrain = (player: Player, activeTrainer: Card = null) => {
  const trainers = getAllTrainers(currentPlayer.player);
  deactivateTrain(player);
  trainers.forEach((trainer) => {
    trainer.container.interactive = true;
    trainer.container.buttonMode = true;
    if (trainer === activeTrainer) {
      trainer.container.on('pointerdown', () => {
        enableTrain(player);
      });
    } else {
      trainer.container.on('pointerdown', () => {
        enableTrain(player, trainer);
      });
    }
  });
  if (activeTrainer) activateTrain(activeTrainer);
};

export const activateTrain = (trainer: Card) => {
  addGlow(trainer.container);
  const player = currentPlayer.player;
  const beachDrawer = player.drawers.beach;
  beachDrawer.employees.forEach((trainee) => {
    trainee.container.interactive = true;
    trainee.container.buttonMode = true;
    trainee.container.on('pointerdown', async () => {
      deactivateTrain(player);
      addGlow(trainer.container);
      addGlow(trainee.container);
      selectTarget(trainer, trainee);
    });
  });
};

/*
TODO: Valid targets currently gets every valid card for every source card.
 Should be reworked to trigger off kinds of source cards to reduce computation. 
 */
export const getValidTargets = (
  validTargets: { card: Card; trainingCost: number }[],
  originalCard: Card,
  trainingCost: number
) => {
  communalDrawers.recruit.employees.forEach((target) => {
    if (target.promotesFrom === originalCard.kind) {
      validTargets.push({ card: target, trainingCost: trainingCost });
      getValidTargets(validTargets, target, trainingCost + 1);
    }
  });
  return validTargets;
};

export const selectTarget = (trainer: Card, trainee: Card) => {
  let validTargets = getValidTargets([], trainee, 1);
  validTargets = validTargets.filter(
    (target) => target.trainingCost <= trainer.trainsAvailable
  );
  const validCards = validTargets.map((target) => target.card);
  trainer.container.on('pointerdown', () => {
    deactivateTrain(trainer.owner);
    enableTrain(trainer.owner);
  });
  communalDrawers.recruit.employees.forEach((target) => {
    if (validCards.includes(target)) {
      target.container.interactive = true;
      target.container.buttonMode = true;
      target.container.on('pointerdown', () => {
        trainCard(trainee, target);
        const trainingCost = validTargets.find(
          (validTarget) => validTarget.card.kind === target.kind
        ).trainingCost;
        trainer.trainsAvailable -= trainingCost;
        trainer.trainsText.text = `${trainer.trainsAvailable}`;
        deactivateTrain(trainer.owner);
        enableTrain(trainer.owner);
      });
    } else greyOut(target);
  });
};

export const deactivateTrain = (player: Player) => {
  const recruitDrawer = communalDrawers.recruit;
  const beachDrawer = player.drawers.beach;
  getAllTrainers(player).forEach((recruiter) => {
    recruiter.container.filters = [];
    recruiter.container.removeAllListeners();
  });
  [].concat(recruitDrawer.employees, beachDrawer.employees).forEach((card) => {
    card.sprite.alpha = 1;
    card.container.filters = [];
    card.container.interactive = false;
    card.container.buttonMode = false;
    card.container.removeAllListeners();
  });
};
