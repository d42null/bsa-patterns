import { useEffect, useState } from 'react';
import { Caretaker } from '../services/memento';
import { List, Card } from '../common/types/types';

const listsCaretaker = new Caretaker<List[]>();

const useLists = (initialLists: List[]) => {
  const [lists, setLists] = useState<List[]>(initialLists);

  useEffect(() => {
    listsCaretaker.save(initialLists);
  }, [initialLists]);

  const addList = (newList: List) => {
    const newLists = [...lists, newList];
    listsCaretaker.save(newLists);
    setLists(newLists);
  };

  const removeList = (listId: string) => {
    const newLists = lists.filter((list) => list.id !== listId);
    listsCaretaker.save(newLists);
    setLists(newLists);
  };

  const renameList = (listId: string, newName: string) => {
    const newLists = lists.map((list) =>
      list.id === listId ? { ...list, name: newName } : list,
    );
    listsCaretaker.save(newLists);
    setLists(newLists);
  };

  const addCard = (listId: string, newCard: Card) => {
    const newLists = lists.map((list) =>
      list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list,
    );
    listsCaretaker.save(newLists);
    setLists(newLists);
  };

  const removeCard = (listId: string, cardId: string) => {
    const newLists = lists.map((list) =>
      list.id === listId
        ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) }
        : list,
    );
    listsCaretaker.save(newLists);
    setLists(newLists);
  };

  const renameCard = (listId: string, cardId: string, newName: string) => {
    const newLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: list.cards.map((card) =>
              card.id === cardId ? { ...card, name: newName } : card,
            ),
          }
        : list,
    );
    listsCaretaker.save(newLists);
    setLists(newLists);
  };

  const undo = () => {
    const previousState = listsCaretaker.undo();
    if (previousState !== null) {
      setLists(previousState);
    }
  };

  const redo = () => {
    const nextState = listsCaretaker.redo();
    if (nextState !== null) {
      setLists(nextState);
    }
  };

  return {
    lists,
    addList,
    removeList,
    renameList,
    addCard,
    removeCard,
    renameCard,
    undo,
    redo,
  };
};

export default useLists;
