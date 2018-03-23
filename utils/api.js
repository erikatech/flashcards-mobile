import { AsyncStorage } from 'react-native';

export function submitDeck(title, cards = []) {
  return AsyncStorage.mergeItem('FLASHCARD_STORAGE_KEY', JSON.stringify({
    [title]: {
      title,
      cards,
    },
  }));
}

export function fetchDecks() {
  return AsyncStorage.getItem('FLASHCARD_STORAGE_KEY').then(decks => JSON.parse(decks));
}

export function getSingleDeck(deckId) {
  return fetchDecks().then(results => results[deckId]);
}

export function addCardToDeck(deck, card) {
  deck.cards.push(card);
  return AsyncStorage.mergeItem('FLASHCARD_STORAGE_KEY', JSON.stringify({
    [deck.title]: {
      ...deck,
    },
  }));
}
