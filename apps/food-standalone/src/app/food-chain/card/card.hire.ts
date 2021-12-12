import { translateObject } from '../animation';
import { Player } from '../player';
import { addGlow, greyOut } from '../utils/graphics-utils';
import {
  currentPlayer,
  cards,
  communalDrawers,
  app,
} from '../utils/singletons';
import { Card, moveCardToParent } from './card';

export const hireCard = async (player: Player, card: Card) => {
  const beachDrawer = player.drawers.beach;
  card.container.position.x = card.container.getGlobalPosition().x;
  card.container.position.y = card.container.getGlobalPosition().y;
  app.stage.addChild(card.container);
  await translateObject(
    card.container,
    { x: card.container.position.x, y: card.container.position.y },
    {
      x: beachDrawer.container.x,
      y: beachDrawer.container.y,
    },
    50
  );
  beachDrawer.contentsContainer.addChild(card.container);
  moveCardToParent(beachDrawer, card);
  card.owner = player;
};

export const fireCard = (card: Card) => {
  moveCardToParent(communalDrawers.recruit, card);
  card.owner = null;
};

export const getAllRecruiters = (player: Player) => {
  const ceoCard = player.ceo.card;
  const recruiters: Card[] = [];
  recruiters.push(ceoCard);
  ceoCard.employees.forEach((employee1) => {
    if (employee1.maxHires) recruiters.push(employee1);
    else if (employee1.employees && employee1.employees.length > 0)
      employee1.employees.forEach((employee2) => {
        if (employee2.maxHires) recruiters.push(employee2);
      });
  });
  return recruiters;
};

export const startHire = () => {
  const recruiters = getAllRecruiters(currentPlayer.player);
  recruiters.forEach((recruiter) => {
    recruiter.hiresAvailable = recruiter.maxHires;
    recruiter.hiresText.text = `${recruiter.hiresAvailable}`;
  });
  cards.forEach((card) => (card.hiredBy = null));
  enableHire(currentPlayer.player);
};

export const enableHire = (player: Player, activeRecruiter: Card = null) => {
  const recruiters = getAllRecruiters(currentPlayer.player);
  deactivateCardHire(player);
  recruiters.forEach((recruiter) => {
    recruiter.container.interactive = true;
    recruiter.container.buttonMode = true;
    if (recruiter === activeRecruiter) {
      recruiter.container.on('pointerdown', () => {
        enableHire(player);
      });
    } else {
      recruiter.container.on('pointerdown', () => {
        enableHire(player, recruiter);
      });
    }
  });
  if (activeRecruiter) activateCardHire(activeRecruiter);
};

export const activateCardHire = (employer: Card) => {
  addGlow(employer.container);
  const player = currentPlayer.player;
  const beachDrawer = player.drawers.beach;
  communalDrawers.recruit.employees.forEach((card) => {
    if (!card.promotesFrom && employer.hiresAvailable > 0) {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container.on('pointerdown', async () => {
        deactivateCardHire(player);
        employer.hiresAvailable--;
        employer.hiresText.text = `${employer.hiresAvailable}`;
        card.hiredBy = employer;
        await hireCard(player, card);
        enableHire(player, employer);
      });
    } else {
      greyOut(card);
    }
  });
  beachDrawer.employees.forEach((card) => {
    if (card.hiredBy === employer) {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container.on('pointerdown', () => {
        deactivateCardHire(player);
        employer.hiresAvailable++;
        employer.hiresText.text = `${employer.hiresAvailable}`;
        card.hiredBy = null;
        fireCard(card);
        enableHire(player, employer);
      });
    } else {
      greyOut(card);
    }
  });
};

export const deactivateCardHire = (player: Player) => {
  const recruitDrawer = communalDrawers.recruit;
  const beachDrawer = player.drawers.beach;
  getAllRecruiters(player).forEach((recruiter) => {
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
