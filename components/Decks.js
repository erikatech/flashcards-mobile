import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { fetchDecks } from '../utils/api';
import Deck from './Deck';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { receiveDecks, selectDeck } from '../actions';

class Decks extends Component {

  /**
   * adapted from https://itnext.io/handle-tab-changes-in-react-navigation-3717180cddb
   */
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: 'Decks',
      tabBarOnPress({ jumpToIndex, scene }) {
        params.onTabFocus();
        jumpToIndex(scene.index);
      }
    };
  };

  componentDidMount() {
    this.fetchDecks();
    this.props.navigation.setParams({
      onTabFocus: this.fetchDecks
    })
  } 

  select = (deck) => {
    this.props.dispatch(selectDeck(deck))
    this.props.navigation.navigate(
      'DeckDetail', {
        title: deck.title
      }
    )
  }

  fetchDecks = () => {
    const { dispatch } = this.props;
    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
  }

  renderItem = ({item}) => {
    return <Deck selectDeck={this.select} deck={item}/>
  }
  
  render() {
    const { decks } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

        {decks && (
          <FlatList 
            keyExtractor={(item, index) => index}
            data={Object.keys(decks).map(key => decks[key])}
            renderItem={this.renderItem}/>
        )}

        {!decks && (
          <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginLeft: 20, marginRight: 20, fontSize: 20, color: 'gray', textAlign: 'center'}}>
              No Decks added yet. Go to <Text style={{fontWeight: 'bold'}}>New Deck</Text> tab to add some decks!
            </Text>
          </View>
          
        )}
      </View>
    )
  }
}

function mapStateToProps(deckReducer){
  return {
    decks: deckReducer.decks
  }
}

export default connect(mapStateToProps)(Decks);