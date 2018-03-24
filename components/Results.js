import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  actionBtn: {
    height: 40,
    width: '80%',
    margin: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 8,
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
Você acertou {this.props.score} de {this.props.cardsTotal}
        </Text>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: 'black' }]} onPress={this.props.restartQuiz}>
          <Text style={[styles.btnText, { color: 'white' }]}> Restart Quiz </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={this.props.backToDeck}>
          <Text style={styles.btnText}> Back to Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Results;
