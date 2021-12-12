import * as PIXI from 'pixi.js';
import { Drawer } from '../drawer';
import { EmployeeTypes } from '../types';
import { cards, app, currentPlayer } from '../utils/singletons';
import {
  Card,
  moveCardToParent,
  initManagerContentsContainer,
  hasEmployees,
  removeManagerContentsContainer,
  cardContainsEvent,
} from './card';
import { emptyCardKind } from './card.configs';

export const manageCard = (manager: Card, card: Card, slot: number) => {
  card.contentsSlot = slot;
  moveCardToParent(manager, card);
  card.active = true;
  if (card.managementSlots) {
    initManagerContentsContainer(card);
  }
};

export const unmanageCard = () => (beachDrawer: Drawer, card: Card) => {
  moveCardToParent(beachDrawer, card);
  card.active = false;
};

export const slotIsFree = (card: Card, slot: number) =>
  card.employees.filter(
    (childCard) =>
      childCard.contentsSlot === slot && !(childCard.kind === emptyCardKind)
  ).length === 0;

export const enableCardStructure = () => {
  cards.forEach((card) => {
    let global: PIXI.Point;
    const start = { x: 0, y: 0 };
    const click = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };
    let dragging = false;

    function onDragStart(event: PIXI.InteractionEvent) {
      if (!hasEmployees(card)) {
        start.x = card.container.position.x;
        start.y = card.container.position.y;
        click.x = event.data.global.x;
        click.y = event.data.global.y;
        global = card.container.getGlobalPosition();

        app.stage.addChild(card.container);
        card.container.position.x = global.x;
        card.container.position.y = global.y;

        dragging = true;
      }
    }

    function onDragMove(event: PIXI.InteractionEvent) {
      const ceoCard = currentPlayer.player.ceo.card;
      if (dragging) {
        cursor.x = event.data.global.x - click.x;
        cursor.y = event.data.global.y - click.y;
        card.container.position.x = global.x + cursor.x;
        card.container.position.y = global.y + cursor.y;
        if (
          ceoCard.container
            .getBounds()
            .contains(event.data.global.x, event.data.global.y)
        ) {
          ceoCard.container.emit('pointerover');
        } else {
          ceoCard.container.emit('pointerout');
        }
      }
    }

    function onDragEnd(event: PIXI.InteractionEvent) {
      const ceoCard = currentPlayer.player.ceo.card;
      const beachDrawer = currentPlayer.player.drawers.beach;
      if (dragging) {
        ceoCard.container.emit('pointerout');

        if (card.contentsContainer) {
          removeManagerContentsContainer(card);
        }

        // Check if card dragged to a CEO card slot
        for (let i = 0; i < ceoCard.employees.length; i++) {
          const childCard = ceoCard.employees[i];
          if (
            childCard.kind === emptyCardKind &&
            cardContainsEvent(event, childCard) &&
            slotIsFree(ceoCard, childCard.contentsSlot)
          ) {
            manageCard(ceoCard, card, childCard.contentsSlot);
            dragging = false;
            return;
            //Check if card is dragged to a manager slot
          } else if (
            childCard !== card &&
            childCard.type === EmployeeTypes.manager &&
            card.type !== EmployeeTypes.manager
          ) {
            const manager = childCard;
            for (let j = 0; j < manager.employees.length; j++) {
              const emptyCard = manager.employees[j];
              if (
                cardContainsEvent(event, emptyCard) &&
                slotIsFree(manager, emptyCard.contentsSlot)
              ) {
                manageCard(manager, card, emptyCard.contentsSlot);
                dragging = false;
                return;
              }
            }
          }
        }

        // Finally move card to beach drawer
        moveCardToParent(beachDrawer, card);
        dragging = false;
      }
    }

    if (card.owner) {
      card.container.interactive = true;
      card.container.buttonMode = true;
      card.container
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
    }
  });
};
