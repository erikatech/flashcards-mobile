export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const UPDATE_DECK = 'UPDATE_DECK';
export const SELECT_DECK = 'SELECT_DECK';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function selectDeck(selectedDeck) {
  return {
    type: SELECT_DECK,
    selectedDeck,
  };
}

export function updateDeck(deck) {
  return {
    type: UPDATE_DECK,
    deck,
  };
}
