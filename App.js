import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import DeckDetail from './components/DeckDetail';
import NewCard from './components/NewCard';
import reducer from './reducers';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck',
    },
  },
});

const FlashcardNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
    }),
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
    }),
  },
  Quiz: {
    screen: Quiz,
  },
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <FlashcardNavigator />
        </View>
      </Provider>
    );
  }
}
