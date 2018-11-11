// Do no upgrade react-navigation version(package.json)

import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {persistStore,persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import NavigatorR from './navigator.js';
import navReducer from './reducer.js';
import attendanceReducer from './attendanceReducer.js'

const reducers = combineReducers({
  nav: navReducer,
  attendance: attendanceReducer
})

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['nav']
}

const pReducer = persistReducer(persistConfig,reducers)
const store = createStore(pReducer,applyMiddleware(logger))
const persistor = persistStore(store)

export default class App extends Component<> {

  render() {
    return (
      <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size="large" color="#ffffff"/>} persistor={persistor}>
      <NavigatorR/>
      </PersistGate>
      </Provider>
    );
  }

}
