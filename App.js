import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import NavigatorR from './navigator.js';
import reducer from './reducer.js';

const reducers = combineReducers({
  nav: reducer
})
const store = createStore(reducers,applyMiddleware(logger))

export default class App extends Component<> {

  render() {
    return (
      <Provider store={store}>
      <NavigatorR/>
      </Provider>
    );
  }

}
