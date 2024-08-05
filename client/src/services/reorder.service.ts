import type { DraggableLocation } from '@hello-pangea/dnd';

import { type List } from '../common/types/types';

export const reorderLists = (
  items: List[],
  startIndex: number,
  endIndex: number,
): List[] => moveItem(items, startIndex, endIndex);

export const reorderCards = (
  lists: List[],
  source: DraggableLocation,
  destination: DraggableLocation,
): List[] => {
  const sourceList = lists.find((list) => list.id === source.droppableId);
  const destList = lists.find((list) => list.id === destination.droppableId);
  if (!sourceList || !destList) return lists;

  const targetCard = sourceList.cards[source.index];
  const isMovingInSameList = source.droppableId === destination.droppableId;

  const newLists = lists.map((list) => {
    if (list.id === source.droppableId) {
      const updatedCards = isMovingInSameList
        ? moveItem(sourceList.cards, source.index, destination.index)
        : removeItem(sourceList.cards, source.index);
      return { ...list, cards: updatedCards };
    }

    if (list.id === destination.droppableId && !isMovingInSameList) {
      return {
        ...list,
        cards: addItem(destList.cards, destination.index, targetCard),
      };
    }

    return list;
  });

  return newLists;
};

const moveItem = <T>(array: T[], fromIndex: number, toIndex: number): T[] => {
  const item = array[fromIndex];
  const newArray = array.filter((_, index) => index !== fromIndex);
  newArray.splice(toIndex, 0, item);
  return newArray;
};

const removeItem = <T>(array: T[], index: number): T[] =>
  array.slice(0, index).concat(array.slice(index + 1));

const addItem = <T>(array: T[], index: number, item: T): T[] =>
  array.slice(0, index).concat(item).concat(array.slice(index));
