import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getSingleDeck } from '../utils/api';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  deckTitle: {
    fontSize: 50,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cards: {
    fontSize: 35,
    color: 'gray',
  },
  container: {
    justifyContent: 'center', 
    alignItems: 'center',

  },
  actionBtn: {
    width: '80%',
    margin: 20,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 6
  },
  actionBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }

})

class DeckDetail extends Component {
  state = {
    errorMessage: ''
  }
  
  navigateToNewCard = () => {
    this.props.navigation.navigate(
      'NewCard', {
        title: this.props.deck.title
      }
      
    )
  }

  startQuiz = () => {
    if(!this.props.deck.cards.length){
      this.setState({
        errorMessage: 'No cards available to start the quiz'
      })
      setTimeout(() => {
        this.setState({
          errorMessage: ''
        })
      }, 2000)
    } else {
      this.props.navigation.navigate(
        'Quiz',
      )
    }
  }
  
  render() {
    const { deck } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={[styles.container, { flex: 3 }]}>
            <Text style={styles.deckTitle}>{deck.title}</Text>
            <Text style={styles.cards}>{deck.cards.length} card{deck.cards.length === 1 ? '' : 's'}</Text>
          </View>

          <View style={[styles.container, { flex: 2 }]}>
            <Text>{this.state.errorMessage}</Text>

            <TouchableOpacity style={styles.actionBtn}
              onPress={this.navigateToNewCard}>
              <Text style={styles.actionBtnText}>Add Card</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionBtn, {backgroundColor: 'black'}]}
                onPress={this.startQuiz}>
              <Text style={[styles.actionBtnText, {color: 'white'}]}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

function mapStateToProps(deckReducer){
  return {
    deck: deckReducer.selectedDeck
  }
}

export default connect(mapStateToProps)(DeckDetail);