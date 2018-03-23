import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  deckContainer: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  deckTitle: {
    textAlign: 'center',
    fontSize: 30,
  },
  cards: {
    textAlign: 'center',
    fontSize: 15,
    color: 'gray',
  },
});


const Deck = ({ deck, selectDeck }) => (
  <TouchableHighlight onPress={() => selectDeck(deck)} style={styles.deckContainer}>
    <View>
      <Text style={styles.deckTitle}>{deck.title}</Text>
      <Text style={styles.cards}>{deck.cards.length} card{deck.cards.length === 1 ? '' : 's'}</Text>
    </View>
  </TouchableHighlight>
);

export default Deck;
