import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { submitDeck } from '../utils/api';
import { addDeck, selectDeck } from '../actions';
import { connect } from 'react-redux';

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  btn: {
    height: 40,
    width: '80%',
    margin: 20,
    borderRadius: 5,
    borderColor: 'gray',
    backgroundColor: 'black'
  }
}

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center', paddingTop: 8}}>Submit</Text>
    </TouchableOpacity>
  )
}

class NewDeck extends Component {
  state = {
    title: '',
    errorMessage: ''
  }

  submit = () => {
    if(!this.state.title.trim().length) {
      this.setState({ errorMessage: 'The field is required' })
      return;
    } 
    submitDeck(this.state.title).then((deck) => {
      this.setState({title: ''})
      this.props.dispatch(selectDeck(deck))
      this.props.navigation.navigate(
        'DeckDetail', {title: deck.title}
      )
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>What is the title of your new deck?</Text>
        <TextInput 
          style={styles.input}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <Text style={{marginTop: 10, color: 'red' }}>{this.state.errorMessage}</Text>
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewDeck);