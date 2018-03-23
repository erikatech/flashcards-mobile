import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import Results from './Results';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    backgroundColor: 'white'
  },
  showned: {
    marginLeft: 15,
    marginTop: 20,
    fontSize: 16, 
    fontWeight: 'bold'
  },
  cardContainer: {
    flex: 4, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  mainText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  answerBtn: {
    height: 40,
    width: '80%',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 10,

  }
});

class Quiz extends Component {
  state = {
    currentPosition: 0,
    currentCardOption: 'QUESTION',
    showned: 1,
    score: 0,
  }

  toggleCardOption = () => {
    this.setState({
      currentCardOption: this.state.currentCardOption === 'QUESTION' ? 'ANSWER' : 'QUESTION'
    })
  }

  isQuestion = () => {
    return this.state.currentCardOption === 'QUESTION';
  }

  respondQuestion = (correct) => {
    const { score, currentPosition, showned } = this.state;
    if(!this.hasFinishedQuiz()){
      this.setState({
        score: correct ? score + 1 : score,
        showned: showned + 1,
        currentPosition: currentPosition + 1,
        currentCardOption: 'QUESTION',
      })
    }
  }

  hasFinishedQuiz = () => {
    return this.state.currentPosition === this.props.deck.cards.length;
  };

  render() {
    const { deck } = this.props;
    const { currentCardOption, currentPosition, showned } = this.state;
    const currentCard = deck.cards[currentPosition];

    return this.hasFinishedQuiz() ? 
      <Results score={this.state.score} /> :

      <View style={styles.mainContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.showned}>{showned}/{deck.cards.length}</Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.mainText}>{this.isQuestion() ? currentCard.question : currentCard.answer}</Text>
          <TouchableOpacity style={styles.toggleBtn} onPress={this.toggleCardOption}>
              <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>{this.isQuestion() ? 'Answer' : 'Question'}</Text>
          </TouchableOpacity> 
        </View>

        {!this.isQuestion() && (
          <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={[styles.answerBtn, {backgroundColor: 'green'}]} onPress={() => this.respondQuestion(true)}>
                <Text style={styles.btnText}>Correct</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={[styles.answerBtn, {backgroundColor: 'red', marginTop: 20}]} onPress={() => this.respondQuestion(false)}>
                <Text style={styles.btnText}>Incorrect</Text>
            </TouchableOpacity> 
          </View>
        )}
      </View>
  }
}

function mapStateToProps(deckReducer){
  return {
    deck: deckReducer.selectedDeck
  }
}

export default connect(mapStateToProps)(Quiz);