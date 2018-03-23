import { RECEIVE_DECKS, SELECT_DECK, UPDATE_DECK } from '../actions';

function decks(state = { decks: {} }, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        decks: action.decks,
      };
    case SELECT_DECK:
      return {
        ...state,
        selectedDeck: action.selectedDeck,
      };
    case UPDATE_DECK:
      const { deck } = action;
      return {
        ...state,
        selectedDeck: {
          ...state.selectedDeck,
          [deck.title]: deck
        },
        decks: {
          ...state.decks,
          [deck.title]: deck
        }
      }
    default:
      return state;
  }
}

export default decks;
