import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import { addCardToDeck } from '../utils/api';
import { connect } from 'react-redux';
import { updateDeck } from '../actions';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    margin: 20,
    textAlign: 'center',
  },
  submitBtn: {
    backgroundColor: 'black',
    height: 40,
    width: '80%',
    margin: 20,
    borderRadius: 5

  }
})


class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  addCard = () => {
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };
    if(!card.question.trim().length || !card.answer.trim().length){
      this.setState({
        errorMessage: 'Please fill all the fields'
      })
      return;
    } 
    const { deck, dispatch } = this.props;
    addCardToDeck(deck, card)
      .then(() => {
        dispatch(updateDeck(deck))
        this.setState({
          question: '',
          answer: '',
          errorMessage: ''
        })
      })
  }

  render() {
    const { errors, question, answer } = this.state;
    return (
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <TextInput 
          placeholder='Your question'
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          value={question}
        />
        <TextInput 
          placeholder='The answer'
          style={styles.input}
          onChangeText={(answer) => this.setState({answer})}
          value={answer}
        />

        <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>

        <TouchableHighlight
          style={styles.submitBtn}
          onPress={this.addCard}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center', padding: 8}}>
            Submit
          </Text>
        </TouchableHighlight>
        
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(deckReducer){
  return {
    deck: deckReducer.selectedDeck
  }
}

export default connect(mapStateToProps)(NewCard);