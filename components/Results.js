import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phrase: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 15,
    marginLeft: 15,
  },

});

class Results extends Component {
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.phrase}>Você finalizou o quiz:</Text>
        <Text style={[styles.phrase, { marginTop: 20, color: 'gray', fontSize: 16 }]}>
Você acertou {this.props.score} de {this.props.total}
        </Text>
      </View>
    );
  }
}

function mapStateToProps(deckReducer) {
  return {
    total: deckReducer.selectedDeck.cards.length,
  };
}

export default connect(mapStateToProps)(Results);
